# File Content Exporter Extension for Visual Studio Code

Welcome to your new File Content Exporter extension for Visual Studio Code! This guide will help you get started with the development and usage of your extension.

## What's in the Folder

* `package.json` - Contains the essential information about your extension, such as its name, version, and description. It also includes scripts to build, run, and package your extension.
* `src/extension.ts` - The source code of your extension. This is where you implement the functionality of your commands.
* `README.md` - This file contains a description of your extension's features and usage instructions.
* `CHANGELOG.md` - This file contains a history of your extension's updates and changes.

## Running Your Extension

To run your extension:

1. Press `F5` to open a new VS Code window with your extension loaded.
2. You can now test your extension by right-clicking on files in the explorer and using the commands provided by your extension.

## Structure of the Extension

### `package.json`

The `package.json` file contains metadata about your extension, such as:

- `name`, `displayName`, `description`, `version`
- `activationEvents`: Specifies when your extension should be activated.
- `contributes`: Defines the commands and keybindings provided by your extension.

### `src/extension.ts`

This is the main file where you implement the functionality of your extension. Key points include:

- Registering commands with `vscode.commands.registerCommand`.
- Handling the logic for concatenating file contents and exporting them.

Example of registering a command:

```typescript
let disposable = vscode.commands.registerCommand('file-content-exporter.exportFiles', async (uri: vscode.Uri, selectedUris: vscode.Uri[]) => {
    // Your implementation here
});
