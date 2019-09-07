import * as vscode from "vscode";
import * as path from "path";
import { SkaffolderObject } from "./SkaffolderObject";

export class SkaffolderNode extends vscode.TreeItem {
  constructor(
    private context: vscode.ExtensionContext,
    public readonly skaffolderObject: SkaffolderObject,
    type: string,
    indexMap: number[]
  ) {
    super("", vscode.TreeItemCollapsibleState.None);

    if (type === "api") {
      this.skaffolderObject.resources.forEach((element, index) => {
        this.children.push(
          new SkaffolderNode(context, skaffolderObject, "api_db", [index])
        );
      });
    } else if (type === "api_db") {
      // Set db
      this.label = this.skaffolderObject.resources[indexMap[0]].name;
      this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
      this.iconPath = {
        light: this.context.asAbsolutePath(
          path.join("media", "light", "database.svg")
        ),
        dark: this.context.asAbsolutePath(
          path.join("media", "dark", "database.svg")
        )
      };

      // Find children
      this.skaffolderObject.resources[indexMap[0]]._resources.forEach(
        (element, index) => {
          let indexArr: number[] = [indexMap[0], index];
          this.children.push(
            new SkaffolderNode(
              context,
              skaffolderObject,
              "api_db_resource",
              indexArr
            )
          );
        }
      );
    } else if (type === "api_db_resource") {
      // Set resource
      this.label = this.skaffolderObject.resources[indexMap[0]]._resources[
        indexMap[1]
      ].name;
      this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
      this.iconPath = {
        light: this.context.asAbsolutePath(
          path.join("media", "light", "model.svg")
        ),
        dark: this.context.asAbsolutePath(
          path.join("media", "dark", "model.svg")
        )
      };

      // Find children
      this.skaffolderObject.resources[indexMap[0]]._resources[
        indexMap[1]
      ]._services.forEach((element, index) => {
        let indexArr: number[] = [indexMap[0], indexMap[1], index];
        this.children.push(
          new SkaffolderNode(
            context,
            skaffolderObject,
            "api_db_resource_api",
            indexArr
          )
        );
      });
    } else if (type === "api_db_resource_api") {
      // Set api
      this.label = this.skaffolderObject.resources[indexMap[0]]._resources[
        indexMap[1]
      ]._services[indexMap[2]].name;
      this.iconPath = {
        light: this.context.asAbsolutePath(
          path.join(
            "media",
            "light",
            "api_" +
              this.skaffolderObject.resources[indexMap[0]]._resources[
                indexMap[1]
              ]._services[indexMap[2]].method +
              ".svg"
          )
        ),
        dark: this.context.asAbsolutePath(
          path.join(
            "media",
            "dark",
            "api_" +
              this.skaffolderObject.resources[indexMap[0]]._resources[
                indexMap[1]
              ]._services[indexMap[2]].method +
              ".svg"
          )
        )
      };
    }

    if (type === "model") {
      this.skaffolderObject.resources.forEach((element, index) => {
        this.children.push(
          new SkaffolderNode(context, skaffolderObject, "model_db", [index])
        );
      });
    } else if (type === "model_db") {
      // Set db
      this.label = this.skaffolderObject.resources[indexMap[0]].name;
      this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
      this.iconPath = {
        light: this.context.asAbsolutePath(
          path.join("media", "light", "database.svg")
        ),
        dark: this.context.asAbsolutePath(
          path.join("media", "dark", "database.svg")
        )
      };

      // Find children
      this.skaffolderObject.resources[indexMap[0]]._resources.forEach(
        (element, index) => {
          let indexArr: number[] = [indexMap[0], index];
          this.children.push(
            new SkaffolderNode(
              context,
              skaffolderObject,
              "model_db_resource",
              indexArr
            )
          );
        }
      );
    } else if (type === "model_db_resource") {
      // Set resource
      this.label = this.skaffolderObject.resources[indexMap[0]]._resources[
        indexMap[1]
      ].name;
      this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
      this.iconPath = {
        light: this.context.asAbsolutePath(
          path.join("media", "light", "model.svg")
        ),
        dark: this.context.asAbsolutePath(
          path.join("media", "dark", "model.svg")
        )
      };

      // Find children
      this.skaffolderObject.resources[indexMap[0]]._resources[
        indexMap[1]
      ]._entity._attrs.forEach((element, index) => {
        let indexArr: number[] = [indexMap[0], indexMap[1], index];
        this.children.push(
          new SkaffolderNode(
            context,
            skaffolderObject,
            "model_db_resource_attr",
            indexArr
          )
        );
      });
    } else if (type === "model_db_resource_attr") {
      // Set attr
      this.label = this.skaffolderObject.resources[indexMap[0]]._resources[
        indexMap[1]
      ]._entity._attrs[indexMap[2]].name;

      this.iconPath = {
        light: this.context.asAbsolutePath(
          path.join("media", "light", "string.svg")
        ),
        dark: this.context.asAbsolutePath(
          path.join("media", "dark", "string.svg")
        )
      };

      // TODO: open file multiple
      let uri = [
        vscode.Uri.file("/Users/lucacarducci/git/test/crm/readme.txt"),
        vscode.Uri.file("/Users/lucacarducci/git/test/crm/package.json")
      ];

      this.command = {
        command: "skaffolder.openfile",
        title: "Open SKfile",
        arguments: [uri[0]]
      };
    }
  }

  public children: SkaffolderNode[] = [];
}
