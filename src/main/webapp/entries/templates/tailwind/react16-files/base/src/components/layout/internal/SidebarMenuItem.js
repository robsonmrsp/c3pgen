import React, { useState } from "react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import Link from "next/link";

function SidebarMenu({ page }) {
  const [show, setShow] = useState(false);
  return (
    <li>
      <button
        type="button"
        className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-pages"
        onClick={() => setShow(!show)}
        data-collapse-toggle="dropdown-pages"
      >
        <span className="flex-1 ml-3 text-left whitespace-nowrap">
          {page.name}
        </span>

        {show ? <FiChevronDown /> : <FiChevronRight />}
      </button>
      <ul
        id="dropdown-pages"
        className={`${
          show ? "" : "hidden"
        } py-2 space-y-2 transition duration-1000`}
      >
        {page?.children?.map((pageItem) => {
          return (
            <li key={pageItem.name}>
              <Link
                href={pageItem.link}
                className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <small>{pageItem.name}</small>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default SidebarMenu;
