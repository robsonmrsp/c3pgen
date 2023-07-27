import React, { Children } from "react";

function Panel({ panelName, children }) {
  return (
    <div _id="Panel" className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
      <div className="rounded-t mb-0 px-4  py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">{panelName}</h6>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-4 py-4 pt-0">{children}</div>
    </div>
  );
}

export default Panel;
