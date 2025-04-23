import "./src/styles/global.css"; // Import your custom global styles
//import { config } from '@fortawesome/fontawesome-svg-core'
import React from "react";
//import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
 // Set HTML language attribute
 setHtmlAttributes({ lang: 'en' });
 
 // Set additional head components
 setHeadComponents([
   <meta key="robots" name="robots" content="noindex, nofollow" />,
   <meta key="googlebot" name="googlebot" content="noindex, nofollow" />,
 ]);
};

export const onPreRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation) {
    // Add fade-out class before page transition
    document.body.classList.add('page-exit');
    document.body.classList.remove('page-enter');

    // Temporarily hide scrolling
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      document.body.classList.remove('page-exit');
    }, 500); // Match CSS transition duration
  }
};

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation) {
    // Add fade-in class after page transition
    document.body.classList.add('page-enter');
    document.body.classList.remove('page-exit');

    setTimeout(() => {
      document.body.classList.remove('page-enter');
      // Restore scrolling
      document.body.style.overflow = '';
    }, 500); // Match CSS transition duration
  }
};

export const shouldUpdateScroll = () => {
  // Prevent default scroll behavior
  return false;
};

export const onClientEntry = () => {
  window.onload = () => {
    const codeBlocks = document.querySelectorAll('pre.EnlighterJSRAW');

    codeBlocks.forEach((block) => {
      block.addEventListener('click', () => {
        const codeText = block.textContent; // Get the code text from the block
        navigator.clipboard.writeText(codeText).then(() => {
          block.classList.add('copied'); // Add 'copied' class for visual feedback
          setTimeout(() => block.classList.remove('copied'), 2000); // Remove the 'copied' message after 2 seconds
        });
      });
    });
  };
};
