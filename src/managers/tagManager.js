export const getAllTags = async () => {
  const response = await fetch("http://localhost:5173/api/Tag");
  if (!response.ok) {
    throw new Error("Failed to fetch all tags");
  }
  return await response.json();
};

// Get a single tag
export const getTagById = async (id) => {
  const res = await fetch(`/api/tag/${id}`);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to fetch tag: ${res.status}`);
  }
};

// Add a tag
export const addTag = async (tag) => {
  const res = await fetch("/api/tag", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to add tag: ${res.status}`);
  }
};

// Delete a tag
export const deleteTag = async (id) => {
  await fetch(`/api/tag/${id}`, {
    method: "DELETE",
  });
};

// Update a tag
export const updateTag = async (tag) => {
  await fetch(`/api/tag/${tag.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });
};

// Get all tags for a specific post
export const getAllPostTags = async (postId) => {
  const res = await fetch(`/api/PostTag?postId=${postId}`);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to fetch tags for post: ${res.status}`);
  }
};

// Add a tag to a specific post
export const addPostTags = async (postId, tagId) => {
  const res = await fetch(`/api/PostTag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId, tagId }),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to add tag to post: ${res.status}`);
  }
};

// Delete a tag from a specific post
export const deletePostTag = async (postId, tagId) => {
  await fetch(`/api/PostTag?postId=${postId}&tagId=${tagId}`, {
    method: "DELETE",
  });
};

// Update tags for a specific post
export const updatePostTags = async (postId, postTags) => {
  const res = await fetch(`/api/PostTag?postId=${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postTags),
  });

  if (!res.ok){
    throw new Error(`Failed to update tags for post: ${res.status}`);
  }
};
