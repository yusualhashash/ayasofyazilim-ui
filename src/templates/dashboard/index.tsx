import DataTable from '../../molecules/tables';
import CardList from '../../organisms/card-list';
import { DashboardProps } from './types';

export default function Dashboard({
  cards,
  data,
  columnsData,
  action,
  isLoading,
  withCards,
  withTable,
  rowCount,
  fetchRequest,
  detailedFilter,
}: DashboardProps) {
  return (
    <>
      {withCards && <CardList isLoading={isLoading} cards={cards} />}
      {withTable && (
        <DataTable
          columnsData={columnsData}
          data={data}
          action={action}
          isLoading={isLoading}
          rowCount={rowCount}
          fetchRequest={fetchRequest}
          detailedFilter={detailedFilter}
        />
      )}
    </>
  );
}
