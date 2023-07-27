import { Session } from "inspector";
import React from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

function ApplicationShell({ children }) {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900 grid-cols-sidebar-collapsed">
      <Navbar />
      <Sidebar />
      <Body>{children}</Body>
      <Footer>{children}</Footer>
    </div>
  );
}

export default ApplicationShell
