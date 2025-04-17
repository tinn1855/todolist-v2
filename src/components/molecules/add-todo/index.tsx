import { validateTodoTitle } from '@/components/future/validate-title-todos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTodo } from '@/hooks/use-create-todo';
import { Todo } from '@/hooks/use-get-todos';
import { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (todo: Todo) => void;
  existingTodos: Todo[];
}

export function AddTodo({ onAdd, existingTodos }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMessage = validateTodoTitle(title, existingTodos);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const newTodo: Omit<Todo, 'id'> = {
      title: title.trim(),
      priority: 'medium',
      status: 'incomplete',
    };

    try {
      const created = await createTodo(newTodo);
      onAdd(created);
      setTitle('');
      setError('');
    } catch (err) {
      console.log(err);
      setError('Create Task Failed.');
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <label htmlFor="inputAdd" className="w-5/6">
          <Input
            placeholder="Add your text"
            id="inputAdd"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <Button type="submit" className="w-1/6">
          Add
        </Button>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </form>
  );
}
