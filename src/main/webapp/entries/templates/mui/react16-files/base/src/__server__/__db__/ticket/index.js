// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import Mock from "../../mock";
import { ticketList, messageList } from "./data";
Mock.onGet("/api/tickets").reply(async () => {
  try {
    return [200, ticketList];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});
Mock.onGet("/api/tickets/single").reply(async (config) => {
  try {
    if (config.params?.slug) {
      const ticket = ticketList.find(
        (item) => item.slug === config.params.slug
      );
      ticket.conversation = messageList;
      return [200, ticket];
    }
    const ticket = ticketList[0];
    ticket.conversation = messageList;
    return [200, ticket];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});
Mock.onGet("/api/tickets/slugs").reply(async () => {
  try {
    const slugs = ticketList.map((item) => ({
      params: {
        slug: item.slug,
      },
    }));
    return [200, slugs];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});
