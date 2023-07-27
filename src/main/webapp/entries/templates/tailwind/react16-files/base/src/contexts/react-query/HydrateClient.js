
"use client";

import { Hydrate as RQHydrate, HydrateProps } from "@tanstack/react-query";

const HydrateClient = (props) => {
  return <RQHydrate {...props} />;
}

export default HydrateClient;
