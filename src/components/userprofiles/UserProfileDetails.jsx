import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";
import { Button } from "reactstrap";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState();

  const { id } = useParams();

  useEffect(() => {
    getProfile(id).then(setUserProfile);
  }, [id]);

  if (!userProfile) {
    return null;
  }
  return (
    <>
      <img src={userProfile.imageLocation} alt={userProfile.firstName} />
      <h3>{userProfile.fullName}</h3>
      <p>Username: {userProfile.userName}</p>
      <p>Email: {userProfile.email} </p>
      <p>
        Date Created:{" "}
        {new Date(Date.parse(userProfile.createDateTime)).toLocaleString()}
      </p>
      <p>
        User Type:{" "}
        {userProfile.roles && userProfile.roles.length > 0
          ? userProfile.roles[0]
          : "Author"}
      </p>
      <Link to={`/userprofile/${userProfile.id}/posts`} className="btn delete-btn"> View {userProfile.userName}'s' Posts</Link>
    </>
  );
}
