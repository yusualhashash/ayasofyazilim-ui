import { BlockEditor } from '@tiptap-location/components/BlockEditor';
import React from 'react';

export declare type JSONContent = {
  [key: string]: any;
  attrs?: Record<string, any>;
  content?: JSONContent[];
  marks?: {
    [key: string]: any;
    attrs?: Record<string, any>;
    type: string;
  }[];
  text?: string;
  type?: string;
};
export interface ITiptapEditorProps {
  editable: boolean;
  editorContent: JSONContent;
  setEditorContent?: React.Dispatch<React.SetStateAction<JSONContent>>;
}
export default function TipTapEditor({
  setEditorContent,
  editorContent,
  editable,
}: ITiptapEditorProps) {
  return (
    <BlockEditor
      setEditorContent={setEditorContent}
      editorContent={editorContent}
      editable={editable}
    />
  );
}
