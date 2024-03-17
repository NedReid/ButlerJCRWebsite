import "@bangle.dev/core/style.css";
import "@bangle.dev/tooltip/style.css";
import "@bangle.dev/react-menu/style.css";
import React, { useState } from "react";
import { BangleEditor, useEditorState } from "@bangle.dev/react";
import { PluginKey, Plugin } from "@bangle.dev/core";
import { toHTMLString } from "@bangle.dev/utils";

import {
    bold,
    italic,
    link,
    bulletList,
    heading,
    listItem,
    orderedList,
    blockquote,
    paragraph,
    image,
} from "@bangle.dev/base-components";
import {
    floatingMenu,
    StaticMenu,
    Menu,
    HeadingButton,
    ParagraphButton,
    BlockquoteButton,
    BulletListButton,
    OrderedListButton,
    TodoListButton,
    BoldButton,
    ItalicButton,
    MenuGroup,
    UndoButton,
    RedoButton,
} from "@bangle.dev/react-menu";

const menuKey = new PluginKey("menuKey");

export default function TextEditor(props) {
    function onEditorDocChange(state) {
        props.onUpdate(toHTMLString(state));
    }
    const [editor, setEditor] = useState();
    const editorState = useEditorState({
        specs: [
            bold.spec(),
            italic.spec(),
            link.spec(),
            blockquote.spec(),
            orderedList.spec(),
            bulletList.spec(),
            listItem.spec(),
            paragraph.spec(),
            heading.spec(),
            image.spec(),
        ],
        plugins: () => [
            image.plugins(),
            bold.plugins(),
            italic.plugins(),
            link.plugins(),
            blockquote.plugins(),
            orderedList.plugins(),
            bulletList.plugins(),
            listItem.plugins(),
            paragraph.plugins(),
            heading.plugins(),
            floatingMenu.plugins({
                key: menuKey,
            }),
            new Plugin({
                view: () => ({
                    update: (view, prevState) => {
                        if (!view.state.doc.eq(prevState.doc)) {
                            onEditorDocChange(view.state);
                        }
                    },
                }),
            }),
        ],
        initialValue: props.initialValue,
    });

    return (
        <div className="prose max-w-2xl">
            <StaticMenu
                editor={editor}
                // We have a render prop to allow for updating
                // menu whenever editors state changes
                renderMenu={() => (
                    <Menu
                        style={{
                            backgroundColor: "transparent",
                            color:
                                document.documentElement.getAttribute("data-theme") === "dark"
                                    ? "white"
                                    : "black",
                        }}
                    >
                        <MenuGroup>
                            <UndoButton />
                            <RedoButton />
                        </MenuGroup>
                        <MenuGroup>
                            <BoldButton />
                            <ItalicButton />
                        </MenuGroup>
                        <MenuGroup>
                            <ParagraphButton />
                            <BlockquoteButton />
                            <HeadingButton level={2} />
                            <HeadingButton level={3} />
                        </MenuGroup>
                        <BulletListButton />
                        <OrderedListButton />
                        <TodoListButton />
                    </Menu>
                )}
            />
            <BangleEditor state={editorState} onReady={setEditor} />
        </div>
    );
}
