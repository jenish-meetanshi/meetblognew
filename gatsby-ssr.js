import React from "react";

export const onRenderBody = ({ setHeadComponents, setBodyComponents }) => {
  setHeadComponents([
    <meta key="robots" name="robots" content="noindex, nofollow" />,
    <meta key="googlebot" name="googlebot" content="noindex, nofollow" />,
    <link
      key="font-awesome"
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    />,
  ]);

  setBodyComponents([
   <script key="gatsby-script-loader" id="gatsby-script-loader"></script>,
  ]);
};
