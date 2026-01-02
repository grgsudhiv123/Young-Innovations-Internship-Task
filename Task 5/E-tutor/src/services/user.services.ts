import { supabase } from "../auth/client.auth";

export const UpdateUserImage = async (imgUrl: string) => {
  const { error } = await supabase.auth.updateUser({
    data: {
      avatar_url: imgUrl,
    },
  });

  if (error) {
    throw new Error("Error in update user image", error);
  }
};
