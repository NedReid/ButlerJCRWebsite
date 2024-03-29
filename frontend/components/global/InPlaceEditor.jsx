import "@bangle.dev/core/style.css";
import "@bangle.dev/tooltip/style.css";
import "@bangle.dev/react-menu/style.css";
import React from "react";
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
    hardBreak,
} from "@bangle.dev/base-components";
import { floatingMenu, FloatingMenu } from "@bangle.dev/react-menu";

const menuKey = new PluginKey("menuKey");

export default function TextEditor(props) {
    function onEditorDocChange(state) {
        props.onUpdate(toHTMLString(state));
    }

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
            hardBreak.spec(),
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
            hardBreak.plugins(),
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
        <div className="prose w-full w-full max-w-none">
            <BangleEditor state={editorState} className="max-w-none w-full w-full">
                <FloatingMenu menuKey={menuKey} />
            </BangleEditor>
        </div>
    );
}

// <FloatingMenu
//     editor={editor}
//     // We have a render prop to allow for updating
//     // menu whenever editors state changes
//     renderMenu={() => (
//         <Menu
//             style={{
//                 backgroundColor: 'transparent',
//                 color:
//                     document.documentElement.getAttribute('data-theme') === 'dark'
//                         ? 'white'
//                         : 'black',
//             }}
//         >
//             <MenuGroup>
//                 <UndoButton />
//                 <RedoButton />
//             </MenuGroup>
//             <MenuGroup>
//                 <BoldButton />
//                 <ItalicButton />
//             </MenuGroup>
//             <MenuGroup>
//                 <ParagraphButton />
//                 <BlockquoteButton />
//                 <HeadingButton level={2} />
//                 <HeadingButton level={3} />
//             </MenuGroup>
//             <BulletListButton />
//             <OrderedListButton />
//             <TodoListButton />
//
//         </Menu>
//     )}
// />
