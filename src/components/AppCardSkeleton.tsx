import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const AppCardSkeleton = () => {
  return (
    <Card className="overflow-hidden transition-all duration-300">
      <div className="aspect-video relative">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </Card>
  );
};

export const AppGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <AppCardSkeleton key={i} />
      ))}
    </div>
  );
};