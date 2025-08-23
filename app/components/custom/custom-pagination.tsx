import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { type UsePaginationReturn } from "~/hooks/use-pagination";

type Props = {
  pagination: UsePaginationReturn;
  className?: string;
};

export default function CustomPagination({ pagination, className }: Props) {
  const {
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    onPageChange,
    onNextPage,
    onPreviousPage,
    getPageNumbers,
  } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(2);
  const showLeftEllipsis = pageNumbers[0] > 1;
  const showRightEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages;

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          {/* -- Previous button -- */}
          <PaginationItem>
            <PaginationPrevious
              onClick={e => {
                e.preventDefault();
                if (hasPreviousPage) {
                  onPreviousPage();
                }
              }}
              className={
                !hasPreviousPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* -- First page -- */}
          {showLeftEllipsis && (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={e => {
                    e.preventDefault();
                    handlePageClick(1);
                  }}
                  isActive={page === 1}
                  className="cursor-pointer"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {/* -- Page numbers -- */}
          {pageNumbers.map(pageNumber => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={e => {
                  e.preventDefault();
                  handlePageClick(pageNumber);
                }}
                isActive={page === pageNumber}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* -- Last page -- */}
          {showRightEllipsis && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={e => {
                    e.preventDefault();
                    handlePageClick(totalPages);
                  }}
                  isActive={page === totalPages}
                  className="cursor-pointer"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* -- Next button -- */}
          <PaginationItem>
            <PaginationNext
              onClick={e => {
                e.preventDefault();
                if (hasNextPage) {
                  onNextPage();
                }
              }}
              className={
                !hasNextPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
