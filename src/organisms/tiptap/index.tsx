'use client';

import { BlockEditor } from '@tiptap-location/components/BlockEditor';
import { EditIcon, SaveIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';

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
  editOnStart?: boolean;
  editorContent?: JSONContent | undefined;
  editorId?: string;
  minWordCount?: number;
  onSaveFunction?: (editorId: string, editorContent: string) => Promise<string>;
  onWordCountChanged?: (wordCount: number) => void;
  editorClassName?: string;
}

export default function TipTapEditor({
  editorId,
  editorContent,
  canEditable,
  editOnStart,
  minWordCount = 10,
  onSaveFunction,
  onWordCountChanged,
  editorClassName,
}: ITiptapEditorProps) {
  const [isButtonsDisabled, setIsButtonsDisabled] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  const [editable, setEditable] = useState<boolean>(!!editOnStart);
  const [defaultContent, setDefaultContent] = useState<JSONContent | undefined>(
    editorContent
  );
  const [content, setContent] = useState<JSONContent | undefined>(
    editorContent
  );
  const [wordCount, setWordCount] = useState<number>(0);

  useEffect(() => {
    if (
      wordCount < minWordCount ||
      JSON.stringify(content) === JSON.stringify(defaultContent)
    ) {
      setIsSaveDisabled(true);
      return;
    }
    setIsSaveDisabled(false);
  }, [content, editorContent]);
  useEffect(() => {
    if (onWordCountChanged) {
      onWordCountChanged(wordCount);
    }
  }, [wordCount]);

  async function onSave() {
    if (!onSaveFunction || !editorId) return;

    setIsButtonsDisabled(true);
    setEditable(false);
    const result = await onSaveFunction(
      editorId,
      content ? JSON.stringify(content) : ''
    );
    setIsButtonsDisabled(false);
    if (result === 'OK') {
      setDefaultContent(content);
      toast.success('Başarılı');
      return;
    }
    toast.error(result);
  }

  function onCancel() {
    setContent(editorContent);
    setEditable(!editable);
  }
  return (
    <div className="relative h-full overflow-hidden">
      {canEditable && !isButtonsDisabled && (
        <div className="absolute right-5 top-5 z-10">
          {editable ? (
            <div>
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-ghost btn-circle opacity-40 hover:opacity-100 mr-4"
                aria-label="Cancel"
              >
                <X />
              </button>
              <button
                disabled={isSaveDisabled}
                type="button"
                onClick={onSave}
                className="btn btn-ghost btn-circle opacity-40 hover:opacity-100 disabled:opacity-10"
                aria-label="Save"
              >
                <SaveIcon />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditable(!editable)}
              className="btn btn-ghost btn-circle opacity-40 hover:opacity-100"
              aria-label="Edit"
            >
              <EditIcon />
            </button>
          )}
        </div>
      )}
      <BlockEditor
        setEditorContent={setContent}
        setWordCount={setWordCount}
        editorContent={content}
        editable={editable}
        className={editorClassName}
      />
    </div>
  );
}
