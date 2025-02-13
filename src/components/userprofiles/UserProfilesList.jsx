import { useEffect, useState } from "react";
import {
  getProfiles,
  deactivateUser,
  reactivateUser,
} from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [showInactive, setShowInactive] = useState(false); // Track if inactive users should be shown

  // Fetch user profiles from the API
  const getUserProfiles = async () => {
    try {
      // Fetch the profiles from the API
      const profiles = await getProfiles();

      // Filter profiles based on the `showInactive` state
      const filteredProfiles = profiles.filter((profile) =>
        showInactive ? profile.isActive === false : profile.isActive === true
      );

      // Sorting the profiles by userName in alphabetical order
      const sortedProfiles = filteredProfiles.sort((a, b) => {
        if (a.userName < b.userName) return -1;
        if (a.userName > b.userName) return 1;
        return 0;
      });

      // Set the sorted and filtered profiles in state
      setUserProfiles(sortedProfiles);
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    }
  };

  // Function to handle deactivating a user with confirmation
  const handleDeactivate = (userId) => {
    const confirmDeactivation = window.confirm(
      "Are you sure you want to deactivate this user?"
    );
    if (confirmDeactivation) {
      console.log("Deactivating user:", userId);
      deactivateUser(userId)
        .then(() => {
          console.log("User deactivated, refetching profiles...");
          getUserProfiles();
        })
        .catch((error) => {
          console.error("Failed to deactivate user:", error);
        });
    } else {
      console.log("Deactivation canceled");
    }
  };

  // Function to handle reactivating a user with confirmation
  const handleReactivate = (userId) => {
    const confirmReactivation = window.confirm(
      "Are you sure you want to reactivate this user?"
    );
    if (confirmReactivation) {
      reactivateUser(userId).then(() => {
        getUserProfiles();
      });
    } else {
      console.log("Reactivation canceled");
    }
  };

  // Toggle the visibility of inactive users
  const toggleShowInactive = () => {
    setShowInactive((prevState) => !prevState);
  };

  // On component mount, fetch user profiles
  useEffect(() => {
    getUserProfiles();
  }, [showInactive]); // Re-fetch profiles when `showInactive` changes

  return (
    <>
      <p>User Profile List</p>

      {/* Toggle Button */}
      <button onClick={toggleShowInactive}>
        {showInactive ? "Show Active Users" : "Show Inactive Users"}
      </button>

      {/* Display user profiles */}
      {userProfiles.map((p) => (
        <p key={p.id}>
          {p.firstName} {p.lastName} {p.userName}{" "}
          {p.roles[0] === "Admin" ? (
            <span>{p.roles.join(", ")}</span>
          ) : (
            <span>Author</span>
          )}
          {/* Show deactivation or reactivation button based on the user's current status */}
          {p.isActive === true && (
            <button onClick={() => handleDeactivate(p.id)}>Deactivate</button>
          )}
          {p.isActive === false && (
            <button onClick={() => handleReactivate(p.id)}>Reactivate</button>
          )}
          <Link to={`/userprofiles/${p.id}`}>Details</Link>
        </p>
      ))}
    </>
  );
}
