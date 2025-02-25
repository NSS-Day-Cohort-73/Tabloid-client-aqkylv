const _apiUrl = "/api/subscription";

export const checkSubscription = (authorId, subscriberId) => {
  return fetch(`${_apiUrl}/check/${authorId}/${subscriberId}`)
    .then(res => res.json());
};


export const getMySubscriptions = () => {
  return fetch(_apiUrl)
    .then(res => res.json());
};


export const PostSubscription = (subscription) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
 };
 
 
 export const deleteSubscription = (subscriptionId) => {
   return fetch(`${_apiUrl}/${subscriptionId}`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
     }
   });
 };