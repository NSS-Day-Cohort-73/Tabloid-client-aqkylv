const _apiUrl = "/api/subscription";

export const PostSubscription = (subscription) => {
  return fetch("/api/subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
 };
 