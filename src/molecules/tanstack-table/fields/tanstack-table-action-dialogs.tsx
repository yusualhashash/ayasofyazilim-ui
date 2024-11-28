import React, { Dispatch, useEffect } from 'react';
import {
  TanstackTableRowActionsType,
  TanstackTableTableActionsType,
} from '../types';
import {
  TanstackTableAutoformDialog,
  TanstackTableConfirmationDialog,
  TanstackTableCustomDialog,
  TanstackTableTableAutoformDialog,
  TanstackTableTableCustomDialog,
} from '.';

function TanstackTableActionDialogs<TData>({
  rowAction,
  setRowAction,
  tableAction,
  setTableAction,
}: {
  rowAction: (TanstackTableRowActionsType<TData> & { row: TData }) | null;
  setRowAction: Dispatch<
    React.SetStateAction<
      | (TanstackTableRowActionsType<TData> & {
          row: TData;
        })
      | null
    >
  >;
  setTableAction: Dispatch<
    React.SetStateAction<TanstackTableTableActionsType | null>
  >;
  tableAction: TanstackTableTableActionsType | null;
}) {
  useEffect(() => {
    if (rowAction?.type === 'simple') {
      rowAction.onClick(rowAction.row);
      setRowAction(null);
    }
  }, [rowAction]);

  return (
    <>
      {rowAction?.type === 'confirmation-dialog' && (
        <TanstackTableConfirmationDialog<TData>
          setDialogOpen={() => setRowAction(null)}
          row={rowAction.row}
          title={rowAction.title}
          description={rowAction.description}
          confirmationText={rowAction.confirmationText}
          cancelText={rowAction.cancelText}
          onConfirm={rowAction.onConfirm}
          onCancel={rowAction.onCancel}
          type="confirmation-dialog"
        />
      )}
      {rowAction?.type === 'custom-dialog' && (
        <TanstackTableCustomDialog<TData>
          setDialogOpen={() => setRowAction(null)}
          row={rowAction.row}
          title={rowAction.title}
          content={rowAction.content}
          confirmationText={rowAction.confirmationText}
          cancelText={rowAction.cancelText}
          onConfirm={rowAction.onConfirm}
          onCancel={rowAction.onCancel}
          type="custom-dialog"
        />
      )}
      {rowAction?.type === 'autoform-dialog' && (
        <TanstackTableAutoformDialog<TData>
          setDialogOpen={() => setRowAction(null)}
          row={rowAction.row}
          title={rowAction.title}
          schema={rowAction.schema}
          submitText={rowAction.submitText}
          onSubmit={rowAction.onSubmit}
          values={rowAction.values}
          type="autoform-dialog"
        />
      )}
      {tableAction?.type === 'autoform-dialog' && (
        <TanstackTableTableAutoformDialog
          setDialogOpen={() => setTableAction(null)}
          title={tableAction.title}
          schema={tableAction.schema}
          submitText={tableAction.submitText}
          onSubmit={tableAction.onSubmit}
          values={tableAction.values}
          type="autoform-dialog"
        />
      )}
      {tableAction?.type === 'custom-dialog' && (
        <TanstackTableTableCustomDialog
          setDialogOpen={() => setTableAction(null)}
          title={tableAction.title}
          type="custom-dialog"
          content={tableAction.content}
          confirmationText={tableAction.confirmationText}
          cancelText={tableAction.cancelText}
          onConfirm={tableAction.onConfirm}
          onCancel={tableAction.onCancel}
        />
      )}
    </>
  );
}

export default TanstackTableActionDialogs;
