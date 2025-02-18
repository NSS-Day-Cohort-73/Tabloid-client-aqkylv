const _apiUrl = "/api/post";

export const getAllPosts = (categoryId) => {
  return fetch(`${_apiUrl}${categoryId ? `?categoryId=${categoryId}` : ''}`)
    .then((res) => res.json());
};


export const getMyPosts = () => {
  return fetch(`${_apiUrl}/my-posts`).then((res) => res.json());
};

export const createPost = (post) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

export const updatePost = (id, post) => {
  return fetch(`${_apiUrl}/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
  });
};

export const getById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
}

export const getByIdToBeEdited = (id) => {
  return fetch(`${_apiUrl}/createpost/${id}`).then((res) => res.json());
}

export const deletePost = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
};