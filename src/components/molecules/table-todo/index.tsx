import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteTodoById } from '@/hooks/use-delete-todo';
import { Todo } from '@/hooks/use-get-todos';
import { useState } from 'react';
interface TableTodoProps {
  todos: Todo[];
  onStatusChange?: (id: number, status: Todo['status']) => void;
  onDelete: (id: number) => void;
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
}
export function TableTodo({
  todos,
  onStatusChange,
  onDelete,
  selectedIds,
  onToggleSelect,
}: TableTodoProps) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteTodoById = async () => {
    if (selectedId === null) return;

    try {
      await deleteTodoById(selectedId);
      onDelete(selectedId);
      setOpen(false);
    } catch (err) {
      throw new Error(`Failed to delete todo ${err}`);
    }
  };

  const openConfirmDelete = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Description Task</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow className="text-left" key={todo.id}>
            <TableCell className="font-medium">
              <Checkbox
                checked={selectedIds.includes(todo.id)}
                onCheckedChange={() => onToggleSelect(todo.id)}
              />
            </TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>
              <Select
                value={todo.status}
                onValueChange={(value: Todo['status']) =>
                  onStatusChange?.(todo.id, value)
                }
              >
                <SelectTrigger
                  className={`w-[120px] ${
                    todo.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="incomplete">Incomplete</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>{todo.priority}</TableCell>
            <TableCell className="text-right">
              <Button className="mr-2">Edit</Button>
              <Button
                variant="destructive"
                onClick={() => openConfirmDelete(todo.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              task.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTodoById}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Table>
  );
}
