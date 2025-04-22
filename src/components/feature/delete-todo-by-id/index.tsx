import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { deleteTodoById } from '@/services/use-delete-todo';
import { useState } from 'react';

interface DeleteTodoProps {
  open: boolean;
  onClose: () => void;
  todoId: string | null;
  onDelete: (id: string) => void;
}

export function DeleteTodoDialog({
  open,
  onClose,
  todoId,
  onDelete,
}: DeleteTodoProps) {
  const [loading, setLoading] = useState(false);

  const handleDeleteTodoById = async () => {
    if (!todoId) return;
    setLoading(true);
    try {
      await deleteTodoById(todoId);
      onDelete(todoId);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the task.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteTodoById}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
