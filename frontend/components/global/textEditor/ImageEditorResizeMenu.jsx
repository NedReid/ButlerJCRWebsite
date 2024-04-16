import React, { useState } from "react";

import { NodeSelection } from "@bangle.dev/pm";
import { useEditorViewContext } from "@bangle.dev/react";
import { FloatingMenu, Menu, MenuButton, MenuGroup } from "@bangle.dev/react-menu";

import { Input } from "react-daisyui";
import { image } from "@bangle.dev/base-components";

const widthRegex = /.*width: (\d.+)px$/;

export function getImageWidth(alt) {
    if (!alt) {
        alt = "";
    }
    const result = widthRegex.exec(alt);

    if (result?.[1]) {
        return parseFloat(result[1]) ?? 0;
    }

    return 0;
}

export function updateImageClassWidth(imageClass, width) {
    if (!imageClass) {
        imageClass = "";
    }
    const match = widthRegex.exec(imageClass);

    if (match && match[1]) {
        imageClass = imageClass.split(`width: ${match[1]}px`).join("");
    }

    return imageClass + (imageClass.length > 0 ? ", " : "") + `width: ${width}px`;
}

function SubmitSizeButton({ imageWidth, view, isActive, onUpdate }) {
    const clampedWidth = Math.max(32, Math.min(2048, Math.round(imageWidth ?? 0)));

    return (
        <MenuButton
            hintPos="top"
            hint={"Set image width to " + clampedWidth + "px"}
            onMouseDown={(e) => {
                e.preventDefault();
                updateImageNodeWidth(view.state, view.dispatch, clampedWidth);
                onUpdate();
            }}
            isActive={isActive}
        >
            <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                <text
                    x="13"
                    y="13"
                    stroke="currentColor"
                    textAnchor="middle"
                    alignmentBaseline="central"
                    dominantBaseline="middle"
                >
                    {">"}
                </text>
            </svg>
        </MenuButton>
    );
}

const updateImageNodeWidth = (state, dispatch, newWidth) => {
    if (!(state.selection instanceof NodeSelection) || !state.selection.node) {
        return false;
    }
    const { node } = state.selection;

    if (node.type !== state.schema.nodes.image) {
        return false;
    }

    if (dispatch) {
        const newAttrs = {
            alt: updateImageClassWidth(node.attrs.class, newWidth),
        };
        dispatch(
            state.tr.setNodeMarkup(state.selection.$from.pos, undefined, {
                ...node.attrs,
                ...newAttrs,
            }),
        );
    }

    return true;
};

function getSelectedImageNodeWidth(state) {
    if (!(state.selection instanceof NodeSelection) || !state.selection.node) {
        return undefined;
    }
    const { node } = state.selection;

    if (node.type !== state.schema.nodes.image) {
        return undefined;
    }
    const { alt } = node.attrs ?? {};
    return getImageWidth(alt);
}

export function ImageEditorReactComponent({ menuKey }) {
    const view = useEditorViewContext();
    const [currentImageWidth, setCurrentImageWidth] = useState(
        getSelectedImageNodeWidth(view.state),
    );
    const [imageWidth, setImageWidth] = useState(currentImageWidth);

    return (
        <>
            <FloatingMenu
                menuKey={menuKey}
                renderMenuType={({ type }) => {
                    if (type === "imageMenu") {
                        const selectedImageWidth = getSelectedImageNodeWidth(view.state);
                        if (selectedImageWidth !== currentImageWidth) {
                            setCurrentImageWidth(selectedImageWidth);
                            setImageWidth(selectedImageWidth);
                        }
                        return (
                            <Menu>
                                <MenuGroup>
                                    <Input
                                        type="number"
                                        className="w-16 text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        size="sm"
                                        value={imageWidth}
                                        onChange={(event) =>
                                            setImageWidth(parseInt(event.target.value))
                                        }
                                    ></Input>
                                    <div className="ml-2">px</div>
                                    <SubmitSizeButton
                                        imageWidth={imageWidth}
                                        view={view}
                                        isActive={currentImageWidth !== imageWidth}
                                        onUpdate={() => setCurrentImageWidth(imageWidth)}
                                    />
                                </MenuGroup>
                            </Menu>
                        );
                    }
                    return null;
                }}
            />
        </>
    );
}

export const imageSpec = () => {
    const defaultImageSpec = image.spec();

    const imageSchema = {
        ...defaultImageSpec.schema,
        toDOM: (node) => [
            "img",
            {
                ...node.attrs,
                style: node.attrs.alt,
            },
        ],
    };

    return {
        ...defaultImageSpec,
        schema: imageSchema,
    };
};
