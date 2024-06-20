import React from "react";
import { Skeleton } from "../ui/skeleton";

const UserSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

export default UserSkeleton;
