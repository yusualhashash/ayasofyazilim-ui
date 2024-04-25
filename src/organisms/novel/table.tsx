import { useState, useEffect } from 'react';
import { Rows, Trash2, Columns } from 'lucide-react';
import { useEditor } from 'novel';
import { cx } from 'class-variance-authority';

interface TableMenuItem {
  command: () => void;
  icon: typeof Rows;
  name: string;
}

export const TableMenu = () => {
  const { editor } = useEditor();
  const [tableLocation, setTableLocation] = useState(0);
  const items: TableMenuItem[] = [
    {
      name: 'Add Column',
      // @ts-ignore
      command: () => editor.chain().focus().addColumnAfter().run(),
      icon: Columns,
    },
    {
      name: 'Add Row',
      // @ts-ignore
      command: () => editor.chain().focus().addRowAfter().run(),
      icon: Rows,
    },
    {
      name: 'Delete Column',
      // @ts-ignore
      command: () => editor.chain().focus().deleteColumn().run(),
      icon: Columns,
    },
    {
      name: 'Delete Rows',
      // @ts-ignore
      command: () => editor.chain().focus().deleteRow().run(),
      icon: Rows,
    },
    {
      name: 'Delete Table',
      // @ts-ignore
      command: () => editor.chain().focus().deleteTable().run(),
      icon: Trash2,
    },
  ];

  useEffect(() => {
    const handleWindowClick = () => {
      const selection: any = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      const tableNode = range.startContainer?.closest?.('table');
      if (tableNode) {
        const activeTable = tableNode.getBoundingClientRect(); // get the currently active table position
        const scrollOffset = window.scrollY; // culculating the current height of the site
        const tableTop = activeTable.top + scrollOffset;
        if (tableLocation !== tableTop) setTableLocation(tableTop);
      }
    };

    // Call the function if user click on the table
    window.addEventListener('click', handleWindowClick);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [tableLocation]);

  return (
    <section
      className="absolute left-2/4 flex translate-x-[-50%] overflow-hidden rounded border border-stone-200 bg-white shadow-xl"
      style={{
        top: `${tableLocation - 50}px`,
      }}
    >
      {items.map((item) => (
        /* eslint-disable-next-line */
        <button
          key={item.name}
          onClick={item.command}
          className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
          title={item.name}
        >
          <item.icon
            className={cx('h-5 w-5 text-lg', {
              'text-red-600': item.name.includes('Delete'),
            })}
          />
        </button>
      ))}
    </section>
  );
};
