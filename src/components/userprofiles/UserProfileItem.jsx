import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { getAdminActionCount } from "../../managers/adminActionManager";

export default function UserProfileItem({
  profile,
  onDeactivate,
  onReactivate,
  onDeactivateAuthor,
  refreshUsers,
}) {
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    getAdminActionCount(profile.id, "deactivate").then((votes) =>
      setVotes(votes)
    );
  }, [profile.id]);

  const handleDeactivate = async (userId) => {
    const updatedVotes = await onDeactivate(userId);
    setVotes(updatedVotes);
    refreshUsers();
  };

  const handleDeactivateAuthor = async (userId) => {
    await onDeactivateAuthor(userId);
    const updatedVotes = await getAdminActionCount(userId, "deactivate");
    setVotes(updatedVotes);
    refreshUsers();
  };

  return (
    <tr>
      <td>
        {profile.firstName} {profile.lastName} ({profile.userName})
      </td>
      <td>
        {profile.roles[0] === "Admin" ? (
          <span>{profile.roles.join(", ")}</span>
        ) : (
          <span>Author</span>
        )}
      </td>
      <td>
        {profile.isActive ? (
          profile.roles[0] === "Admin" ? (
            <Button
              outline
              color="danger"
              onClick={async () => {
                await handleDeactivate(profile.id);
              }}
            >
              Deactivate
              <Badge className="ms-2" color="danger">
                Votes: {votes}
              </Badge>
            </Button>
          ) : (
            <Button
              color="danger"
              onClick={async () => {
                await handleDeactivateAuthor(profile.id);
              }}
            >
              Demote
            </Button>
          )
        ) : (
          <Button color="success" onClick={() => onReactivate(profile.id)}>
            Reactivate
          </Button>
        )}
      </td>
      <td>
        <Link to={`/userprofiles/${profile.id}`}>Details</Link>
      </td>
    </tr>
  );
}
