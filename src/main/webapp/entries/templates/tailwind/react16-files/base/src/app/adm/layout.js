import React from "react";

import ApplicationShell from "@/components/layout/ApplicationShell";
export default function Admin({ children }) {
  return <ApplicationShell _id="ApplicationShell">{children}</ApplicationShell>;
}
