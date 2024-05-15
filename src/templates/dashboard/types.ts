import { DataTableProps } from 'src/molecules/tables';
import { CardListPorps } from 'src/organisms/card-list';

type DashboardExtraProps = {
  withCards: boolean;
  withTable: boolean;
};

export type DashboardProps = DashboardExtraProps &
  CardListPorps &
  DataTableProps<any>;
