'use client';

import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import { useEffect, useRef } from 'react';

import { LinkMenu } from '@tiptap-location/components/menus';

import '@tiptap-location/styles/index.css';

import ImageBlockMenu from '@tiptap-location/extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from '@tiptap-location/extensions/MultiColumn/menus';
import {
  TableColumnMenu,
  TableRowMenu,
} from '@tiptap-location/extensions/Table/menus';
import ExtensionKit from '@tiptap-location/extensions/extension-kit';
import { ContentItemMenu } from '../menus/ContentItemMenu';
import { TextMenu } from '../menus/TextMenu';
import { ITiptapEditorProps } from 'src/organisms/tiptap';

export const BlockEditor = ({
  setEditorContent,
  editorContent,
  editable,
}: ITiptapEditorProps) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editor = useEditor(
    {
      autofocus: true,
      extensions: [...ExtensionKit()],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full outline-none',
        },
      },
      content: editorContent,
      editable: editable,
      onUpdate: ({ editor }) => {
        if (setEditorContent) {
          const json = editor.getJSON();
          setEditorContent(json);
        }
      },
    },
    []
  );

  useEffect(() => {
    if (editor && editor.isEditable !== editable) {
      editor.setEditable(editable);
    }
  }, [editable]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div
        className={
          'relative flex flex-col flex-1 h-full overflow-hidden ' +
          (editable ? 'edit-mode' : 'preview-mode')
        }
      >
        <EditorContent editor={editor} ref={editorRef} />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};

export default BlockEditor;
