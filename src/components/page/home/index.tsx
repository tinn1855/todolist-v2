import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AddTodo } from '@/components/molecules/add-todo';
import { PaginationTodo } from '@/components/molecules/pagination';
import { TableTodo } from '@/components/molecules/table-todo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { deleteAllTodos } from '@/hooks/use-delete-todo';
import { getTodos, Todo } from '@/hooks/use-get-todos';
import { updateTodoStatus } from '@/hooks/use-update-todos';

export function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openConfirmDeleteAll, setOpenConfirmDeleteAll] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 5;

  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState<number>(pageParam);

  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginationData = todos.slice(startIndex, startIndex + itemsPerPage);

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

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? todos.map((t) => t.id) : []);
  };

  const handleConfirmDeleteAll = async () => {
    try {
      await deleteAllTodos(selectedIds);
      setTodos((prev) => prev.filter((todo) => !selectedIds.includes(todo.id)));
      setSelectedIds([]);
      setOpenConfirmDeleteAll(false);
    } catch (error) {
      console.error('Failed to delete selected todos:', error);
    }
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page <= 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', String(page));
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 text-center max-w-5xl">
      <Heading className="py-5">TODO LIST</Heading>
      <div className="py-5">
        <AddTodo onAdd={handleAddTodo} existingTodos={todos} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {todos.length > 1 && (
            <Button
              variant="outline"
              onClick={() =>
                handleSelectAll(selectedIds.length !== todos.length)
              }
            >
              {selectedIds.length === todos.length
                ? 'Unselect All'
                : 'Select All'}
            </Button>
          )}
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setOpenConfirmDeleteAll(true)}
            >
              Delete All
            </Button>
          )}
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
          todos={paginationData}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTodoById}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onUpdate={handleUpdateTodo}
        />
      </div>

      <PaginationTodo
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Dialog
        open={openConfirmDeleteAll}
        onOpenChange={setOpenConfirmDeleteAll}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete all selected tasks. This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenConfirmDeleteAll(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDeleteAll}>
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
