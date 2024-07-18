import { instance } from "./config";
import { User } from "../interface/user";

export const loginAPI = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  try {
    const response = await instance.get("/user", {
      params: {
        email,
        password,
      },
    });

    const user = response.data.find(
      (user: User) => user.email === email && user.password === password
    );

    if (user) {
      return user;
    } else {
      console.log("Login failed: Invalid email or password");
      return undefined;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Failed to login");
  }
};
