import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import DashboardLayout from "components/layouts/admin";
import Scrollbar from "components/Scrollbar";
import SearchInput from "components/SearchInput";
import useMuiTable from "hooks/useMuiTable";
import {
  StatusWrapper,
  StyledTableRow,
  StyledTableCell,
  StyledIconButton,
} from "pages-sections/admin";
import api from "utils/__api__/ticket";
const tableHeading = [
  {
    id: "title",
    label: "Information",
    align: "left",
  },
  {
    id: "type",
    label: "Type",
    align: "left",
  },
  {
    id: "date",
    label: "Ticket Date",
    align: "left",
  },
  {
    id: "category",
    label: "Problem Title",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

// =============================================================================
SupportTickets.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function SupportTickets({ ticketList }) {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: ticketList,
    defaultSort: "date",
  });
  return (
    <Box py={4}>
      <SearchInput
        placeholder="Search Ticket.."
        sx={{
          mb: 4,
        }}
      />

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 800,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={ticketList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((ticket, index) => (
                  <StyledTableRow role="checkbox" key={index}>
                    <StyledTableCell align="left">
                      {ticket.title}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <StatusWrapper status={ticket.type}>
                        {ticket.type}
                      </StatusWrapper>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {ticket.date}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {ticket.category}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <StyledIconButton>
                        <Edit />
                      </StyledIconButton>
                      <StyledIconButton>
                        <Delete />
                      </StyledIconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(ticketList.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const ticketList = await api.getTicketList();
  return {
    props: {
      ticketList,
    },
  };
};
