import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { statuses } from '../data/data'
import { Task } from '../data/schema'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Código' />
    ),
    cell: ({ row }) => <div className='w-[80px] font-medium'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Título' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('title')}
      </span>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Descrição' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('description')}
      </span>
    ),
  },
  
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className='flex w-[125px] items-center font-medium'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {category ? category.name : 'Sem Categoria'}
        </span>
      );
    }
  },
  {
    accessorKey: 'creationDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Data de Criação' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('creationDate');
      const formattedDate = date && typeof date === 'string' || typeof date === 'number'
        ? new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : 'Sem data';
      return (
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: 'completionDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Data de Conclusão' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('completionDate');
      const formattedDate = date && typeof date === 'string' || typeof date === 'number'
        ? new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : 'Não concluído';
      return (
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {formattedDate}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
