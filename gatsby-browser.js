
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


// export const shouldUpdateScroll = ({
//   routerProps: { location },
//   prevRouterProps,
// }) => {
//   // Prevent scroll reset when navigating between pages
//   if (prevRouterProps && location.pathname === prevRouterProps.location.pathname) {
//     return false; // Disable scroll reset
//   }
//   return false; // Allow default scroll behavior for new pages
// };

export const onPreRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation) {
    // Add fade-out class before page transition
    document.body.classList.add('page-exit');
    document.body.classList.remove('page-enter');

    setTimeout(() => {
      document.body.classList.remove('page-exit');
    }, 500); // Match the duration of your CSS transition
  }
};

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation) {
    // Add fade-in class after page transition
    document.body.classList.add('page-enter');
    document.body.classList.remove('page-exit');

    setTimeout(() => {
      document.body.classList.remove('page-enter');
      // Reset scroll to top after fade-in completes
      window.scrollTo(0, 0);
    }, 500); // Match the duration of your CSS transition
  } else {
    // For the first load, ensure the page is at the top
    window.scrollTo(0, 0);
  }
};

export const shouldUpdateScroll = () => {
  // Prevent default scroll behavior
  return false;
};


