import { User } from "../models/User";
import { Manufacturer } from "../models/Manufacturer";
import { ProductType } from "../models/ProductType";
import { Product } from "../models/Product";

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

export async function GetAllManufacturers(): Promise<Manufacturer[]> {
  const response = await fetch(baseUrl + "/manufacturer");
  return await response.json();
}

export async function AddManufacturer(manufacturer: Manufacturer) {
  const response = await fetch(baseUrl + "/manufacturer", {
    method: "POST",
    body: JSON.stringify(manufacturer),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function GetAllProductTypes(): Promise<Manufacturer[]> {
  const response = await fetch(baseUrl + "/productType");
  return await response.json();
}

export async function AddProductType(productType: ProductType) {
  const response = await fetch(baseUrl + "/productType", {
    method: "POST",
    body: JSON.stringify(productType),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function AddProduct(product: Product) {
  const response = await fetch(baseUrl + `/product`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function GetAllProducts(): Promise<Product[]> {
  const res = await fetch(baseUrl + "/product");
  return await res.json();
}

export async function UpdateProduct(product: Product) {
  const res = await fetch(baseUrl + `/product/${product?.id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function DeleteProduct(id: number) {
  const res = await fetch(baseUrl + `/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}

export async function UpdateUser(user: User) {
  const res = await fetch(baseUrl + `/user/${user?.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}
