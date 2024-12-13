export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { postId, authorName, authorEmail, content, parent } = req.body;
  
    if (!postId || !authorName || !authorEmail || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    try {
      const response = await fetch("https://mitfestival.app/meetanshiblog/wp-json/wp/v2/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: postId,
          author_name: authorName,
          author_email: authorEmail,
          content,
          parent: parent || 0,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit comment.");
      }
  
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
