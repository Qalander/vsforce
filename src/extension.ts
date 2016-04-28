'use strict';

import * as vscode from 'vscode';
let jsforce = require('jsforce');

export function activate(context: vscode.ExtensionContext) {
    console.log("test");
    var conn = new jsforce.Connection();
    console.log("test");
    conn.login('dev@vsforce.com', 'Qwerty123O5R81Jii5J22QjONuePMs5sR1', function (err, res) {
        if (err) { return console.error(err); }
        conn.query('SELECT Id, Name FROM Account', function (err, res) {
            if (err) { return console.error(err); }
            console.log(res);
        });
    });

    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage('Hello World! dsa');
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}