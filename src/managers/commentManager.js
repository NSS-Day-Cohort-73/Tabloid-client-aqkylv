// Get all comments (or filter by postId if provided)
export const getAllComments = async (postId = null) => {
  // Construct the URL with optional postId query parameter
  const url = postId ? `/api/comment?postId=${postId}` : "/api/comment";

  const res = await fetch(url);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to fetch comments: ${res.status}`);
  }
};

// Get a single comment
export const getCommentById = async (id) => {
  const res = await fetch(`/api/comment/${id}`);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to fetch comment: ${res.status}`);
  }
};

// Add a comment
export const addComment = async (comment) => {
  const res = await fetch("/api/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to add comment: ${res.status}`);
  }
};

// Delete a comment
export const deleteComment = async (id) => {
  await fetch(`/api/comment/${id}`, {
    method: "DELETE",
  });
};

// Update a comment
export const updateComment = async (comment) => {
  await fetch(`/api/comment/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};
