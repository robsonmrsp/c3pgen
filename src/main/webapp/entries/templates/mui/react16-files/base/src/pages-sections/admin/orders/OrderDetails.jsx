import { Delete, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Button,
  Avatar,
  Divider,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { currency } from "lib";
// ===================================================================

const OrderDetails = ({ order }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card
          sx={{
            p: 3,
          }}
        >
          <FlexBox alignItems="center" gap={4}>
            <Paragraph>
              <Span color="grey.600">Order ID:</Span> {order.id}
            </Paragraph>

            <Paragraph>
              <Span color="grey.600">Placed on:</Span>{" "}
              {format(new Date(order.createdAt), "dd MMM, yyyy")}
            </Paragraph>
          </FlexBox>

          <FlexBox
            gap={3}
            my={3}
            flexDirection={{
              sm: "row",
              xs: "column",
            }}
          >
            <TextField
              fullWidth
              color="info"
              size="medium"
              variant="outlined"
              label="Add Product"
              placeholder="Type product name"
            />

            <TextField
              select
              fullWidth
              color="info"
              size="medium"
              defaultValue={order.status}
              label="Order Status"
              inputProps={{
                IconComponent: () => (
                  <KeyboardArrowDown
                    sx={{
                      color: "grey.600",
                      mr: 1,
                    }}
                  />
                ),
              }}
            >
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
          </FlexBox>

          {order.items.map((item, index) => (
            <Box
              my={2}
              gap={2}
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  md: "1fr 1fr",
                  xs: "1fr",
                },
              }}
            >
              <FlexBox flexShrink={0} gap={1.5} alignItems="center">
                <Avatar
                  src={item.product_img}
                  sx={{
                    height: 64,
                    width: 64,
                    borderRadius: "8px",
                  }}
                />

                <Box>
                  <H6 mb={1}>{item.product_name}</H6>

                  <FlexBox alignItems="center" gap={1}>
                    <Paragraph fontSize={14} color="grey.600">
                      {currency(item.product_price)} x
                    </Paragraph>

                    <Box maxWidth={60}>
                      <TextField
                        defaultValue={item.product_quantity}
                        type="number"
                        fullWidth
                      />
                    </Box>
                  </FlexBox>
                </Box>
              </FlexBox>

              <FlexBetween flexShrink={0}>
                <Paragraph color="grey.600">
                  Product properties: Black, L
                </Paragraph>

                <IconButton>
                  <Delete
                    sx={{
                      color: "grey.600",
                      fontSize: 22,
                    }}
                  />
                </IconButton>
              </FlexBetween>
            </Box>
          ))}
        </Card>
      </Grid>

      <Grid item md={6} xs={12}>
        <Card
          sx={{
            px: 3,
            py: 4,
          }}
        >
          <TextField
            rows={5}
            multiline
            fullWidth
            color="info"
            variant="outlined"
            label="Shipping Address"
            defaultValue={order.shippingAddress}
            sx={{
              mb: 4,
            }}
          />

          <TextField
            rows={5}
            multiline
            fullWidth
            color="info"
            variant="outlined"
            label="Customer’s Note"
            defaultValue="Please deliver ASAP."
          />
        </Card>
      </Grid>

      <Grid item md={6} xs={12}>
        <Card
          sx={{
            px: 3,
            py: 4,
          }}
        >
          <H5 mt={0} mb={2}>
            Total Summary
          </H5>

          <FlexBetween mb={1.5}>
            <Paragraph color="grey.600">Subtotal:</Paragraph>
            <H6>{currency(order.totalPrice)}</H6>
          </FlexBetween>

          <FlexBetween mb={1.5}>
            <Paragraph color="grey.600">Shipping fee:</Paragraph>

            <FlexBox alignItems="center" gap={1} maxWidth={100}>
              <Paragraph>$</Paragraph>
              <TextField
                color="info"
                defaultValue={10}
                type="number"
                fullWidth
              />
            </FlexBox>
          </FlexBetween>

          <FlexBetween mb={1.5}>
            <Paragraph color="grey.600">Discount(%):</Paragraph>

            <FlexBox alignItems="center" gap={1} maxWidth={100}>
              <Paragraph>$</Paragraph>
              <TextField
                color="info"
                defaultValue={order.discount}
                type="number"
                fullWidth
              />
            </FlexBox>
          </FlexBetween>

          <Divider
            sx={{
              my: 2,
            }}
          />

          <FlexBetween mb={2}>
            <H6>Total</H6>
            <H6>{currency(order.totalPrice)}</H6>
          </FlexBetween>

          <Paragraph>Paid by Credit/Debit Card</Paragraph>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="info">
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};
export default OrderDetails;
