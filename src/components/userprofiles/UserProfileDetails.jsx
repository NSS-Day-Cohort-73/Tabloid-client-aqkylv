import { useEffect, useState } from "react";
import {
  getProfile,
  promoteUser,
  demoteUser,
  updateUserProfileImage,
} from "../../managers/userProfileManager";
import { tryGetLoggedInUser } from "../../managers/authManager";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";

import ImageUploader from "../imageUploader";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [newImageUrl, setNewImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false); // <-- For toggling the modal

  const { id } = useParams();
  const intId = parseInt(id);

  // 1. Fetch the current logged-in user (for roles & ID)
  useEffect(() => {
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
      if (user && user.roles && user.roles.includes("Admin")) {
        setIsAdmin(true);
      }
    });
  }, []);

  // 2. Fetch the user profile from the server
  useEffect(() => {
    getProfile(id).then((profile) => {
      setUserProfile(profile);
    });
  }, [id]);

  // ----- Promote/Demote Admin Handlers -----
  const handlePromote = async () => {
    try {
      await promoteUser(userProfile.identityUserId);
      const updatedProfile = await getProfile(id);
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Error promoting user:", error);
    }
  };

  const handleDemote = async () => {
    try {
      // Try to demote the user
      await demoteUser(userProfile.identityUserId);

      // Refresh the profile after demotion
      const updatedProfile = await getProfile(id);
      setUserProfile(updatedProfile);
    } catch (error) {
      // Check if the error is from the backend response
      if (error.message) {
        // Display the error message to the user
        alert(error.message);
      } else {
        // Handle any unexpected errors
        console.error("Error demoting user:", error);
        alert("An unexpected error occurred while trying to demote the user.");
      }
    }
  };

  // ----- Save Image (PUT request) -----
  const handleImageUpdate = async (e) => {
    e.preventDefault();
    if (!newImageUrl) {
      alert("No new image URL to update!");
      return;
    }

    try {
      // Call the manager function that does the PUT /api/UserProfile/{id}/image
      await updateUserProfileImage(intId, newImageUrl);

      // Refetch the profile so the main image updates
      const updatedProfile = await getProfile(id);
      setUserProfile(updatedProfile);

      alert("Profile image updated!");

      // Optionally clear out the state and close the modal
      setNewImageUrl("");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user profile image:", error);
      alert("Something went wrong updating the image.");
    }
  };

  // If the profile is not loaded, show nothing (or a spinner)
  if (!userProfile) {
    return null;
  }

  return (
    <Container className="mt-4 mx-auto text-center p-4">
      {/* -- Main User Info -- */}
      <img
        style={{ width: "200px" }}
        src={userProfile.imageLocation}
        alt={userProfile.firstName}
      />
      {/* -- If this is the logged-in user's profile, show the "Change Image" button -- */}
      {loggedInUser && loggedInUser.id === intId && (
        <div>
          <Button className="info-btn mt-1" onClick={() => setShowModal(true)}>
            Change Profile Image
          </Button>
        </div>
      )}
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
          ? userProfile.roles[0]
          : "Author"}{" "}
      </p>

      {/* -- Admin Buttons -- */}
      {isAdmin && (
        <div>
          {userProfile.roles.includes("Admin") ? (
            <Button className="delete-btn" onClick={handleDemote}>
              Demote from Admin
            </Button>
          ) : (
            <Button className="save-btn" onClick={handlePromote}>
              Promote to Admin
            </Button>
          )}
        </div>
      )}

      <Link
        to={`/userprofile/${userProfile.id}/posts`}
        className="btn save-btn mt-2"
      >
        View {userProfile.userName}'s Posts
      </Link>

      {/* -- The Modal for Uploading/Previewing/Saving -- */}
      <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
        <ModalHeader toggle={() => setShowModal(false)}>
          Update Your Profile Image
        </ModalHeader>

        <ModalBody>
          <ImageUploader
            type="profile"
            setImageURL={(url) => setNewImageUrl(url)}
          />
          {/* Show a preview of the newly uploaded image, if any */}
          {newImageUrl && (
            <div style={{ marginTop: "1rem" }}>
              <p>Preview of new image:</p>
              <img
                src={newImageUrl}
                alt="New upload"
                style={{ width: 100, height: 100 }}
              />
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={handleImageUpdate}>
            Save New Profile Image
          </Button>
          <Button color="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
