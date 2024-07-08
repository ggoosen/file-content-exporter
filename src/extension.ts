import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposableExportFiles = vscode.commands.registerCommand('file-content-exporter.exportFiles', async (uri: vscode.Uri, selectedUris: vscode.Uri[]) => {
        if (!selectedUris || selectedUris.length === 0) {
            vscode.window.showErrorMessage('No files selected.');
            return;
        }

        // Concatenate the selected files
        let output = '';
        let fileNames = '';
        for (const fileUri of selectedUris) {
            if (fs.existsSync(fileUri.fsPath)) {
                const fileStat = fs.statSync(fileUri.fsPath);
                const relativePath = path.relative(vscode.workspace.rootPath || '', fileUri.fsPath).replace(/\\/g, '/');
                const fileContent = fs.readFileSync(fileUri.fsPath, 'utf8');

                output += `
====================
File: ${path.basename(fileUri.fsPath)}
====================
Full Path: ${fileUri.fsPath}
Relative Path: ${relativePath}
Created: ${fileStat.birthtime}
Last Modified: ${fileStat.mtime}
Size: ${fileStat.size} bytes
====================
Content:

${fileContent}

====================

`;
                fileNames += `\n${path.basename(fileUri.fsPath)}`;
            } else {
                output += `File not found: ${fileUri.fsPath}\n`;
                fileNames += `\n(File not found: ${path.basename(fileUri.fsPath)})`;
            }
        }

        const defaultUri = vscode.Uri.file(path.join(path.dirname(selectedUris[0].fsPath), 'FileExport.txt'));

        const saveUri = await vscode.window.showSaveDialog({
            defaultUri,
            saveLabel: 'Save concatenated file',
            filters: {
                'Text Files': ['txt']
            }
        });

        if (saveUri) {
            fs.writeFileSync(saveUri.fsPath, output, 'utf8');
            vscode.window.showInformationMessage(`Files exported to ${saveUri.fsPath}${fileNames}`);
        } else {
            vscode.window.showErrorMessage('Save operation was canceled.');
        }
    });

    let disposableQuickExport = vscode.commands.registerCommand('file-content-exporter.quickExport', async (uri: vscode.Uri, selectedUris: vscode.Uri[]) => {
        if (!selectedUris || selectedUris.length === 0) {
            vscode.window.showErrorMessage('No files selected.');
            return;
        }

        // Concatenate the selected files
        let output = '';
        let fileNames = '';
        for (const fileUri of selectedUris) {
            if (fs.existsSync(fileUri.fsPath)) {
                const fileStat = fs.statSync(fileUri.fsPath);
                const relativePath = path.relative(vscode.workspace.rootPath || '', fileUri.fsPath).replace(/\\/g, '/');
                const fileContent = fs.readFileSync(fileUri.fsPath, 'utf8');

                output += `
====================
File: ${path.basename(fileUri.fsPath)}
====================
Full Path: ${fileUri.fsPath}
Relative Path: ${relativePath}
Created: ${fileStat.birthtime}
Last Modified: ${fileStat.mtime}
Size: ${fileStat.size} bytes
====================
Content:

${fileContent}

====================

`;
                fileNames += `\n${path.basename(fileUri.fsPath)}`;
            } else {
                output += `File not found: ${fileUri.fsPath}\n`;
                fileNames += `\n(File not found: ${path.basename(fileUri.fsPath)})`;
            }
        }

        const outputFile = path.join(path.dirname(selectedUris[0].fsPath), 'FileExport.txt');
        fs.writeFileSync(outputFile, output, 'utf8');
        vscode.window.showInformationMessage(`Files exported to ${outputFile}${fileNames}`);
    });

    context.subscriptions.push(disposableExportFiles);
    context.subscriptions.push(disposableQuickExport);
}

export function deactivate() {}
