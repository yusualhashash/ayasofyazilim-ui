'use client';

import { BlockEditor } from '@tiptap-location/components/BlockEditor';
import { EditIcon, SaveIcon } from 'lucide-react';
import React, { useState } from 'react';

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
  canEditable?: boolean;
  editorContent: JSONContent | undefined;
  setEditorContent?: React.Dispatch<React.SetStateAction<JSONContent>>;
}
export default function TipTapEditor({
  setEditorContent,
  editorContent,
  canEditable,
}: ITiptapEditorProps) {
  const [editable, setEditable] = useState<boolean>(false);

  return (
    <div className="relative">
      {canEditable && (
        <div className="absolute right-5 top-5 z-10">
          <button
            type="button"
            onClick={() => setEditable(!editable)}
            className="btn btn-ghost btn-circle opacity-40 hover:opacity-100"
          >
            {!editable ? <EditIcon /> : <SaveIcon />}
          </button>
        </div>
      )}
      <BlockEditor
        setEditorContent={setEditorContent}
        editorContent={editorContent}
        editable={editable}
      />
    </div>
  );
}
