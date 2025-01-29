
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


export const onPreRenderHTML = ({ 
  getPostBodyComponents,
  replacePostBodyComponents,
}) => {
  let postBodyComponents = getPostBodyComponents();
  
  // Remove the existing Gatsby script
  postBodyComponents = postBodyComponents.filter(
    (component) =>
      !(
        component.type === "script" &&
        component.props.id === "gatsby-script-loader"
      )
  );
  
  // Add the modified script
  postBodyComponents.push(
    <script key="gatsby-script-loader" id="gatsby-script-loader"></script>
  );
  
  replacePostBodyComponents(postBodyComponents);
};

// Alternative approach using onRenderBody if above doesn't work
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="gatsby-script-loader" id="gatsby-script-loader" />
  ]);
};
