# File Content Exporter

This Visual Studio Code extension allows you to right-click on one or multiple files in the explorer and export their contents into a single concatenated file. It provides two options:
1. **Export File Contents**: Allows you to select the destination file.
2. **Quick Export to FileExport.txt**: Automatically exports to `FileExport.txt` in the same directory as the selected files.

## Features

- Export selected file contents into a single file.
- Quick export with default file name and location.
- Context menu integration for easy access.
- Shortcut key for quick export.
- Information message with details of exported files.

## Usage

### Export File Contents

1. Right-click on one or multiple files in the explorer.
2. Select `Export File Contents`.
3. Choose the destination file and save.
4. An information message will appear, listing all exported files.

### Quick Export to FileExport.txt

1. Right-click on one or multiple files in the explorer.
2. Select `Quick Export to FileExport.txt`.
3. The contents will be exported to `FileExport.txt` in the same directory as the selected files.
4. An information message will appear, listing all exported files.

### Keyboard Shortcut

- Use `Ctrl+Shift+E` to trigger the quick export.

## Installation

To install this extension, follow these steps:

1. Download the latest `.vsix` package from the [releases page](https://github.com/ggoosen/file-content-exporter/releases).
2. Open Visual Studio Code.
3. Go to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
4. Click on the three-dot menu at the top right of the Extensions view and select `Install from VSIX...`.
5. Navigate to the downloaded `.vsix` file and select it.

## Packaging

To package the extension for distribution, follow these steps:

1. Ensure all changes are committed and pushed to your repository.
2. Run the following command to package your extension:
    ```bash
    vsce package
    ```
3. This will generate a `.vsix` file that you can distribute or publish.

## Publishing

To publish your extension to the Visual Studio Code Marketplace:

1. Create a publisher account on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/vscode).
2. Run the following command to login with `vsce`:
    ```bash
    vsce login <publisher name>
    ```
3. Publish your extension:
    ```bash
    vsce publish
    ```

For detailed instructions, refer to the [Visual Studio Code documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Development

To contribute to this extension or make modifications, follow these steps:

1. Clone the repository.
2. Open the project in Visual Studio Code.
3. Run `npm install` to install the dependencies.
4. Run `npm run compile` to build the extension.
5. Press `F5` to open a new VS Code window with the extension loaded.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on the [GitHub repository](https://github.com/ggoosen/file-content-exporter).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
