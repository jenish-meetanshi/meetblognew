const processPostContent = async ({ remoteNode }) => {
  if (remoteNode.content) {
    remoteNode.content = remoteNode.content
      .replace(/data-gatsby-image-wrapper=""/g, '')
      .replace(/class="gatsby-image-wrapper[^"]*"/g, '')
      .replace(/class="inline-gatsby-image-wrapper[^"]*"/g, '');
  }
  return remoteNode;
};
