import { SortByTitle } from '@/components/future/sort-by-title';
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
import { Input } from '@/components/ui/input';
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
import { updateTodoTitle } from '@/hooks/use-update-todos';
import { ArrowDownUp } from 'lucide-react';
import { useState } from 'react';

interface TableTodoProps {
  todos: Todo[];
  onStatusChange?: (id: number, status: Todo['status']) => void;
  onPriorityChange?: (id: number, priority: Todo['priority']) => void;
  onDelete: (id: number) => void;
  onUpdate: (updatedTodo: Todo) => void; // Thêm onUpdate để cập nhật todos trong state
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
}

export function TableTodo({
  todos,
  onStatusChange,
  onPriorityChange,
  onDelete,
  onUpdate, // Nhận thêm prop onUpdate
  selectedIds,
  onToggleSelect,
}: TableTodoProps) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState<Partial<Todo>>({ title: '' });

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

  const openEditTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditTodoId(id);
      setEditTodo({ title: todo.title, status: todo.status });
    }
  };

  const handleSaveEdit = async () => {
    if (editTodoId === null || !editTodo.title || !editTodo.status) return;

    try {
      // Cập nhật todo trên server
      const updatedTodo = await updateTodoTitle(editTodoId, editTodo);

      // Cập nhật todo trong state ngay lập tức
      onUpdate(updatedTodo); // Cập nhật danh sách todos trong state

      // Đóng modal sau khi lưu
      setEditTodoId(null);
      setEditTodo({ title: '', status: 'incomplete' });
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };
  const { sortedData, sortByTitle } = SortByTitle(todos);

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
            <TableCell>
              <Select
                value={todo.priority}
                onValueChange={(value: Todo['priority']) =>
                  onPriorityChange?.(todo.id, value)
                }
              >
                <SelectTrigger
                  className={`w-[100px] ${
                    todo.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : todo.priority === 'medium'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-black text-white'
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-right">
              <Button className="mr-2" onClick={() => openEditTodo(todo.id)}>
                Edit
              </Button>
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

      <Dialog open={!!editTodoId} onOpenChange={() => setEditTodoId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              Update the details of the todo.
            </DialogDescription>
            <DialogDescription>
              <Input
                value={editTodo?.title || ''}
                onChange={(e) =>
                  setEditTodo({ ...editTodo, title: e.target.value })
                }
              ></Input>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTodoId(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Table>
  );
}
