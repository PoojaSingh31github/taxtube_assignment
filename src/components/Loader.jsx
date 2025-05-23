import React from 'react';

const Spinner = () => {
  return (
    <div className="w-full h-screen text-xl flex justify-center items-center">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="relative w-32 h-32">
            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-blue-600 border-b-blue-600 animate-spin"
              style={{ animationDuration: '3s' }}
            ></div>

            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-blue-600 animate-spin"
              style={{ animationDuration: '2s', animationDirection: 'reverse' }}
            ></div>
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-blue-600/5 animate-pulse rounded-full blur-sm"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
