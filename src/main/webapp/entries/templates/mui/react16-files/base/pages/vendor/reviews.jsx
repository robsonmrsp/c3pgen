import { RemoveRedEye } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Rating,
  Stack,
  Table,
  TableContainer,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Scrollbar from "components/Scrollbar";
import { FlexBox } from "components/flex-box";
import TableHeader from "components/data-table/TableHeader";
import { H3, Paragraph, Small } from "components/Typography";
import TablePagination from "components/data-table/TablePagination";
import DashboardLayout from "components/layouts/admin";
import useMuiTable from "hooks/useMuiTable";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "pages-sections/admin";
import api from "utils/__api__/vendor";
const tableHeading = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "customer",
    label: "Customer",
    align: "left",
  },
  {
    id: "comment",
    label: "Comment",
    align: "left",
  },
  {
    id: "rating",
    label: "Rating",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

// =============================================================================
Reviews.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function Reviews({ reviews }) {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: reviews,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Product Reviews</H3>

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 1000,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={reviews.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((review, index) => (
                  <StyledTableRow tabIndex={-1} role="checkbox" key={index}>
                    <StyledTableCell align="left">
                      <FlexBox alignItems="center" gap={1.5}>
                        <Avatar
                          src={review.image}
                          sx={{
                            borderRadius: "8px",
                          }}
                        />
                        <Paragraph>{review.name}</Paragraph>
                      </FlexBox>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {review.customer}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <Small>{review.comment}</Small>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <Rating
                        value={review.rating}
                        size="small"
                        color="warning"
                        readOnly
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <StyledIconButton>
                        <RemoveRedEye />
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
            count={Math.ceil(reviews.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const reviews = await api.getAllProductReviews();
  return {
    props: {
      reviews,
    },
  };
};
