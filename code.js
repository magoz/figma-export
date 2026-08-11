"use strict";
// figma-export — plugin controller (Figma sandbox side)
// Exports selected nodes as PNG and hands the bytes to the UI,
// which embeds real DPI metadata before downloading.
figma.showUI(__html__, { width: 320, height: 440 });
const describeSelection = () => figma.currentPage.selection.map(node => ({
    name: node.name,
    width: node.width,
    height: node.height
}));
const postSelection = () => {
    figma.ui.postMessage({ type: 'selection', items: describeSelection() });
};
figma.on('selectionchange', postSelection);
postSelection();
figma.ui.onmessage = async (msg) => {
    if (msg.type !== 'export')
        return;
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
        figma.notify('Select at least one frame to export');
        figma.ui.postMessage({ type: 'done', count: 0 });
        return;
    }
    let exported = 0;
    for (const node of selection) {
        try {
            const bytes = await node.exportAsync({
                format: 'PNG',
                constraint: { type: 'SCALE', value: msg.scale }
            });
            figma.ui.postMessage({ type: 'file', name: node.name, bytes });
            exported += 1;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            figma.notify(`Failed to export "${node.name}": ${message}`, { error: true });
        }
    }
    figma.ui.postMessage({ type: 'done', count: exported });
    if (exported > 0) {
        figma.notify(`Exported ${exported} file${exported === 1 ? '' : 's'}`);
    }
};
