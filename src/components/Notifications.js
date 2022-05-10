import React from "react";

const Notifications = () => {
  return (
    <div>
      <section>
        <div className="flex items-center">
          <div className="w-9 h-9 bg-primary-200 rounded-full text-center pt-1 font-bold text-primary-900 mr-1">
            T
          </div>
          <div>
            <h2>
              <span>tanishk@sharma</span> followed you
            </h2>
            <span className="text-gray ">Mon Apr 10 2022 </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Notifications };
