import { DeleteTodoDialog } from '@/components/feature/delete-todo-by-id';
import { EditTodo } from '@/components/feature/edit-todo';
import { SortByTitle } from '@/components/feature/sort-by-title';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Todo } from '@/services/use-get-todos';
import { ArrowDownUp } from 'lucide-react';
import { useState } from 'react';
import { ActionButtons } from './action-button';
import { SelectPriority } from './select-priority';
import { SelecStatus } from './select-status';
import { CheckboxColumn } from './checkbox';
interface TableTodoProps {
  todos: Todo[];
  onStatusChange?: (id: string, status: Todo['status']) => void;
  onPriorityChange?: (id: string, priority: Todo['priority']) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTodo: Todo) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  existingTodos: Todo[];
}

export function TableTodo({
  todos,
  onStatusChange,
  onPriorityChange,
  onDelete,
  onUpdate,
  selectedIds,
  onToggleSelect,
  existingTodos,
}: TableTodoProps) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editTodoId, setEditTodoId] = useState<string | null>(null);

  const { sortedData, sortByTitle } = SortByTitle(todos);

  const openConfirmDelete = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const openEditTodo = (id: string) => {
    setEditTodoId(id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[550px] cursor-pointer" onClick={sortByTitle}>
            <div className="flex items-center gap-2">
              Description Task
              <ArrowDownUp size={16} />
            </div>
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((todo) => (
          <TableRow className="text-left" key={todo.id}>
            <TableCell className="font-medium">
              <CheckboxColumn
                id={todo.id}
                selectedIds={selectedIds}
                onToggleSelect={onToggleSelect}
              />
            </TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>
              <SelecStatus
                status={todo.status}
                onStatusChange={(status) => onStatusChange?.(todo.id, status)}
              />
            </TableCell>
            <TableCell>
              <SelectPriority
                priority={todo.priority}
                onPriorityChange={(priority) =>
                  onPriorityChange?.(todo.id, priority)
                }
              />
            </TableCell>
            <TableCell className="text-right">
              <ActionButtons
                onEdit={() => openEditTodo(todo.id)}
                onDelete={() => openConfirmDelete(todo.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <EditTodo
        open={!!editTodoId}
        onClose={() => setEditTodoId(null)}
        todo={todos.find((t) => t.id === editTodoId) || null}
        existingTodos={existingTodos}
        onUpdate={onUpdate}
      />

      <DeleteTodoDialog
        open={open}
        onClose={() => setOpen(false)}
        todoId={selectedId}
        onDelete={onDelete}
      />
    </Table>
  );
}
