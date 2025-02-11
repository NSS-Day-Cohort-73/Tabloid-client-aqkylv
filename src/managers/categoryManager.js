//Get all categories
export const getAllCategories = async () => {
  const res = await fetch("/api/category");
  if (res.ok) {
    return res.json();
  } else {
    throw res;
  }
};

//Get a single category
export const getCategoryById = async (id) => {
  const res = await fetch(`/api/category/${id}`);
  if (res.ok) {
    return res.json();
  } else {
    throw res;
  }
};

//Add a category
export const addCategory = async (category) => {
  const res = await fetch("/api/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (res.ok) {
    return res.json();
  } else {
    throw res;
  }
};
