import { useEffect, useState } from "react";
import {
  getProfile,
  promoteUser,
  demoteUser,
} from "../../managers/userProfileManager";
import { tryGetLoggedInUser } from "../../managers/authManager";
import { Link, useParams } from "react-router-dom";
import { Button } from "reactstrap";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Check if current user is admin
  const { id } = useParams();

  // Fetch logged-in user's role to check if they are an admin
  useEffect(() => {
    tryGetLoggedInUser().then((user) => {
      if (user && user.roles && user.roles.includes("Admin")) {
        setIsAdmin(true);
      }
    });
  }, []);

  // Fetch user profile when component mounts or when ID changes
  useEffect(() => {
    getProfile(id).then((profile) => {
      setUserProfile(profile);
    });
  }, [id]);

  // Promote a user to Admin
  // Promote a user to Admin
  const handlePromote = async () => {
    try {
      await promoteUser(userProfile.identityUserId); // Wait for the user to be promoted
      // After promoting, refetch the profile to reflect updated roles
      const updatedProfile = await getProfile(id);
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Error promoting user:", error);
    }
  };

  // Demote a user from Admin
  const handleDemote = async () => {
    try {
      await demoteUser(userProfile.identityUserId); // Wait for the user to be demoted
      // After demoting, refetch the profile to reflect updated roles
      const updatedProfile = await getProfile(id);
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Error demoting user:", error);
    }
  };

  // If the profile is not loaded, show nothing
  if (!userProfile) {
    return null;
  }

  return (
    <>
      <img src={userProfile.imageLocation} alt={userProfile.firstName} />
      <h3>{userProfile.fullName}</h3>
      <p>Username: {userProfile.userName}</p>
      <p>Email: {userProfile.email}</p>
      <p>
        Date Created:{" "}
        {new Date(Date.parse(userProfile.createDateTime)).toLocaleString()}
      </p>
      <p>
        User Type:{" "}
        {userProfile.roles && userProfile.roles.length > 0
          ? userProfile.roles[0] // First role (if exists)
          : "Author"}{" "}
      </p>

      {/* Display promote/demote buttons if the user is an admin */}
      {isAdmin && (
        <div>
          {userProfile.roles.includes("Admin") ? (
            <button onClick={handleDemote}>Demote from Admin</button>
          ) : (
            <button onClick={handlePromote}>Promote to Admin</button>
          )}
        </div>
      )}
      <Link
        to={`/userprofile/${userProfile.id}/posts`}
        className="btn delete-btn"
      >
        {" "}
        View {userProfile.userName}'s' Posts
      </Link>
    </>
  );
}
