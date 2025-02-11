//Get all categories
export const getAllCategories = async () => {
  const res = await fetch("/api/category");
  if (res.ok) {
    return res.json();
  } else {
    throw res;
  }
};
