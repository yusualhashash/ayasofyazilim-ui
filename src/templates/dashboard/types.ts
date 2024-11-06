import { DataTableProps } from '../../molecules/tables/types';
import { CardListPorps } from '../../organisms/card-list';

type DashboardExtraProps = {
  withCards: boolean;
  withTable: boolean;
};

export type DashboardProps = DashboardExtraProps &
  CardListPorps &
  DataTableProps<any>;
