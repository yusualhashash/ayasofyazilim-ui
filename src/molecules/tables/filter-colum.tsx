import { Trash2 } from 'lucide-react';
import React, { Dispatch, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  useEffect(() => {
    setFilteredValue(column.value);
  }, [column.value]);

  function handleSave() {
    if (!filteredValue) {
      handleDelete();
      return;
    }
    setFilteredColumns((val) => {
      const temp = [...val];
      const index = temp.findIndex((item) => item.name === column.name);
      temp[index] = { ...temp[index], value: filteredValue };

      return temp;
    });
  }
  function handleDelete() {
    setFilteredColumns((val) => {
      const index = val.findIndex((item) => item.name === column.name);
      val.splice(index, 1);
      const temp = [...val];
      return temp;
    });
  }

  return (
    <Dialog defaultOpen>
      <DialogTrigger
        className={`border px-3 py-1 border-gray-300 rounded-full text-xs mr-2 ${
          column.value.length === 0 ? 'hidden' : ''
        }`}
      >
        <span className="font-semibold">{column.displayName}</span>:{' '}
        {column.type === 'date'
          ? new Date(column.value).toLocaleDateString()
          : column.value}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Label htmlFor="name">{column.displayName}</Label>
        <div className="flex flex-row items-center gap-2 justify-center">
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
            <Calendar
              initialFocus
              mode="single"
              onSelect={(value) => {
                setFilteredValue(value?.toISOString() || '');
              }}
              selected={new Date(filteredValue || 0)}
            />
          )}
        </div>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="px-3 py-1"
              onClick={() => handleDelete()}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => handleSave()}>
              Filtrele
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
