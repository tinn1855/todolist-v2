import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Todo } from '@/services/use-get-todos';
import { useEffect, useState } from 'react';
import { validateTodoTitle } from '../validate-title-todos';
import { updateTodoTitle } from '@/services/use-update-todos';

interface EditTodoProps {
  open: boolean;
  onClose: () => void;
  todo: Todo | null;
  existingTodos: Todo[];
  onUpdate: (update: Todo) => void;
}

export function EditTodo({
  open,
  onClose,
  todo,
  existingTodos,
  onUpdate,
}: EditTodoProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setError('');
    }
  }, [todo]);

  const handleSave = async () => {
    if (!todo) return;
    const errorMessage = validateTodoTitle(title, existingTodos, todo.id);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    try {
      const updatedTodo = await updateTodoTitle(todo.id, {
        title,
        status: todo.status,
      });
      onUpdate(updatedTodo);
      onClose();
    } catch (err) {
      throw new Error(`Erorr update todo: ${err}`);
    }
  };
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>Update the details of the todo.</DialogDescription>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
