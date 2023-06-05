import { useState } from "react";
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { currency } from "lib";
import {
  StyledTableRow,
  StyledTableCell,
} from "./StyledTableComponents";

const BasicTableRow = ({ columns = [], item, actionCell }) => {
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      {columns.filter(column => column.show || column.show == undefined).map((column) => (
        <StyledTableCell align={column.align} id={item[column.field]}>
          {item[column.field]}
        </StyledTableCell>
      ))}
      <StyledTableCell align={"center"}>
        {actionCell}
      </StyledTableCell>

    </StyledTableRow >
  );
};
export default BasicTableRow;
