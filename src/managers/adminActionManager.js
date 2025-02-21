export const executeAdminAction = async (userId, actionType) => {
  const response = await fetch(
    `/api/AdminAction/execute?userId=${userId}&actionType=${actionType}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const getAdminActionCount = async (userId, actionType) => {
    const response = await fetch(
        `/api/AdminAction/count?userId=${userId}&actionType=${actionType}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return await response.json();
};