import React from "react";
const OpenGraphTags = () => {
  return (
    <React.Fragment>
      <meta
        property="og:url"
        content="https://bazaar-react.vercel.app/landing"
      />
      {/* thumbnail And title for social media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Bazaar - React Ecommerce Template" />
      <meta
        property="og:description"
        content="React Next.js ecommerce template. Build SEO friendly Online store, delivery app and Multivendor store"
      />
      <meta property="og:image" content="/assets/images/landing/preview.png" />
    </React.Fragment>
  );
};
export default OpenGraphTags;
