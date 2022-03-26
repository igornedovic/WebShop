export class User {
  id: number | null = null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  image: string | undefined;

  constructor(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    username: string,
    password: string,
    isAdmin: boolean,
    image?: string,
    id?: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
    this.image = image;

    if (id) {
      this.id = id;
    }
  }
}
