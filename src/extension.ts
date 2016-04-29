'use strict';

import * as vscode from 'vscode';
import {Connection} from './connection'

let jsforce = require('jsforce');

export function activate(context: vscode.ExtensionContext) {
    var conn = new Connection();

    let executeQuery = vscode.commands.registerCommand('extension.executeQuery', () => {
        vscode.window.showInputBox({prompt: "Query: "}).then(query => conn.executeQuery(query, (res: any) => {console.log(res)}));
    })
    context.subscriptions.push(executeQuery);   
    
    /*let disposable = vscode.commands.registerCommand('extension.executeQuery', () => {
        var editor = vscode.window.activeTextEditor;
        if(!editor) {
            return console.log("Please select a valid SOQL query");
        }
        var query = editor.document.getText(editor.selection);
        conn.executeQuery(query, function(res) {
            console.log(res);
        });
    });

    context.subscriptions.push(disposable);*/
}

// this method is called when your extension is deactivated
export function deactivate() {
}