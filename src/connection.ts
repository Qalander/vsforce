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
  }

  // Execute a SOQL query and return the results to a callback function if no error.
  public executeQuery(query: string, callback: (results: any) => void) {
    var _this = this;
    this.execute((conn: any) => {
      conn.query(query, function (err, res) {
        if (err) { return console.error(err); }
        callback(res);
      })
    });
  }

  public execute(callback: (jsforce: any) => void) {
    var _this = this;
    if (this.jsforceConn.accessToken || this.jsforceConn.accessToken != undefined) {
      callback(_this.jsforceConn);
    } else {
      this.jsforceConn.login(
        this.config.get<string>('username'),
        this.config.get<string>('password') + this.config.get<string>('securityToken'),
        function (err, res) {
          callback(_this.jsforceConn);
        });
    }
  }
}