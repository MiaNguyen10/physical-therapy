import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import TablePagination from './TablePagination'

const DataGridTable = ({
    sx,
    rowHeight,
    columns,
    rows,
    page,
    rowsPerPage = 10,
    rowCount,
    pagination = false,
    isLoading,
    onPageChange,
    toolbar,
    toolbarProps,
    checkbox,
    checkboxProps,
    initialState,
    getRowId,
    columnVisibilityModel,
    onSelectionModelChange,
    selectionModel,
    onRowSelectable,
    hideFooter = false,
    paginationMode =  'server',
})=> (
    <DataGrid
        sx={{
            height: '660px',
            width: '1350px',
            '.MuiButtonBase-root': {
                '&.Mui-checked': {
                    color: '#0C5E96',
                },
            },
            ...sx,
        }}
        components={{
            Pagination: TablePagination,
            Toolbar: toolbar,
            BaseCheckbox: checkbox,
        }}
        componentsProps={{
            toolbar: { ...toolbarProps },
            baseCheckbox: { ...checkboxProps },
        }}
        pageSize={rowsPerPage}
        initialState={initialState}
        columnVisibilityModel={columnVisibilityModel}
        page={page}
        columns={columns}
        rows={rows}
        rowHeight={rowHeight}
        rowCount={rowCount}
        onPageChange={onPageChange}
        pagination={pagination ? pagination : undefined}
        paginationMode={paginationMode}
        rowsPerPageOptions={rows?.length ? [rows.length] : [10]}
        loading={isLoading}
        getRowId={getRowId}
        onSelectionModelChange={(selectionModel) =>
            onSelectionModelChange && onSelectionModelChange(selectionModel)
        }
        selectionModel={selectionModel}
        isRowSelectable={onRowSelectable}
        disableSelectionOnClick
        hideFooter={hideFooter}
        autoPageSize={true}
    />
)

export default DataGridTable
