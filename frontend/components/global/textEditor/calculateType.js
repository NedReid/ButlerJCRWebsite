import { link } from "@bangle.dev/base-components";
import { NodeSelection } from "@bangle.dev/pm";

// Port of bangle-io/bangle-editor/components/react-menu/src/floating-menu/defaultCalculateType, modified to return imageMenu

function hasComponentInSchema(state, name) {
    return Boolean(state.schema.nodes[name]) || Boolean(state.schema.marks[name]);
}

export const calculateType = (state) => {
    if (hasComponentInSchema(state, "link")) {
        if (link.queryIsSelectionAroundLink()(state) || link.queryIsLinkActive()(state)) {
            return "linkSubMenu";
        }
    }
    if (state.selection.empty) {
        return null;
    }

    if (state.selection instanceof NodeSelection && state.selection.node.type.name === "image") {
        return "imageMenu";
    }

    if (state.selection instanceof NodeSelection) {
        return "defaultMenu";
    }

    const { from, to } = state.selection;
    if (!hasTextBetween(state.doc, from, to)) {
        return null;
    }

    return "defaultMenu";
};

function hasTextBetween(doc, from, to) {
    let found = false;
    doc.nodesBetween(from, to, (node, pos) => {
        if (found) {
            return false;
        }
        if (node.isText) {
            const textStart = pos;
            const textEnd = pos + node.text.length;
            const noOverlap = from >= textEnd || to <= textStart;
            if (!noOverlap) {
                found = true;
                return false;
            }
        }
        return;
    });
    return found;
}
