
// import React from "react";

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


// export const onRenderBody = ({ setPostBodyComponents }) => {
//   // Don't add the script during SSR - we'll handle it client-side only
//   return null;
// }


// import React from 'react';

// // Remove default scripts
// export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
//   const headComponents = getHeadComponents();
  
//   // Filter out Gatsby's default script loader
//   const filteredComponents = headComponents.filter(component => {
//     return !(
//       component.type === 'script' && 
//       component.props && 
//       component.props.id === 'gatsby-script-loader'
//     );
//   });
  
//   replaceHeadComponents(filteredComponents);
// };

// // Add our blank script
// export const onRenderBody = ({ setPostBodyComponents }) => {
//   setPostBodyComponents([
//     <script key="gatsby-script-loader" id="gatsby-script-loader" />,
//   ]);
// };


import React from 'react';

// Remove scripts from both head and body
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents, getPostBodyComponents, replacePostBodyComponents }) => {
  // Clean head components
  const headComponents = getHeadComponents();
  const filteredHeadComponents = headComponents.filter(component => {
    return !(
      component?.type === 'script' && 
      component?.props?.id === 'gatsby-script-loader'
    );
  });
  replaceHeadComponents(filteredHeadComponents);

  // Clean body components
  const bodyComponents = getPostBodyComponents();
  const filteredBodyComponents = bodyComponents.filter(component => {
    return !(
      component?.type === 'script' && 
      component?.props?.id === 'gatsby-script-loader'
    );
  });
  
  // Add single empty script to body components
  filteredBodyComponents.push(
    <script key="gatsby-script-loader" id="gatsby-script-loader" />
  );
  
  replacePostBodyComponents(filteredBodyComponents);
};


// Add language attribute and re-enable body rendering
export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
};
