export const cleanWordPressContent = (content) => {
  if (!content) return '';
  
  return content
    // Remove Gatsby image wrappers
    .replace(/<div[^>]*data-gatsby-image-wrapper[^>]*>/g, '')
    .replace(/<\/div>/g, '')
    // Replace Gatsby processed image paths with original WordPress URLs
    .replace(/src="([^"]*\/_gatsby\/image\/[^"]*?)"/g, (match, src) => {
      const urlMatch = src.match(/u=([^&]*)/);
      if (urlMatch) {
        return `src="${decodeURIComponent(urlMatch[1])}"`;
      }
      return match;
    })
    // Remove Gatsby-specific classes and attributes
    .replace(/class="gatsby-image-wrapper[^"]*"/g, '')
    .replace(/data-main-image/g, '')
    .replace(/data-gatsby-image-wrapper/g, '')
    // Clean up any double spaces or empty attributes
    .replace(/\s+/g, ' ')
    .replace(/\s*=\s*""/g, '');
};
