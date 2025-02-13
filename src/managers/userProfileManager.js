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
      console.log("Deactivate response:", response); // Log the response for debugging
      if (!response.ok) {
        throw new Error("Failed to deactivate user");
      }
      // Since the backend sends a 204 No Content response, we don't call response.json()
      return response; // Simply return the response, no need to parse it
    })
    .then(() => {
      console.log("User deactivated successfully.");
    })
    .catch((error) => {
      console.error("Error deactivating user:", error); // Log the error
    });
};

// Reactivate a user account by ID
export const reactivateUser = (userId) => {
  return fetch(`${_apiUrl}/reactivate/${userId}`, {
    method: "POST", // POST request as per your backend setup
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to reactivate user");
      }
      return response; // No content is returned, so we return the response itself
    })
    .catch((error) => console.error("Error reactivating user:", error));
};
