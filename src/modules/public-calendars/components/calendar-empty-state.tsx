import { Calendar, Search } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

interface CalendarEmptyStateProps {
  onReset?: () => void;
}

export const CalendarEmptyState = ({ onReset }: CalendarEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-lg border border-dashed p-8 grow h-full">
      <Calendar className="h-16 w-16 text-muted-foreground mb-4 animate-pulse" />
      <h3 className="text-xl font-medium mb-2">No calendars found</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        We couldn&apos;t find any calendars matching your search criteria. Try adjusting your filters or search terms.
      </p>
      {onReset && (
        <Button onClick={onReset} className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Reset search</span>
        </Button>
      )}
    </div>
  );
};
