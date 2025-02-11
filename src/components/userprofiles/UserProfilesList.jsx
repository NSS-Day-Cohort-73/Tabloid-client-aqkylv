import { useEffect, useState } from "react";
import { getProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);

  const getUserProfiles = () => {
    getProfiles().then((profiles) => {
      // Sorting the profiles by userName in alphabetical order
      const sortedProfiles = profiles.sort((a, b) => {
        if (a.userName < b.userName) return -1;
        if (a.userName > b.userName) return 1;
        return 0;
      });

      setUserProfiles(sortedProfiles);
    });
  };

  useEffect(() => {
    getUserProfiles();
  }, []);

  return (
    <>
      <p>User Profile List</p>
      {userProfiles.map((p) => (
        <p key={p.id}>
          {p.firstName} {p.lastName} {p.userName}{" "}
          {p.roles[0] === "Admin" ? (
            <span>{p.roles.join(", ")}</span> // Display all roles if the first role is "Admin"
          ) : (
            <span>Author</span> // Otherwise, just display "Author"
          )}
          <Link to={`/userprofiles/${p.id}`}>Details</Link>
        </p>
      ))}
    </>
  );
}
