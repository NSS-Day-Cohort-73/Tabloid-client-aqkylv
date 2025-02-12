import { Route, Routes, Outlet } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import NavBar from "./NavBar";
import CategoryList from "./categories/CategoryList";
import PostList from "./posts/PostList";
import CreateAPost from "./posts/CreateAPost";
import CommentsList from "./comments/CommentsList";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
            <Outlet />
          </>
        }
      >
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Welcome to Tabloid!</p>
            </AuthorizedRoute>
          }
        />
        <Route
          path="explore"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <PostList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="createpost"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateAPost loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="subscribed-posts"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Subscribed Posts</p>
            </AuthorizedRoute>
          }
        />
        <Route
          path="my-posts"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>My Posts</p>
            </AuthorizedRoute>
          }
        />
        <Route
          path="posts/:postId/comments"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CommentsList />
            </AuthorizedRoute>
          }
        />
        <Route path="userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
          path="categories"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <CategoryList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="tags"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Tags</p>
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
