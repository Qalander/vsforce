let jsforce = require('jsforce');

import * as vscode from 'vscode';

export class Connection {
  private jsforceConn: any;
  private outputConsole: vscode.OutputChannel;
  private config: vscode.WorkspaceConfiguration;

  constructor() {
    this.config = vscode.workspace.getConfiguration('vsforce.organisation');
    this.outputConsole = vscode.window.createOutputChannel("Salesforce");
    this.jsforceConn = new jsforce.Connection({
      loginUrl: this.config.get<string>('loginUrl')
    });
  }

  // Execute a SOQL query and return the results to a callback function if no error.
  public executeQuery(query: string, callback: (results: any) => void) {
    var _this = this;

    this.execute((conn: any) => {
      conn.query(query, function (err, res) {
        if (err) { return _this.outputConsole.appendLine(err); }
        callback(res);
      })
    });
  }

  // Execute APEX code  
  public executeCode(code: string) {
    var _this = this;

    this.execute((conn: any) => {
      conn.tooling.executeAnonymous(code, function (err, res) {
        _this.outputConsole.show();
        if (err) { return _this.outputConsole.appendLine(err); }
        if (res.success) {
          _this.outputConsole.appendLine("You're a rockstar !");
        } else {
          _this.outputConsole.appendLine("Line: " + res.line);
          _this.outputConsole.appendLine(res.compileProblem);
        }
      });
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