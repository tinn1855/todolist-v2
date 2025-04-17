import { AddTodo } from '@/components/molecules/add-todo';
import { PaginationTodo } from '@/components/molecules/pagination';
import { TableTodo } from '@/components/molecules/table-todo';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTodos, Todo } from '@/hooks/use-get-todos';
import { updateTodoStatus } from '@/hooks/use-update-todos';
import { useEffect, useState } from 'react';

export function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: Todo['status']) => {
    try {
      const updated = await updateTodoStatus(id, newStatus);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, status: updated.status } : todo
        )
      );
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update status');
    }
  };
  const handleAddTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };
  const handleDeleteTodoById = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto px-4 text-center max-w-5xl">
      <Heading className="">TODO LIST</Heading>
      <div className="py-5">
        <AddTodo onAdd={handleAddTodo} existingTodos={todos} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline">Select All</Button>
          <Button variant="destructive">Delete All</Button>
        </div>
        <div className="flex gap-2 items-center">
          <span>Filter By:</span>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="py-5">
        <TableTodo
          todos={todos}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTodoById}
        />
      </div>
      <PaginationTodo></PaginationTodo>
    </div>
  );
}
