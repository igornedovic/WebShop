export class User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  image: string;

  constructor(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    username: string,
    password: string,
    isAdmin: boolean,
    image: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
    this.image = image;
  }
}
