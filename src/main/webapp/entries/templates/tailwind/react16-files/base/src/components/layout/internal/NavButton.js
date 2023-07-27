import React from "react";

const classesSVGButton =
  "p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600";
const classesIMGButton =
  "flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600";

function NavButton({ Icon, children, svg }) {
  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-default"
        type="button"
        className={svg ? classesSVGButton : classesIMGButton}
      >
        <span className="sr-only">Open user menu</span>
        <Icon />
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration-100 hs-dropdown-open:opacity-100 opacity-0 w-72 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
        aria-labelledby="hs-dropdown-default"
      >
        {children}
      </div>
    </div>
  );
}

export default NavButton;
