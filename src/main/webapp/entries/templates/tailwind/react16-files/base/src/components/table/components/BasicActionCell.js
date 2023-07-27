import React from "react";

const BasicActionCell = ({ onEditItem, onDeleteItem, item }) => {
  return (
    <>
      <button
        type="button"
        onClick={() => onEditItem()}
        class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => onDeleteItem()}
        class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
      >
        Delete
      </button>
    </>
  );
};

export default BasicActionCell;
