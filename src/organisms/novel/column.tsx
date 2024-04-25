import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useEditor } from 'novel';
import { cx } from 'class-variance-authority';

export const ColumnMenu = () => {
  const { editor } = useEditor();
  const [columnLocation, setColumnLocation] = useState(0);
  useEffect(() => {
    const handleWindowClick = () => {
      const selection: any = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      const columnNode = range.startContainer?.closest?.('.column');
      if (columnNode) {
        const activeColumn = columnNode.getBoundingClientRect(); // get the currently active column position
        const scrollOffset = window.scrollY; // culculating the current height of the site
        const columnTop = activeColumn.top + scrollOffset;
        if (columnLocation !== columnTop) setColumnLocation(columnTop);
      }
    };
    // Call the function if user click on the column
    window.addEventListener('click', handleWindowClick);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [columnLocation]);

  function deleteColumn() {
    editor?.chain().focus().unsetColumns().run();
    setColumnLocation(0);
  }

  return (
    <section
      className="absolute left-2/4 flex translate-x-[-50%] overflow-hidden rounded border border-stone-200 bg-white shadow-xl"
      style={{
        top: `${columnLocation - 50}px`,
      }}
    >
      {/* eslint-disable-next-line */}
      <button
        onClick={deleteColumn}
        className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        title="Delete Column"
      >
        <Trash2 className={cx('h-5 w-5 text-lg text-red-600')} />
      </button>
    </section>
  );
};
