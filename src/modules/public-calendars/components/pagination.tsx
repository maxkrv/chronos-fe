import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import type { FC } from 'react';

import type { ICalendar } from '@/modules/calendar/calendar.interface';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import type { PaginationResponse } from '@/shared/types/interfaces';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { usePublicCalendarsFiltersStore } from '../stores/public-calendars-filters.store';

interface PaginationProps {
  paginationData: PaginationResponse<ICalendar>['meta'] | undefined;
}

export const Pagination: FC<PaginationProps> = ({ paginationData }) => {
  const { limit, setPage, setLimit } = usePublicCalendarsFiltersStore();

  if (!paginationData) {
    return null;
  }

  const { currentPage, itemsPerPage, itemCount } = paginationData;
  const totalPages = Math.ceil(itemCount / itemsPerPage);

  // Generate page numbers to display
  const generatePagination = () => {
    // Always show first and last page
    // For small number of pages, show all
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // For larger number of pages, show current page with neighbors and ellipsis
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Show more pages at the beginning
      const leftItemCount = 3;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'ellipsis', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      // Show more pages at the end
      const rightItemCount = 3;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [1, 'ellipsis', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      // Show pages around current
      return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
    }
  };

  const pages = generatePagination();

  return (
    <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
      <div className="text-sm text-muted-foreground">
        Showing Page {currentPage} out of {totalPages}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="flex gap-0.25 *:hover:bg-accent *:hover:text-accent-foreground">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => setPage(1)}
              disabled={currentPage === 1}
              aria-label="First page">
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none rounded-r-none border-l-0"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            <div className="hidden sm:flex gap-0.25">
              {pages?.map((pageNum, i) => {
                if (pageNum === 'ellipsis') {
                  return (
                    <div
                      key={`ellipsis-${i}`}
                      className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </div>
                  );
                }

                return (
                  <Button
                    key={`page-${pageNum}`}
                    variant={pageNum === currentPage ? 'default' : 'secondary'}
                    size="icon"
                    className={cn(
                      'h-8 w-8 rounded-none border-l-0 hover:border border-primary',
                      pageNum === currentPage && 'pointer-events-none'
                    )}
                    onClick={() => setPage(pageNum as number)}
                    aria-label={`Page ${pageNum}`}
                    aria-current={pageNum === currentPage ? 'page' : undefined}>
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none rounded-r-none border-l-0"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none border-l-0"
              onClick={() => setPage(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page">
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Select value={limit.toString()} onValueChange={(value) => setLimit(Number.parseInt(value))}>
        <SelectTrigger className="w-30 max-md:hidden">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 per page</SelectItem>
          <SelectItem value="10">10 per page</SelectItem>
          <SelectItem value="20">20 per page</SelectItem>
          <SelectItem value="50">50 per page</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
