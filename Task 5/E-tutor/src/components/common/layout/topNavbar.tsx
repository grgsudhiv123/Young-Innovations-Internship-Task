import { BellIcon, MagnifyingGlassIcon, PenIcon } from "@phosphor-icons/react";
import { useLocation } from "react-router";
import { PageRoutes } from "../../../enum/routes";
import { UseAuth } from "../../../hooks/useAuth";
import { useRef, type ChangeEvent } from "react";
import { ImageUpload } from "../../../services/imageupload.services";
import { UpdateUserImage } from "../../../services/user.services";
import { toast } from "react-toastify";

const TopNavbar = () => {
  const location = useLocation();

  const imageRef = useRef<HTMLInputElement | null>(null);

  function NavHeader(path: string) {
    switch (path) {
      case PageRoutes.HOME:
        return "Dashboard";

      case PageRoutes.CREATE_NEW_COURSE:
        return "Create New Course";

      case PageRoutes.MY_COURSE:
        return "My Course";

      case PageRoutes.MESSAGE:
        return "Message";

      case PageRoutes.EARNING:
        return "Earning";

      case PageRoutes.SETTING:
        return "Setting";

      default:
        break;
    }
  }

  const { user } = UseAuth();
  console.log("user in topnavbar : ", user);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) throw new Error("No media file found");

      await toast.promise(
        async () => {
          if (!user) throw new Error("User not authenticated");
          const imgUrl = await ImageUpload(file);
          await UpdateUserImage(imgUrl);
        },
        {
          pending: "Updating user profile image...",
          success: "Profile image updated ",
          error: "Profile image update failed",
        }
      );
    } catch (error) {
      console.error("Error in user profile image update: ", error);
    }
  };

  const handleInputTrigger = () => {
    imageRef.current?.click();
  };

  return (
    <nav className="fixed top-0 z-1 w-full bg-white py-[clamp(0.5rem,3vw,1.25rem)] px-[clamp(1rem,4vw,2rem)] ">
      <div className="max-w-330 w-full mx-auto h-fit flex justify-between items-center -translate-x-[11%]">
        <div className="flex flex-col gap-1.5">
          <span className="text-gray-600 body-md-500">Good Morning</span>
          <span className="body-xxl-600 text-gray-900">
            {NavHeader(location.pathname)}
          </span>
        </div>
        <div className="flex flex-row gap-5 max-h-12 h-full w-fit">
          <div className="flex items-center bg-gray-50 px-4 py-3 gap-3 focus-within:ring-1 ring-gray-200 w-78 ">
            <MagnifyingGlassIcon size={24} />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-0 body-lg-400"
            />
          </div>

          <div className="body-lg-400 size-12 aspect-square flex items-center justify-center bg-gray-50">
            <BellIcon size={24} />
          </div>

          <div className="relative max-w-12 w-full h-12 aspect-square rounded-full overflow-hidden">
            <img
              src={user?.user_metadata?.avatar_url}
              className="w-full h-full object-cover object-center"
            />
            <button
              onClick={handleInputTrigger}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center hover:bg-gray-800/50 cursor-pointer group transform-all ease-in-out duration-200"
            >
              <PenIcon
                size={24}
                className="text-white opacity-0 group-hover:opacity-100 transform-all ease-in-out duration-200"
              />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
