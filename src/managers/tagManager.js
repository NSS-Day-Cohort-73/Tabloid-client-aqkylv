// Get all tags (or filter by tagId if provided)
export const getAllTags = async (postId = null) => {
  // Construct the URL with optional postId query parameter
  const url = postId ? `/api/tag?postId=${postId}` : "/api/tag";

  const res = await fetch(url);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to fetch tags: ${res.status}`);
  }
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
