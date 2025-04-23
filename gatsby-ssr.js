import React from "react";
import { Script } from "gatsby";

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "en" });
  setHeadComponents([
   <link key="google-fonts-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="google-fonts-preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossorigin />,

    // Preload the font CSS
    <link
      key="google-fonts-preload"
      rel="preload"
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
      as="style"
    />,

    // Load the font CSS non-blocking
    <link
      key="google-fonts"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
    />,

    // Other head components
    // <link
    //   key="font-awesome-preload"
    //   rel="preload"
    //   href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    //   as="style"
    // />,
    // <link
    //   key="font-awesome"
    //   rel="stylesheet"
    //   href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    // />,
    <meta key="robots" name="robots" content="index, follow" />,
    <meta key="googlebot" name="googlebot" content="index, follow" />,
  ]);
  setPostBodyComponents([
    <Script
      key="clarity-script"
      strategy="post-hydrate"
      src="https://www.clarity.ms/tag/bukkl6z34m"
    />,
    <Script
      key="gtm-script"
      strategy="post-hydrate"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-54H9W4K');
        `,
      }}
    />,
  ]);
};
