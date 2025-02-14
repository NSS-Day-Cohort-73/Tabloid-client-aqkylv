const _apiUrl = "/api/userprofile";

// Get all profiles with roles
export const getProfiles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

// Get a specific profile by ID
export const getProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

// Deactivate a user account by ID
export const deactivateUser = (userId) => {
  return fetch(`${_apiUrl}/deactivate/${userId}`, {
    method: "POST", // POST request as per your backend setup
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to deactivate user: ${response.statusText}`);
      }
      return response;
    })
    .then(() => {
      console.log("User deactivated successfully.");
    })
    .catch((error) => {
      console.error("Error deactivating user:", error);
    });
};

// Reactivate a user account by ID
export const reactivateUser = (userId) => {
  return fetch(`${_apiUrl}/reactivate/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to reactivate user: ${response.statusText}`);
      }
      return response;
    })
    .catch((error) => console.error("Error reactivating user:", error));
};

export const promoteUser = async (id) => {
  const response = await fetch(`/api/userprofile/promote/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to promote user: ${response.statusText}`);
  }
};

export const demoteUser = async (id) => {
  const response = await fetch(`/api/userprofile/demote/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to demote user: ${response.statusText}`);
  }
};

export const getUserProfilePosts = (id) => {
  return fetch(`${_apiUrl}/${id}/posts`).then((res) => res.json());
};
