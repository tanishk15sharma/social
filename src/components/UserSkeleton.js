import React from "react";

const UserSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((a) => (
        <div className="flex gap-5 bg-primary-50 h-14 border-t border-primary-200 animate-pulse p-2 mb-2">
          <span className="justify-center items-center  bg-primary-100 h-9 w-9 rounded-full"></span>
          <div>
            <p className="h-3 w-24 bg-primary-100 mb-2"></p>
            <p className="h-3 w-48 bg-primary-100 mt-2"></p>
          </div>
        </div>
      ))}
    </>
  );
};

export { UserSkeleton };
