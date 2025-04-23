import React from 'react';

const WordPressContent = ({ content }) => {
  const processContent = (htmlContent) => {
    if (!htmlContent) return '';
    
    // Replace data URI SVG placeholders with original WordPress URLs
    const processedContent = htmlContent.replace(
      /<img[^>]*src="data:image\/svg\+xml[^>]*data-wp-inline-image="[^"]*"[^>]*>/g,
      (match) => {
        // Extract the original WordPress URL from the data attributes
        const wpImage = match.match(/data-wp-inline-image="([^"]*)"/);
        if (wpImage) {
          // Find the original URL in the JSON hydration data
          const hydrationScript = document.querySelector(
            `script[data-wp-inline-image-hydration="${wpImage[1]}"]`
          );
          if (hydrationScript) {
            try {
              const hydrationData = JSON.parse(hydrationScript.textContent);
              const originalSrc = hydrationData.image.images.fallback.src;
              // Extract the WordPress URL from the Gatsby URL
              const wpUrl = new URL(originalSrc).searchParams.get('u');
              if (wpUrl) {
                return `<img src="${decodeURIComponent(wpUrl)}" class="wp-image img-fluid" alt="${hydrationData.alt || ''}" />`;
              }
            } catch (e) {
              console.error('Error processing image:', e);
            }
          }
        }
        return match;
      }
    )
    // Clean up any remaining Gatsby image wrappers
    .replace(/<div[^>]*data-gatsby-image-wrapper[^>]*>([\s\S]*?)<\/div>/g, '$1')
    // Replace Gatsby processed image paths with original WordPress URLs and add img-fluid class
    .replace(/src="[^"]*\/_gatsby\/image\/[^"]*\?u=([^&]*)&[^"]*"/g, (match, wpUrl) => {
      return `src="${decodeURIComponent(wpUrl)}" class="img-fluid"`;
    });
    
    return processedContent;
  };

  return (
    <div
      className="wordpress-content"
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
    />
  );
};

export default WordPressContent;
