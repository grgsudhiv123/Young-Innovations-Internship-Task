import { supabase } from "../auth/client.auth";
import type { SignInDataType, SignupDataType } from "../schemas/auth.schema";
import { UserRole } from "../utils/constants/userrole.constants";

export const SignUp = async (userData: SignupDataType) => {
  const { email, password, username, fullname } = userData;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: `${fullname.firstName} ${fullname.lastName}`,
        username,
        role: UserRole.ADMIN,
      },
    },
  });

  if (error) {
    throw new Error("Error in signup ");
  }
};

export const SignIn = async (userData: SignInDataType) => {
  const { email, password } = userData;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const Logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};
