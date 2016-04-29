'use strict';

import * as vscode from 'vscode';
import {Connection} from './connection'

let jsforce = require('jsforce');

export function activate(context: vscode.ExtensionContext) {
    var conn = new Connection();

    conn.executeCode("system.debug('patate');");

    let disposable = vscode.commands.registerCommand('extension.sayHello', (l: string) => {
        vscode.window.showInformationMessage(l);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}