import { Project } from "./jsonreader/project";
import { Db } from "./jsonreader/db";
import * as vscode from "vscode";
import { SkaffolderObject } from "./SkaffolderObject";

export class SkaffolderNode extends vscode.TreeItem {
  constructor(
    public readonly skaffolderObject: SkaffolderObject,
    type: string,
    indexMap: number[]
  ) {
    super("", vscode.TreeItemCollapsibleState.None);

    console.log("type:" + type);
    if (type === "api") {
      this.skaffolderObject.resources.forEach((element, index) => {
        this.children.push(
          new SkaffolderNode(skaffolderObject, "api_db", [index])
        );
      });
    } else if (type === "api_db") {
      // Set db
      this.label = this.skaffolderObject.resources[indexMap[0]].name;
      this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;

      // Find children
      this.skaffolderObject.resources[indexMap[0]]._resources.forEach(
        (element, index) => {
          let indexArr: number[] = [indexMap[0], index];
          this.children.push(
            new SkaffolderNode(skaffolderObject, "api_db_resource", indexArr)
          );
        }
      );
    } else if (type === "api_db_resource") {
      // Set resource
      this.label = this.skaffolderObject.resources[indexMap[0]]._resources[
        indexMap[1]
      ].name;
    }
  }

  public children: SkaffolderNode[] = [];
}
