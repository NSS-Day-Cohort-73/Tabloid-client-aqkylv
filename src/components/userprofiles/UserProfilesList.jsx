import { useEffect, useState } from "react";
import {
  getProfiles,
  deactivateUser,
  reactivateUser,
  demoteUser,
} from "../../managers/userProfileManager";
import { Link } from "react-router-dom";
import UserProfileItem from "./UserProfileItem";
import {
  Button,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import {
  executeAdminAction,
  getAdminActionCount,
} from "../../managers/adminActionManager";

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [showInactive, setShowInactive] = useState(false); // Track if inactive users should be shown
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);

  // Fetch user profiles from the API and set them in state
  const getAndSetUsers = async () => {
    try {
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
    setModalMessage("Are you sure you want to deactivate this user?");
    setModalAction(() => () => executeDeactivation(userId));
    setModalVisible(true);
  };

  const executeDeactivation = async (userId) => {
    try {
      const data = await executeAdminAction(userId, "deactivate");
      const updatedVotes = await getAdminActionCount(userId, "deactivate");
      setAlertMessage(data.message);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);

      await getAndSetUsers();
      return updatedVotes;
    } catch (error) {
      setAlertMessage(error.message);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);
    } finally {
      setModalVisible(false);
    }
  };

  // Function to handle deactivating an author with confirmation
  const handleDeactivateAuthor = (userId) => {
    setModalMessage("Are you sure you want to deactivate this author?");
    setModalAction(() => () => executeDeactivationAuthor(userId));
    setModalVisible(true);
  };

  const executeDeactivationAuthor = async (userId) => {
    try {
      await deactivateUser(userId);
      getAndSetUsers();
    } catch (error) {
      console.error("Error deactivating author:", error);
    } finally {
      setModalVisible(false);
    }
  };

  // Function to handle reactivating a user with confirmation
  const handleReactivate = (userId) => {
    setModalMessage("Are you sure you want to reactivate this user?");
    setModalAction(() => () => executeReactivation(userId));
    setModalVisible(true);
  };

  const executeReactivation = async (userId) => {
    try {
      await reactivateUser(userId);
      getAndSetUsers();
    } catch (error) {
      console.error("Error reactivating user:", error);
    } finally {
      setModalVisible(false);
    }
  };

  // Toggle the visibility of inactive users
  const toggleShowInactive = () => {
    setShowInactive((prevState) => !prevState);
  };

  // On component mount, fetch user profiles
  useEffect(() => {
    getAndSetUsers();
  }, [showInactive]); // Re-fetch profiles when `showInactive` changes

  return (
    <Container>
      <h2>User Profile List</h2>

      {/* Toggle Button */}
      <Button className="mb-2" onClick={toggleShowInactive}>
        {showInactive ? "Show Active Users" : "Show Inactive Users"}
      </Button>

      {/* Display user profiles in a table */}
      <Table striped hover bordered className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((p) => (
            <UserProfileItem
              key={p.id}
              profile={p}
              onDeactivate={handleDeactivate}
              onReactivate={handleReactivate}
              onDeactivateAuthor={handleDeactivateAuthor}
              refreshUsers={getAndSetUsers}
            />
          ))}
        </tbody>
      </Table>

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

      {/* Alert for deactivation success */}
      <Alert
        color="info"
        isOpen={alertVisible}
        toggle={() => setAlertVisible(false)}
        fade={true}
      >
        {alertMessage}
      </Alert>
    </Container>
  );
}
