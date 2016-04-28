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
      this.config.get<string>('password') + this.config.get<string>('securityToken'),
      function (err, res) {
        console.log("YEAAAAHHHH")
      });
  }

  public getConn() {
    return this.jsforceConn;
  }
}
