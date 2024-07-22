import DataTable from '../../molecules/tables';
import CardList from '../../organisms/card-list';
import { DashboardProps } from './types';

export default function Dashboard({
  cards,
  data,
  columnsData,
  filterBy,
  action,
  isLoading,
  withCards,
  withTable,
}: DashboardProps) {
  return (
    <>
      {withCards && (
        <div className="flex-row p-4 w-10/12">
          <CardList isLoading={isLoading} cards={cards} />
        </div>
      )}
      {withTable && (
        <DataTable
          filterBy={filterBy}
          columnsData={columnsData}
          data={data}
          action={action}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
