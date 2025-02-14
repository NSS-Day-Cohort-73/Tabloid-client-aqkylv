// Fetch all reactions for a given post and reactionId
export const getPostReactions = async (postId, reactionId) => {
    const res = await fetch(`/api/PostReaction?postId=${postId}&reactionId=${reactionId}`);

    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`Failed to fetch post reactions: ${res.status}`);
    }
};

// Add a new reaction to a post (expects full postReaction object)
export const addPostReaction = async (postReaction) => {
  const res = await fetch(`/api/PostReaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postReaction),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to add post reaction: ${res.status}`);
  }
};

// Delete a user's reaction on a post
export const deletePostReaction = async (postId, userProfileId, reactionId) => {
  const res = await fetch(
    `/api/PostReaction?postId=${postId}&userProfileId=${userProfileId}&reactionId=${reactionId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to delete post reaction: ${res.status}`);
  }
};

// Fetch all available reactions
export const getReactions = async () => {
  const res = await fetch(`/api/Reaction`);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to fetch reactions: ${res.status}`);
  }
};

// Add a new reaction type (expects full reaction object)
export const addReaction = async (reaction) => {
  const res = await fetch(`/api/Reaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reaction),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Failed to add reaction: ${res.status}`);
  }
};

// Delete a reaction type
export const deleteReaction = async (reactionId) => {
  const res = await fetch(`/api/Reaction/${reactionId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete reaction: ${res.status}`);
  }
};
