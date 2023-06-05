import { SvgIcon } from "@mui/material";
import React from "react";
const Quote = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 60 60">
      <path d="M0 30.0005V55.7148H25.7143V30.0005H8.57149C8.57149 20.5481 16.262 12.8576 25.7143 12.8576V4.28613C11.5346 4.28613 0 15.8207 0 30.0005Z" />
      <path d="M60 12.8576V4.28613C45.8202 4.28613 34.2856 15.8207 34.2856 30.0005V55.7148H60V30.0005H42.8571C42.8571 20.5481 50.5476 12.8576 60 12.8576Z" />
    </SvgIcon>
  );
};
export default Quote;
