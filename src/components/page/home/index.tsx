import { useState } from 'react';
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

import { Todo } from '@/services/use-get-todos';
import {
  updateTodoPriority,
  updateTodoStatus,
} from '@/services/use-update-todos';
import { useFetchTodos } from '@/hooks/use-fetch-todo';
import { usePagination } from '@/hooks/use-pagination';
import { useTodoFilters } from '@/hooks/use-todo-filter';
import { useTodoSelection } from '@/hooks/use-select-todo';
import { DeleteMultiTodos } from '@/components/feature/delete-multi-todo';
import { FilterByStatus } from '@/components/molecules/filter-by-status';
import { FilterByPriority } from '@/components/molecules/filter-by-priority';

export function Home() {
  const { todos, setTodos } = useFetchTodos();
  const {
    filter,
    setFilter,
    filterPriority,
    setFilterPriority,
    filteredTodos,
  } = useTodoFilters(todos);

  const {
    currentPage,
    totalPages,
    paginationData,
    handlePageChange,
    setCurrentPage,
    setSearchParams,
    searchParams,
  } = usePagination(filteredTodos);

  const { selectedIds, setSelectedIds, handleToggleSelect } =
    useTodoSelection();

  const { deleteSelected } = DeleteMultiTodos(todos, setTodos, setSelectedIds);
  const [openConfirmDeleteAll, setOpenConfirmDeleteAll] = useState(false);

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
    await deleteSelected(selectedIds);
    setOpenConfirmDeleteAll(false);
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

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
          <FilterByStatus
            value={filter}
            onChange={(value) => setFilter(value as any)}
          />
          <FilterByPriority
            value={filterPriority}
            onChange={(value) => setFilterPriority(value as any)}
          />
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
          existingTodos={todos}
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
