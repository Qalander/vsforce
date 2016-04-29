let jsforce = require('jsforce');

import * as vscode from 'vscode';

export class Connection {
  private jsforceConn: any;
  private config: vscode.WorkspaceConfiguration;

  constructor() {
    this.config = vscode.workspace.getConfiguration('vsforce.organisation');

    this.jsforceConn = new jsforce.Connection({
      loginUrl: this.config.get<string>('loginUrl')
    });

    this.jsforceConn.login(
      this.config.get<string>('username'),
      this.config.get<string>('password') + this.config.get<string>('securityToken'));
  }

  public execute(callback: (jsforce: any) => any) {
    if (this.jsforceConn.accessToken != "") {
      callback(jsforce);
    } else {
      this.jsforceConn.login(
        this.config.get<string>('username'),
        this.config.get<string>('password') + this.config.get<string>('securityToken'),
        function (err, res) {
          callback(jsforce);
        });
    }
  }
}