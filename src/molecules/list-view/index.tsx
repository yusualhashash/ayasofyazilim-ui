import { Info } from 'lucide-react';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type ListViewItem = {
  label: string;
  value: React.ReactNode;
  info?: string;
};

function ListView({ list, title }: { list: ListViewItem[]; title?: string }) {
  return (
    <Table>
      {title && (
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-semibold text-black" colSpan={2}>
              {title}
            </TableHead>
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {list.map((item) => (
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium">
              {item.label}
              {item.info && (
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>{item.info}</TooltipContent>
                </Tooltip>
              )}
            </TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ListView;
