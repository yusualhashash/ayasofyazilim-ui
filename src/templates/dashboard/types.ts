import { DataTableProps } from 'src/molecules/tables';
import { CardListPorps } from 'src/organisms/card-list';

export type DashboardProps = CardListPorps & DataTableProps<any, any>;
