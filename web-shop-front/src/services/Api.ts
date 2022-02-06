import { User } from "../models/User";

const baseUrl = "http://localhost:5000/api";

export async function AddUser(user: User) {
  const response = await fetch(baseUrl + "/user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}
