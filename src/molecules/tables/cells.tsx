import { CellContext } from '@tanstack/react-table';
import Link from 'next/link';

export type cellWithLink<Tdata> = {
  cell: CellContext<Tdata, unknown>;
  cellValue?: string | ((row: Tdata) => string) | undefined;
  href: string | ((row: Tdata) => string);
};

export function CellWithLink<Tdata>({
  cell,
  href,
  cellValue,
}: cellWithLink<Tdata>) {
  const _value =
    typeof cellValue === 'function' ? cellValue(cell.row.original) : cellValue;
  const _href = typeof href === 'function' ? href(cell.row.original) : href;
  return (
    <Link className="text-blue-700" href={_href}>
      {cellValue ? _value : (cell.getValue() as string)}
    </Link>
  );
}
