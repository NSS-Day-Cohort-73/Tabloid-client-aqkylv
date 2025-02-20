const _apiUrl = "/api/post";

export const getAllPosts = (categoryId, tagId) => {
  let url = _apiUrl;
  if (categoryId || tagId) {
    url += '?';
    if (categoryId) {
      url += `categoryId=${categoryId}`;
    }
    if (tagId) {
      if (categoryId) {
        url += '&';
      }
      url += `tagId=${tagId}`;
    }
  }
  return fetch(url).then((res) => res.json());
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