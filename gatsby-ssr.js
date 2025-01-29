
import React from "react";

// export const onRenderBody = ({ setHeadComponents}) => {
//   setHeadComponents([
//     <meta key="robots" name="robots" content="noindex, nofollow" />,
//     <meta key="googlebot" name="googlebot" content="noindex, nofollow" />,
//     <link
//       key="font-awesome"
//       rel="stylesheet"
//       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
//     />,
//   ]);
// };

// export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
//   let headComponents = getHeadComponents();

//   // Remove the existing Gatsby script
//   headComponents = headComponents.filter(
//     (component) =>
//       !(
//         component.type === "script" &&
//         component.props.id === "gatsby-script-loader"
//       )
//   );

//   // Add the modified script
//   headComponents.push(
//     <script key="gatsby-script-loader" id="gatsby-script-loader"></script>
//   );

//   replaceHeadComponents(headComponents);
// };


export const onRenderBody = ({ setPostBodyComponents }) => {
  // Add blank script during SSR
  setPostBodyComponents([
    <script key="gatsby-script-loader" id="gatsby-script-loader" />
  ]);
}
