import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <meta key="robots" name="robots" content="noindex, nofollow" />,
    <meta key="googlebot" name="googlebot" content="noindex, nofollow" />,
    <link
      key="font-awesome"
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    />,
  ]);
};

// gatsby-ssr.js
exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      key="gatsby-script-loader"
      id="gatsby-script-loader"
      dangerouslySetInnerHTML={{
        __html: `
          /*<![CDATA[*/
          window.pagePath = "${process.env.SITE_URL || 'https://meetanshi.com/blog/'}" + "${window.location.pathname}";
          /*]]>*/
        `,
      }}
    />,
  ]);
};
