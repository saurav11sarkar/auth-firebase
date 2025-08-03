export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  photoURL?: string;
  ways: "catential" | "google" | "github";
}
