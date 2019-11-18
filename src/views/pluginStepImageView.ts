import * as vscode from 'vscode';
import { View, ViewRenderer } from '../view';
import * as cs from '../cs';
import IWireUpCommands from '../wireUpCommand';
import { DynamicsWebApi } from '../api/Types';
import ApiRepository from '../repositories/apiRepository';

export default class PluginStepImageViewManager implements IWireUpCommands {
	public wireUpCommands(context: vscode.ExtensionContext, wsConfig?:vscode.WorkspaceConfiguration) {
        context.subscriptions.push(

            vscode.commands.registerCommand(cs.dynamics.controls.pluginStepImage.open, (sdkmessageprocessingstepid: string, pluginStepImage: any, config?: DynamicsWebApi.Config) => { // Match name of command to package.json command
                // Run command code
                //const viewFileUri = vscode.Uri.file(`${context.extensionPath}/resources/webViews/connectionView.html`);
                const view = PluginStepImageView.createOrShow<PluginStepImageView>(PluginStepImageView, {
                    extensionPath: context.extensionPath,
                    iconPath: './resources/images/cloudsmith-logo-only-50px.png',
                    viewTitle: 'Configure Plugin Step Image - Dynamics 365 CE',
                    viewType: cs.dynamics.views.pluginStepImageView
                });

                // only do this if we are editing
                if (pluginStepImage) {
                    view.setInitialState(pluginStepImage, config);
                }
            }) // <-- no semi-colon, comma starts next command registration
        );
    }
}

class PluginStepImageView extends View {
    public config: DynamicsWebApi.Config;

    public getHtmlForWebview(viewRenderer: ViewRenderer): string {
        // add script and css assets
        viewRenderer.addScript('pluginStepImageView.js');
        viewRenderer.addStyleSheet('webviewStyles.css');

        // add image assets
        viewRenderer.addImage('cloudsmith-logo-only-50px.png');

        // return rendered html
        return viewRenderer.renderPartialFile('plugin-step-image.html');
    }    

    private saveSdkMessageProcessingStepImage(pluginStepImage: any) {
        const api = new ApiRepository(this.config);
    }
    
    public onDidReceiveMessage(instance: PluginStepImageView, message: any): vscode.Event<any> {
        switch (message.command) {
            case 'saveSdkMessageProcessingStep':                
                instance.saveSdkMessageProcessingStepImage(message.pluginStepImage);
                return;
        }
    }

    public setInitialState(viewModel: any, config: DynamicsWebApi.Config) {
        this.config = config;
        this.panel.webview.postMessage({ command: 'load', viewModel });
    }
}