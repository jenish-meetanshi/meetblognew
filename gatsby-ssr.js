import React from "react";

const React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <meta key="robots" name="robots" content="noindex, nofollow" />,
    <meta key="googlebot" name="googlebot" content="noindex, nofollow" />,
  ]);
};
