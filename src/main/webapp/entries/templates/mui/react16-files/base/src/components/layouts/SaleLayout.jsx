import { Fragment } from "react";
import { Divider } from "@mui/material";
import Topbar from "components/Topbar";
import { Footer1 } from "components/footer";
import Header from "components/header/Header";
import Navbar from "components/navbar/Navbar";
import { MobileNavigationBar } from "components/mobile-navigation";
import SearchInputWithCategory from "components/search-box/SearchInputWithCategory";

/**
 *  Used:
 *  1. sale-page-1 page
 *  2. sale-page-2 page
 */

// =============================================================

// =============================================================

const SaleLayout = ({ children, type = "one", categoryNav }) => {
  return (
    <Fragment>
      {/* TOPBAR AREA */}
      <Topbar />

      {/* HEADER AREA */}
      <Header searchInput={<SearchInputWithCategory />} />

      {type === "one" && (
        <Fragment>
          <Navbar />
          {children}
        </Fragment>
      )}

      {type === "two" && (
        <Fragment>
          <Divider />
          {categoryNav}
          <div className="section-after-sticky">{children}</div>
        </Fragment>
      )}

      {/* FOOTER AREA */}
      <Footer1 />

      {/* SMALLER DEVICE NAVIGATION */}
      <MobileNavigationBar />
    </Fragment>
  );
};
export default SaleLayout;
