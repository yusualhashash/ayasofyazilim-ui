import CardList from '../../organisms/card-list';
import DataTable from '../../molecules/tables';
import { DashboardProps } from './types';
import ScrollArea from '../../molecules/scroll-area';

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
        <ScrollArea>
          <DataTable
            filterBy={filterBy}
            columnsData={columnsData}
            data={data}
            action={action}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
    </>
  );
}
