import * as vscode from 'vscode';
import * as cs from '../../cs';
import { DynamicsWebApi } from '../../api/cds-webapi/DynamicsWebApi';
import { CdsSolutions } from '../../api/CdsSolutions';
import addSolutionComponent from "../../commands/cs.cds.deployment.addSolutionComponent";
import removeSolutionComponent from "../../commands/cs.cds.deployment.removeSolutionComponent";
import packSolution from "../../commands/cs.cds.powerShell.packSolution";
import unpackSolution from "../../commands/cs.cds.powerShell.unpackSolution";
import registerPluginAssembly from "../../commands/cs.cds.deployment.registerPluginAssembly";
import publishCustomizations from "../../commands/cs.cds.deployment.publishCustomizations";
import command from '../../core/Command';

export default class SolutionManager {
    @command(cs.cds.deployment.addSolutionComponent, "Add component to solution")
    static async addSolutionComponent(config?: DynamicsWebApi.Config, solution?: any, componentId?: string, componentType?: CdsSolutions.SolutionComponent, addRequiredComponents?: boolean, doNotIncludeSubcomponents?: boolean, componentSettings?: string): Promise<any> {
        return await addSolutionComponent.apply(this, [config, solution, componentId, componentType, addRequiredComponents, doNotIncludeSubcomponents, componentSettings]);
    }

    @command(cs.cds.deployment.removeSolutionComponent, "Remove component from solution")
    static async removeSolutionComponent(config?: DynamicsWebApi.Config, solution?: any, componentId?: string, componentType?: CdsSolutions.SolutionComponent): Promise<any> {
        return await removeSolutionComponent.apply(this, [config, solution, componentId, componentType]);
    }

    @command(cs.cds.controls.explorer.packSolutionFromFolder, "Pack solution from folder")
    static async packSolutionFromFolder(folder?: vscode.Uri) {
        return await vscode.commands.executeCommand(cs.cds.powerShell.packSolution, undefined, folder.fsPath);
    }

    @command(cs.cds.powerShell.packSolution, "Pack and deploy solution")
    static async packSolution(config?: DynamicsWebApi.Config, folder?: string, solution?: any, toolsPath?: string, logFile?: string, mappingFile?: string, includeResourceFiles?: boolean, solutionPath?: string, managed?: boolean) {
        return await packSolution.apply(this, [config, folder, solution, toolsPath, logFile, mappingFile, includeResourceFiles, solutionPath, managed]);
    }

    @command(cs.cds.controls.cdsExplorer.unpackSolution, "Download and unpack solution from CDS Explorer")
    static async unpackSolutionFromTreeView(item: any) {
        return await vscode.commands.executeCommand(cs.cds.powerShell.unpackSolution, item.config, undefined, item.context);
    }

    @command(cs.cds.controls.explorer.unpackSolutionToFolder, "Download and unpack solution from File Explorer")
    static async unpackSolutionToFolder(folder?: vscode.Uri) {
        return await vscode.commands.executeCommand(cs.cds.powerShell.unpackSolution, undefined, folder.fsPath);
    }

    @command(cs.cds.powerShell.unpackSolution, "Download and unpack solution")
    static async unpackSolution(config?: DynamicsWebApi.Config, folder?: string, solution?: any, toolsPath?: string, logFile?: string, mappingFile?: string, templateResourceCode?: string, includeResourceFiles?: boolean, allowDelete: boolean = true) {
        return await unpackSolution.apply(this, [config, folder, solution, toolsPath, logFile, mappingFile, templateResourceCode, includeResourceFiles, allowDelete]);
    }    

    @command(cs.cds.controls.explorer.registerPluginFile, "Register plugin file from File Explorer")
    static async registerPluginFile(file?: vscode.Uri) {
        return await vscode.commands.executeCommand(cs.cds.deployment.registerPluginAssembly, undefined, undefined, file);
    }

    @command(cs.cds.deployment.registerPluginAssembly, "Register plugin assembly")
    static async registerPluginAssembly(config?: DynamicsWebApi.Config, pluginAssembly?: any, file?: vscode.Uri, solution?: any): Promise<any> {
        return await registerPluginAssembly.apply(this, [config, pluginAssembly, file, solution]);
    }

    @command(cs.cds.deployment.publishCustomizations, "Publish Customizations")
    static async publishCustomizations(config?: DynamicsWebApi.Config, components?: {type: CdsSolutions.SolutionComponent, id: string}[]) {
        return await publishCustomizations.apply(this, [config, components]);
    }
}