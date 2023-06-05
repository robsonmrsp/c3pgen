import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import DashboardLayout from "components/layouts/admin";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import { StyledTableCell, StyledTableRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import { currency } from "lib";

// table column list
const tableHeading = [
  {
    id: "no",
    label: "No",
    align: "center",
  },
  {
    id: "amount",
    label: "Amount",
    align: "center",
  },
  {
    id: "payment",
    label: "Payment Method",
    align: "center",
  },
  {
    id: "date",
    label: "Date",
    align: "center",
  },
];

// =============================================================================
Payouts.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function Payouts({ payouts }) {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: payouts,
    defaultSort: "no",
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Payouts</H3>

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 600,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={payouts.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((payout, index) => (
                  <StyledTableRow role="checkbox" key={index}>
                    <StyledTableCell align="center">
                      {payout.no}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {currency(payout.amount)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {payout.payment}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {payout.date}
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
            count={Math.ceil(payouts.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const payouts = await api.payouts();
  return {
    props: {
      payouts,
    },
  };
};
