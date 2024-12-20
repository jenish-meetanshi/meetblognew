
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS globally
import "./src/styles/global.css"; // Import your custom global styles
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="google-fonts"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
    />,
  ]);
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


export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation && prevLocation.pathname === location.pathname) {
    // Prevent scroll to top behavior when navigating to the same page
    window.scrollTo(0, 0); // Optional: scroll to the top when navigating to a new page
  }
};

