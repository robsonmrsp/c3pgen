import { useState } from "react";
import { Notifications } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Box, Fade, Badge, Paper, Popper, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { formatDistance } from "date-fns";
import { FlexBox } from "components/flex-box";
import CartX from "components/icons/CartX";
import CartCheck from "components/icons/CartCheck";
import TruckFast from "components/icons/TruckFast";
import { H6, Paragraph } from "components/Typography";

// dummy  data
const orders = [
  {
    id: "5e8883f1b51cc1956a5a1ec0",
    createdAt: new Date("6/21/2022"),
    title: "New order received",
    type: "new_message",
    icon: CartCheck,
  },
  {
    id: "5e8883f7ed1486d665d8be1e",
    createdAt: new Date("6/20/2022"),
    title: "Order Delivered Successfully",
    type: "new_message",
    icon: TruckFast,
  },
  {
    id: "5e8883fca0e8612044248ecf",
    createdAt: new Date("6/19/2022"),
    title: "Order Cancellation Request",
    type: "item_shipped",
    icon: CartX,
  },
];
const archives = [
  {
    id: "5e8883f1b51cc1956a5a1ec0",
    createdAt: new Date("6/21/2022"),
    title: "New order received",
    type: "new_message",
    icon: CartCheck,
  },
  {
    id: "5e8883f7ed1486d665d8be1e",
    createdAt: new Date("6/20/2022"),
    title: "Order Delivered Successfully",
    type: "new_message",
    icon: TruckFast,
  },
  {
    id: "5e8883fca0e8612044248ecf",
    createdAt: new Date("6/19/2022"),
    title: "Order Cancellation Request",
    type: "item_shipped",
    icon: CartX,
  },
];

// styled components
const StyledTabList = styled(TabList)(({ theme }) => ({
  "& .MuiTab-root": {
    textTransform: "capitalize",
  },
  "& .MuiTab-root.Mui-selected": {
    color: theme.palette.info.main,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.info.main,
  },
}));
const StyledTab = styled(Tab)({
  width: "50%",
  marginLeft: 0,
  marginRight: 0,
});
const ListItemWrapper = styled(FlexBox)(({ theme }) => ({
  cursor: "pointer",
  borderBottom: `1px solid ${theme.palette.info[100]}`,
  ":hover": {
    backgroundColor: theme.palette.info[100],
  },
  ":last-of-type": {
    borderBottom: 0,
  },
}));
const NotificationsPopover = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState("1");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setOpen((state) => !state);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const handleTabChange = (_, value) => {
    setTabValue(value);
  };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <IconButton onClick={handleClick}>
          <Badge color="secondary" variant="dot" badgeContent={1}>
            <Notifications
              sx={{
                color: "grey.500",
              }}
            />
          </Badge>
        </IconButton>

        <Popper
          transition
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          sx={{
            zIndex: 11111,
            maxWidth: 300,
            minWidth: 300,
            width: "100%",
            // overflow: "hidden",
            top: "10px !important",
            boxShadow: 2,
            "&:before": {
              top: 0,
              right: 14,
              zIndex: 0,
              width: 10,
              height: 10,
              content: '""',
              display: "block",
              position: "absolute",
              borderTop: "1px solid",
              borderLeft: "1px solid",
              borderColor: "grey.200",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
            },
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={150}>
              <Paper>
                <TabContext value={tabValue}>
                  <StyledTabList onChange={handleTabChange}>
                    <StyledTab disableRipple value="1" label={`Unread (2)`} />
                    <StyledTab disableRipple value="2" label="Archived" />
                  </StyledTabList>

                  {orders.length === 0 ? (
                    <Paragraph fontWeight="500" textAlign="center" p={2}>
                      There are no notifications
                    </Paragraph>
                  ) : (
                    <TabPanel
                      value="1"
                      sx={{
                        p: 0,
                      }}
                    >
                      {orders.map((order) => (
                        <ListItem
                          key={order.id}
                          type={order.type}
                          Icon={order.icon}
                          title={order.title}
                          createdAt={order.createdAt}
                        />
                      ))}
                    </TabPanel>
                  )}

                  {archives.length === 0 ? (
                    <Paragraph fontWeight="500" textAlign="center" p={2}>
                      There are no archives
                    </Paragraph>
                  ) : (
                    <TabPanel
                      value="2"
                      sx={{
                        p: 0,
                      }}
                    >
                      {archives.map((item) => (
                        <ListItem
                          key={item.id}
                          type={item.type}
                          Icon={item.icon}
                          title={item.title}
                          createdAt={item.createdAt}
                        />
                      ))}
                    </TabPanel>
                  )}
                </TabContext>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

// ListItem component props

function ListItem(props) {
  const { Icon, title, createdAt } = props;
  return (
    <ListItemWrapper p={2} gap={2} alignItems="center">
      <Icon color="info" />

      <Box>
        <H6 fontSize={13}>{title}</H6>
        <Paragraph fontSize={11}>
          {formatDistance(createdAt, new Date(), {
            addSuffix: true,
          })}
        </Paragraph>
      </Box>
    </ListItemWrapper>
  );
}
export default NotificationsPopover;
