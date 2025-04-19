import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface PaginationTodoProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationTodo({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationTodoProps) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="flex items-center gap-2">
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              currentPage === 1
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            )}
            onClick={handlePrev}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href=""
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            className={cn(
              currentPage >= totalPages
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            )}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
