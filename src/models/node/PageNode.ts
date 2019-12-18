import * as vscode from "vscode";
import * as path from "path";
import { SkaffolderNode } from "../SkaffolderNode";
import { Page } from "../jsonreader/page";

export class PageNode {
  static execute(node: SkaffolderNode, indexMap: number[]) {
    let page: Page = node.skaffolderObject.modules[indexMap[0]];
    node.label = page.name;
    node.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    node.iconPath = {
      light: node.context.asAbsolutePath(path.join("media", "light", "database.svg")),
      dark: node.context.asAbsolutePath(path.join("media", "dark", "database.svg"))
    };
    let contexturl = vscode.Uri.file(vscode.workspace.rootPath + "/openapi.yaml");
    let rangeModel = page.index;
    // this.command = {
    //   command: "skaffolder.openpage",
    //   title: "Open SKfile Page",
    //   arguments: [
    //     contexturl,
    //     rangeModel,
    //     page
    //   ]
    // };
    node.params = {
      type: "module",
      contextUrl: contexturl,
      page: page,
      range: rangeModel
    };
    node.iconPath = {
      light: node.context.asAbsolutePath(path.join("media", "light", "page.svg")),
      dark: node.context.asAbsolutePath(path.join("media", "dark", "page.svg"))
    };

    // Find children
    if (page._services) {
      page._services.forEach((element: any, index: any) => {
        let indexArr: number[] = [indexMap[0], index];
        node.children.push(new SkaffolderNode(node.context, node.skaffolderObject, "page_page_api", indexArr));
      });
    }
  }
}
