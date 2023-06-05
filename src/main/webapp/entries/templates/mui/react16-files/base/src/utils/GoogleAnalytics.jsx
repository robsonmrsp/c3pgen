import React from "react";
import Script from "next/script";
const GoogleAnalytics = () => {
  return (
    <React.Fragment>
      {/* Google analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FLCDXWTVMD"
        strategy="lazyOnload"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-FLCDXWTVMD');
    `,
        }}
      />
    </React.Fragment>
  );
};
export default GoogleAnalytics;
