import * as vscode from 'vscode';
import * as path from 'path';
import * as cs from './cs';
import { IWireUpCommands } from './wireUpCommand';
import ExtensionConfiguration from './helpers/ExtensionConfiguration';
import { Terminal } from './helpers/Terminal';
import DiscoveryRepository from './repositories/discoveryRepository';
import QuickPickOption from './helpers/QuickPicker';
import { TS } from 'typescript-linq/TS';
import ApiRepository from './repositories/apiRepository';
import { Utilities } from './helpers/Utilities';

export class PackDynamicsSolutionCommand implements IWireUpCommands {
	public wireUpCommands (context: vscode.ExtensionContext, config: vscode.WorkspaceConfiguration) {
		// setup configurations
		const sdkInstallPath = ExtensionConfiguration.parseConfigurationValue<string>(config, cs.dynamics.configuration.tools.sdkInstallPath);
		// set core tools root
		const coreToolsRoot = path.join(sdkInstallPath, 'CoreTools');
		const workspaceFolder = vscode.workspace.workspaceFolders.length > 0 ? vscode.workspace.workspaceFolders[0] : null;

		// now wire a command into the context
		context.subscriptions.push(
			vscode.commands.registerCommand(cs.dynamics.powerShell.packSolution, async (config?:DynamicsWebApi.Config, folder?:string, solutionName?:string, toolsPath?:string, managed?:boolean) => { // Match name of command to package.json command
				if (!config) {
					config = await DiscoveryRepository.getOrgConnections(context)
						.then(orgs => new TS.Linq.Enumerator(orgs).select(org => new QuickPickOption(org.name, org.webApiUrl, undefined, org)).toArray())
						.then(options => vscode.window.showQuickPick(options, { placeHolder: "Choose a Dynamics 365 Organization", canPickMany: false, ignoreFocusOut: true}))
						.then(chosen => chosen.context);
				}

				if (!folder) {
					folder = await vscode.window
						.showOpenDialog({canSelectFolders: true, canSelectFiles: false, canSelectMany: false, defaultUri: workspaceFolder.uri})
						.then(async pathUris => pathUris[0].fsPath);
				}

				if (!solutionName) {
					solutionName = await new ApiRepository(config).retrieveSolutions()
						.then(solutions => new TS.Linq.Enumerator(solutions).select(solution => new QuickPickOption(solution.friendlyname, solution.solutionid, undefined, solution)).toArray())
						.then(options => vscode.window.showQuickPick(options, { placeHolder: "Choose a Solution to pack", canPickMany: false, ignoreFocusOut: true}))
						.then(chosen => chosen.context.uniquename);
				}

				if (!toolsPath) {
					toolsPath = coreToolsRoot;
				}

				if (!managed) {
					managed = false;
				}

				const splitUrl = Utilities.RemoveTrailingSlash(config.webApiUrl).split("/");
				const orgName = config.domain ? splitUrl[splitUrl.length - 1] : config.orgName;
				let serverUrl = config.domain ? config.webApiUrl.replace(orgName, "") : config.webApiUrl;

				if (serverUrl.endsWith("//")) {
					serverUrl = serverUrl.substring(0, serverUrl.length - 1);
				}
				
				// setup the command text
				const commandToExecute = `.\\Deploy-XrmSolutions.ps1 `
					+ `-ServerUrl "${serverUrl}" `
					+ `-OrgName "${orgName}" `
					+ `-SolutionName "${solutionName}" `
					+ `-Path "${folder}" `
					+ `-ToolsPath "${toolsPath}" `
					+ `-Credential (New-Object System.Management.Automation.PSCredential (“${config.username}”, (ConvertTo-SecureString “${config.password}” -AsPlainText -Force))) `
					+ (managed ? `-Managed ` : '');

				// build a powershell terminal
				const terminal = Terminal.showTerminal(context.globalStoragePath);

				// execute the command
				terminal.sendText(commandToExecute);
			})
		);
	}
}