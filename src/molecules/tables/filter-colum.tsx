import { Trash2 } from 'lucide-react';
import React, { Dispatch, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdvancedCalendar from '../advanced-calendar';

export type ColumnFilter = {
  displayName: string;
  name: string;
  type: 'string' | 'number' | 'date';
  value: string;
};
interface IFilterColumnProps {
  column: ColumnFilter;
  setFilteredColumns: Dispatch<React.SetStateAction<ColumnFilter[]>>;
}

export default function FilterColumn({
  column,
  setFilteredColumns,
}: IFilterColumnProps) {
  const [filteredValue, setFilteredValue] = useState<string>(column.value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  useEffect(() => {
    setFilteredValue(column.value);
  }, [column.value]);

  function handleSave() {
    if (!filteredValue) {
      handleDelete();
      setIsDropdownOpen(false);
      return;
    }
    setFilteredColumns((val) => {
      const temp = [...val];
      const index = temp.findIndex((item) => item.name === column.name);
      temp[index] = { ...temp[index], value: filteredValue };

      return temp;
    });
    setIsDropdownOpen(false);
  }
  function handleDelete() {
    setFilteredColumns((val) => {
      const index = val.findIndex((item) => item.name === column.name);
      val.splice(index, 1);
      const temp = [...val];
      return temp;
    });
    setIsDropdownOpen(false);
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger
        className={`border px-3 py-1 border-gray-300 rounded-full text-xs mr-2 `}
      >
        <span className="font-semibold">{column.displayName}</span>:{' '}
        {column.type === 'date'
          ? column.value
            ? new Date(column.value).toLocaleDateString()
            : ''
          : column.value}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:max-w-md p-2">
        <div className="flex flex-row justify-between items-center mb-2">
          <Label htmlFor="name">{column.displayName}</Label>
          <Button variant="ghost" onClick={() => handleDelete()}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-row items-center gap-2 justify-center mb-2">
          {column.type === 'string' && (
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => {
                setFilteredValue(e.target.value);
              }}
              value={filteredValue}
              autoComplete="off"
            />
          )}
          {column.type === 'date' && (
            <AdvancedCalendar
              initialFocus
              mode="single"
              onSelect={(value) => {
                setFilteredValue(value?.toISOString() || '');
              }}
              selected={filteredValue ? new Date(filteredValue) : undefined}
            />
          )}
        </div>
        <Button
          variant="secondary"
          onClick={() => handleSave()}
          className="w-full"
        >
          Filtrele
        </Button>
        {/* <DropdownMenuFooter className="sm:justify-center">
          <DropdownMenuClose asChild>
            <Button
              variant="secondary"
              className="px-3 py-1"
              onClick={() => handleDelete()}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </DropdownMenuClose>
          <DropdownMenuClose asChild>
            <Button variant="outline" onClick={() => handleSave()}>
              Filtrele
            </Button>
          </DropdownMenuClose>
        </DropdownMenuFooter> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
