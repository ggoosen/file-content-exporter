import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposableExportFiles = vscode.commands.registerCommand('file-content-exporter.exportFiles', async (uri: vscode.Uri) => {
        const selectedFiles = vscode.window.activeTextEditor?.document.uri ? [vscode.window.activeTextEditor.document.uri] : [];

        if (!selectedFiles || selectedFiles.length === 0) {
            vscode.window.showErrorMessage('No files selected.');
            return;
        }

        let output = '';
        for (const fileUri of selectedFiles) {
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
            } else {
                output += `File not found: ${fileUri.fsPath}\n`;
            }
        }

        const defaultUri = vscode.Uri.file(path.join(path.dirname(uri.fsPath), 'FileExport.txt'));

        const saveUri = await vscode.window.showSaveDialog({
            defaultUri,
            saveLabel: 'Save concatenated file',
            filters: {
                'Text Files': ['txt']
            }
        });

        if (saveUri) {
            fs.writeFileSync(saveUri.fsPath, output, 'utf8');
            vscode.window.showInformationMessage(`File information has been saved to ${saveUri.fsPath}`);
        } else {
            vscode.window.showErrorMessage('Save operation was canceled.');
        }
    });

    let disposableQuickExport = vscode.commands.registerCommand('file-content-exporter.quickExport', async (uri: vscode.Uri) => {
        const selectedFiles = vscode.window.activeTextEditor?.document.uri ? [vscode.window.activeTextEditor.document.uri] : [];

        if (!selectedFiles || selectedFiles.length === 0) {
            vscode.window.showErrorMessage('No files selected.');
            return;
        }

        let output = '';
        for (const fileUri of selectedFiles) {
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
            } else {
                output += `File not found: ${fileUri.fsPath}\n`;
            }
        }

        const outputFile = path.join(path.dirname(uri.fsPath), 'FileExport.txt');
        fs.writeFileSync(outputFile, output, 'utf8');
        vscode.window.showInformationMessage(`File information has been saved to ${outputFile}`);
    });

    context.subscriptions.push(disposableExportFiles);
    context.subscriptions.push(disposableQuickExport);
}

export function deactivate() {}
