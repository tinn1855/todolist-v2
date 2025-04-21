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
import { updateTodoPriority, updateTodoStatus } from '@/hooks/use-update-todos';
import { FilterByStatus } from '@/components/future/filter-by-status';
import { FilterByPriority } from '@/components/future/filter-by-priority';

export function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openConfirmDeleteAll, setOpenConfirmDeleteAll] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { filter, setFilter, filteredData } = FilterByStatus(todos);
  const { filterPriority, setFilterPriority, filteredPriorityData } =
    FilterByPriority(todos);

  const combineFilter = filteredPriorityData.filter((todo) =>
    filteredData.some((item) => item.id === todo.id)
  );

  const itemsPerPage = 5;

  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState<number>(pageParam);

  const totalPages = Math.max(
    1,
    Math.ceil(combineFilter.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginationData = combineFilter.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Todo['status']) => {
    try {
      const updated = await updateTodoStatus(id, newStatus);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, status: updated.status } : todo
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const handlePriorityChange = async (
    id: string,
    newPriority: Todo['priority']
  ) => {
    try {
      const updated = await updateTodoPriority(id, newPriority);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, priority: updated.priority } : todo
        )
      );
    } catch (error) {
      console.error('Failed to update priority:', error);
      alert('Failed to update priority: ' + error); // Hiển thị lỗi chi tiết
    }
  };

  const handleAddTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const handleDeleteTodoById = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const currentPageIds = paginationData.map((todo) => todo.id);
    setSelectedIds((prevSelected) => {
      if (checked) {
        // Thêm các ID của trang hiện tại nếu chưa có trong selectedIds
        const newSelected = [...prevSelected];
        currentPageIds.forEach((id) => {
          if (!newSelected.includes(id)) {
            newSelected.push(id);
          }
        });
        return newSelected;
      } else {
        // Bỏ các ID của trang hiện tại ra khỏi selectedIds
        return prevSelected.filter((id) => !currentPageIds.includes(id));
      }
    });
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
    const newPage = 1;
    setCurrentPage(newPage);
    if (newPage === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', String(newPage));
    }
    setSearchParams(searchParams);
  }, [filter, filterPriority]);

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
                handleSelectAll(
                  !paginationData.every((todo) => selectedIds.includes(todo.id))
                )
              }
            >
              {paginationData.every((todo) => selectedIds.includes(todo.id))
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
          <Select
            onValueChange={(value) => setFilter(value as any)}
            value={filter}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setFilterPriority(value as any)}
            value={filterPriority}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Priority</SelectItem>
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
          onPriorityChange={handlePriorityChange}
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
