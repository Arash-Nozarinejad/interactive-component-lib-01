import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    HTMLAttributes
  } from 'react';
  import {
    ChevronDown,
    ChevronUp,
    ChevronsUpDown
  } from 'lucide-react';
  
  type SortDirection = 'asc' | 'desc' | null;
  
  interface SortState {
    column: string | null;
    direction: SortDirection;
  }
  
  interface TableContextValue {
    sortState: SortState;
    onSort: (column: string) => void;
    selectedRows: string[];
    onRowSelect: (id: string) => void;
    onSelectAll: () => void;
  }
  
  const TableContext = createContext<TableContextValue | null>(null);
  
  /** 
   * **TableProps**  
   * - Add `children?: React.ReactNode` so that this component can render nested elements.
   */
  export interface TableProps<T>
    extends HTMLAttributes<HTMLTableElement> {
    /** Required data array */
    data: T[];
    /** Optional React children (e.g., <TableHeader />, <TableBody />) */
    children?: React.ReactNode;
    /** Default sort column (key) */
    defaultSortColumn?: string;
    /** Default sort direction ('asc', 'desc', or null) */
    defaultSortDirection?: SortDirection;
    /** Whether table columns can be sorted by clicking the header */
    sortable?: boolean;
    /** Whether to show striped rows */
    striped?: boolean;
    /** Whether rows change background on hover */
    hoverable?: boolean;
    /** Whether the table has an outer border */
    bordered?: boolean;
    /** Whether rows can be selected */
    selectable?: boolean;
    /** Density for spacing: 'compact', 'normal', 'spacious' */
    density?: 'compact' | 'normal' | 'spacious';
    /** Currently selected row IDs (controlled) */
    selectedRows?: string[];
    /** Callback for row selection changes */
    onSelectionChange?: (selectedIds: string[]) => void;
    /** Function to derive a unique key for each row */
    rowKey?: (row: T) => string;
  }
  
  export interface TableColumnProps<T>
    extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
    /** Sorting key to match data objects */
    sortKey?: string;
    /** Overrides the table-level sortable setting for this column */
    sortable?: boolean;
    /** Optional column width (px, %, etc.) */
    width?: string | number;
    /** Custom sort function (not shown in this snippet) */
    sortFn?: (a: T, b: T) => number;
  }
  
  type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;
  type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;
  type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;
  type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
  
  /** ---------------------
   * Table (Context Provider)
   * ---------------------*/
  export function Table<T>({
    data,
    defaultSortColumn,
    defaultSortDirection = null,
    sortable = true,
    striped = false,
    hoverable = true,
    bordered = false,
    selectable = false,
    density = 'normal',
    selectedRows: controlledSelectedRows,
    onSelectionChange,
    rowKey = (row: any) => row.id,
    className,
    children,
    ...props
  }: TableProps<T>) {
    // Sort state
    const [sortState, setSortState] = useState<SortState>({
      column: defaultSortColumn || null,
      direction: defaultSortDirection
    });
  
    // Selection state
    const [internalSelectedRows, setInternalSelectedRows] = useState<string[]>(
      controlledSelectedRows || []
    );
  
    const isControlled = controlledSelectedRows !== undefined;
    const currentSelectedRows = isControlled ? controlledSelectedRows : internalSelectedRows;
  
    /** Sort handler: toggles 'asc', 'desc', and 'null' on repeated clicks. */
    const handleSort = useCallback(
      (column: string) => {
        if (!sortable) return; // No-op if table isn't sortable
        setSortState((prev) => {
          if (prev.column !== column) {
            return { column, direction: 'asc' };
          }
          // If clicking the same column again, cycle direction
          if (prev.direction === 'asc') return { column, direction: 'desc' };
          if (prev.direction === 'desc') return { column, direction: null };
          return { column, direction: 'asc' };
        });
      },
      [sortable]
    );
  
    /** Select/Deselect a specific row by ID */
    const handleRowSelect = useCallback(
      (id: string) => {
        if (!selectable) return; // No-op if table isn't selectable
        const newSelection = currentSelectedRows?.includes(id)
          ? currentSelectedRows.filter((rowId) => rowId !== id)
          : [...(currentSelectedRows || []), id];
  
        if (!isControlled) {
          setInternalSelectedRows(newSelection);
        }
        onSelectionChange?.(newSelection);
      },
      [currentSelectedRows, isControlled, onSelectionChange, selectable]
    );
  
    /** Select/Deselect all rows */
    const handleSelectAll = useCallback(() => {
      if (!selectable) return; // No-op if table isn't selectable
      const allIds = data.map(rowKey);
      const newSelection =
        (currentSelectedRows?.length || 0) === allIds.length ? [] : allIds;
      if (!isControlled) {
        setInternalSelectedRows(newSelection);
      }
      onSelectionChange?.(newSelection);
    }, [data, rowKey, currentSelectedRows, isControlled, onSelectionChange, selectable]);
  
    return (
      <TableContext.Provider
        value={{
          sortState,
          onSort: handleSort,
          selectedRows: currentSelectedRows || [],
          onRowSelect: handleRowSelect,
          onSelectAll: handleSelectAll
        }}
      >
        <div className="overflow-x-auto">
          <table
            className={[
              'w-full border-collapse',
              bordered && 'border border-gray-200',
              density === 'compact' && 'text-sm',
              density === 'spacious' && 'text-base',
              striped ? 'divide-y divide-gray-200' : '',
              hoverable ? 'hover:divide-gray-200' : '',
              className
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
  
  /** ---------------------
   * TableHeader
   * ---------------------*/
  export function TableHeader({
    className,
    children,
    ...props
  }: TableHeaderProps) {
    return (
      <thead
        className={[
          'bg-gray-50 text-left text-sm font-medium text-gray-500',
          className
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </thead>
    );
  }
  
  /** ---------------------
   * TableBody
   * ---------------------*/
  export function TableBody({ className, children, ...props }: TableBodyProps) {
    return (
      <tbody
        className={[
          'bg-white',
          className
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </tbody>
    );
  }
  
  /** ---------------------
   * TableRow
   * ---------------------*/
  export function TableRow({
    className,
    children,
    ...props
  }: TableRowProps) {
    return (
      <tr
        className={[
          'transition-colors',
          className
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </tr>
    );
  }
  
  /** ---------------------
   * TableHead (Table Header Cell)
   * ---------------------*/
  export function TableHead<T>({
    children,
    sortKey,
    sortable,
    className,
    ...props
  }: TableColumnProps<T>) {
    const context = useContext(TableContext);
    if (!context) {
      throw new Error('TableHead must be used within Table');
    }
  
    const { sortState, onSort } = context;
    const isActive = sortState.column === sortKey;
    const isSortable = sortKey && sortable !== false;
  
    const handleClick = () => {
      if (isSortable && sortKey) {
        onSort(sortKey);
      }
    };
  
    let icon = null;
    if (isSortable && sortKey) {
      if (isActive) {
        if (sortState.direction === 'asc') {
          icon = <ChevronUp className="h-4 w-4" />;
        } else if (sortState.direction === 'desc') {
          icon = <ChevronDown className="h-4 w-4" />;
        } else {
          icon = <ChevronsUpDown className="h-4 w-4" />;
        }
      } else {
        icon = (
          <ChevronsUpDown className="h-4 w-4 opacity-0 group-hover:opacity-100" />
        );
      }
    }
  
    return (
      <th
        className={[
          'px-4 py-3 font-medium text-left align-middle',
          isSortable ? 'cursor-pointer select-none' : '',
          className
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handleClick}
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {icon && <span className="inline-flex">{icon}</span>}
        </div>
      </th>
    );
  }
  
  /** ---------------------
   * TableCell (Table Body Cell)
   * ---------------------*/
  export function TableCell({
    className,
    children,
    ...props
  }: TableCellProps) {
    return (
      <td
        className={[
          'px-4 py-3 align-middle',
          className
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </td>
    );
  }
  