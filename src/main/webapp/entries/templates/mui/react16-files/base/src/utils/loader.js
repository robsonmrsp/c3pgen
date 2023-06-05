import dynamic from "next/dynamic";
import { lazy, Suspense } from "react";
// export const MyContext = dynamic(() => import("../contexts/ThemeContext"), {
//   suspense: true,
// });
export const MyContext = lazy(() => import("../contexts/ThemeContext"));
