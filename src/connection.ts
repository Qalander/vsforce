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
    /*var _this = this;
    this.jsforceConn.login(
      this.config.get<string>('username'),
      this.config.get<string>('password') + this.config.get<string>('securityToken'),
      function (err, res) {
        if(err) { return console.error(err); }
        console.log("LOGIN SUCCESS");
        _this.jsforceConn.query("SELECT ID FROM Case", function(err, res) {
          if(err){return console.error(err);}
          console.log(res);
        })
      });*/
  }
  
  // Execute a SOQL query and return the results to a callback function if no error.
  public executeQuery(query: string, callback: Function) {
    var _this = this;
    this.jsforceConn.login(this.config.get<string>('username'), 
      this.config.get<string>('password')+this.config.get<string>('securityToken'),
      function(err, res) {
        if(err){return console.error(err);}
        _this.jsforceConn.query(query, function(err, res) {
          if(err){return console.error(err);}
          callback(res);
        })
      });
  }

  public getConn() {
    return this.jsforceConn;
  }
}
