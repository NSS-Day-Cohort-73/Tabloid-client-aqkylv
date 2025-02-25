const _apiUrl = "/api/userprofile";

export const getProfilesForHomepage = () => {
  return fetch(_apiUrl).then((res) => res.json());
}; 
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
      // Check if the response is not OK
      if (!response.ok) {
        // Check if the response body is JSON
        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
          return response.json().then((errorData) => {
            // Handle the error from JSON response
            throw new Error(errorData.message || response.statusText);
          });
        } else {
          // If the response is plain text, handle it here
          return response.text().then((errorText) => {
            if (
              errorText ===
              "You cannot deactivate the last active admin. There must always be at least one active admin."
            ) {
              throw new Error(errorText); // Throw the specific error message
            } else {
              throw new Error(`Failed to deactivate user: ${errorText}`);
            }
          });
        }
      }

      console.log("User deactivated successfully.");
      return response; // Return response if everything is successful
    })
    .catch((error) => {
      console.error("Error deactivating user:", error);
      alert(error.message); // Show the error message to the user
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

  // Check if the response is not OK
  if (!response.ok) {
    // If the response is an error (400 or 500 range), extract the error message from the response body
    const errorData = await response.json();
    const errorMessage = errorData.message || response.statusText;

    // Throw the error with the message from the server
    throw new Error(`Failed to demote user: ${errorMessage}`);
  }
};

export const getUserProfilePosts = (id) => {
  return fetch(`${_apiUrl}/${id}/posts`).then((res) => res.json());
};

export async function updateUserProfileImage(userId, imageUrl) {
  const response = await fetch(`/api/UserProfile/${userId}/image`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageLocation: imageUrl }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update user profile image. Status: ${response.status}`
    );
  }
}
