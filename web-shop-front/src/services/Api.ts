import { User } from "../models/User";
import { Manufacturer } from "../models/Manufacturer";
import { ProductType } from "../models/ProductType";

const baseUrl = "http://localhost:5000/api";

export async function AddUser(user: User) {
  const response = await fetch(baseUrl + "/user/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function AddManufacturer(manufacturer: Manufacturer) {
  const res = await fetch(baseUrl + "/manufacturer", {
    method: "POST",
    body: JSON.stringify(manufacturer),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function AddProductType(productType: ProductType) {
  const res = await fetch(baseUrl + "/productType", {
    method: "POST",
    body: JSON.stringify(productType),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}
