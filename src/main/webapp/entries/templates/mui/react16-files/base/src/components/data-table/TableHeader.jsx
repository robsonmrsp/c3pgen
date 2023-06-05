import {
  Checkbox,
  styled,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import UpDown from "components/icons/UpDown";
import { useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { column } from "stylis";

// styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  padding: "16px 20px",
  color: theme.palette.grey[900],
}));

// ----------------------------------------------------------------------
const TableLabel = (props) => {
  const [currentDirection, setCurrentDirection] = useState('');
  const [active, setActive] = useState();
  const name = props.headCell && props.headCell.field;

  const toggleDirection = () => {
    const newDirection = currentDirection === 'asc' ? 'desc' : (currentDirection === 'desc' ? '' : 'asc');
    setCurrentDirection(newDirection);

    props.changeSort({ orderBy: name, sortDirection: newDirection });
  }

  return (
    <TableSortLabel
      active={active}
      onClick={() => toggleDirection()}
      direction={currentDirection}
      sx={{
        "& .MuiTableSortLabel-icon": {
          opacity: 1,
        },
      }}
      IconComponent={() => {
        if (currentDirection === 'asc') return (
          <ArrowDownwardIcon
            sx={{
              fontSize: 14,
              ml: 1,
              color: "grey.600",
            }}
          />
        )

        if (currentDirection === 'desc') return (
          <ArrowUpwardIcon
            sx={{
              fontSize: 14,
              ml: 1,
              color: "grey.600",
            }}
          />
        )
        return null;
      }
      }
    >
      {props.children}
    </TableSortLabel>
  );
}
// ----------------------------------------------------------------------

const TableHeader = (props) => {

  const {
    orderBy,
    sortDirection = 'asc',
    heading,
    rowCount,
    numSelected,
    onChangeSort,
    showActionHeader = false,
    onSelectAllClick = () => { },
    hideSelectBtn = false,
  } = props;


  return (
    <TableHead
      sx={{
        backgroundColor: "grey.200",
      }}
    >
      <TableRow>
        {!!hideSelectBtn && (
          <StyledTableCell align="left">
            <Checkbox
              color="info"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) =>
                onSelectAllClick(event.target.checked, "product")
              }
            />
          </StyledTableCell>
        )}

        {heading.filter(column => column.show || column.show == undefined).map((column) => (
          <StyledTableCell
            key={column.field}
            align={column.align || 'left'}
            sortDirection={sortDirection}
          >
            <TableLabel changeSort={onChangeSort} headCell={column}> {column.headerName} </TableLabel>
          </StyledTableCell>
        ))}
        {showActionHeader && (<StyledTableCell
          align={'center'}
        >
          <TableLabel > {"Ações"} </TableLabel>
        </StyledTableCell>)}
      </TableRow>
    </TableHead>
  );
};
export default TableHeader;


