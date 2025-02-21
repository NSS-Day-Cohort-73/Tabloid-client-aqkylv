import { useEffect, useState } from "react";
import {
  getProfile,
  promoteUser,
  updateUserProfileImage,
} from "../../managers/userProfileManager";
import {
  executeAdminAction,
  getAdminActionCount,
} from "../../managers/adminActionManager";
import { tryGetLoggedInUser } from "../../managers/authManager";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Alert,
  Badge,
} from "reactstrap";

import ImageUploader from "../imageUploader";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [newImageUrl, setNewImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false); // <-- For toggling the modal
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [demoteVotes, setDemoteVotes] = useState(0);

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

  // Fetch the number of votes to demote the user
  useEffect(() => {
    if (userProfile) {
      getAdminActionCount(userProfile.id, "demote").then((votes) =>
        setDemoteVotes(votes)
      );
    }
  }, [userProfile]);

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

  const handleDemote = (userId) => {
    setModalMessage("Are you sure you want to demote this user?");
    setModalAction(() => () => executeDemotion(userId));
    setModalVisible(true);
  };

  const executeDemotion = async (userId) => {
    try {
      const data = await executeAdminAction(userId, "demote");
      setAlertMessage(data.message);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);

      const updatedProfile = await getProfile(userId);
      setUserProfile(updatedProfile);

      const votes = await getAdminActionCount(userId, "demote");
      setDemoteVotes(votes);
    } catch (error) {
      setAlertMessage(error.message);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);
    } finally {
      setModalVisible(false);
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
            <Button
              outline
              color="danger"
              onClick={() => handleDemote(userProfile.id)}
            >
              Demote from Admin
              <Badge className="ms-2" color="danger">
                Votes: {demoteVotes}
              </Badge>
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

      {/* Modal for confirmation */}
      <Modal isOpen={modalVisible} toggle={() => setModalVisible(false)}>
        <ModalHeader toggle={() => setModalVisible(false)}>
          Confirmation
        </ModalHeader>
        <ModalBody>{modalMessage}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={modalAction}>
            Confirm
          </Button>
          <Button color="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Alert for demotion success */}
      <Alert
        color="info"
        isOpen={alertVisible}
        toggle={() => setAlertVisible(false)}
        timeout={{ appear: 500, enter: 500, exit: 500 }}
      >
        {alertMessage}
      </Alert>
    </Container>
  );
}
