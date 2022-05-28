import React from "react";

const PostSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((a) => {
        return (
          <section className="bg-primary-50 h-48 p-5 border-t border-primary-200 animate-pulse">
            <div className="flex gap-5">
              <span className="justify-center items-center  bg-primary-100 h-12 w-12 rounded-full"></span>
              <div>
                <p className="h-5 w-48 bg-primary-100 mb-2"></p>
                <p className="h-5 w-72 bg-primary-100 mt-1"></p>
              </div>
            </div>
            <p className="h-5 w-full bg-primary-100 mb-2 mt-8 ml-1"></p>
            <p className="h-5 w-11/12 bg-primary-100 mt-1 ml-1"></p>
          </section>
        );
      })}
    </>
  );
};

export { PostSkeleton };
