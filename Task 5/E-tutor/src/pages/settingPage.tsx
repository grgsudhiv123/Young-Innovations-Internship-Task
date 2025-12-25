import { useState } from "react";
import { CustomDialog } from "../components/ui/customDialog";

const SettingPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button className="p-5 border " onClick={() => setIsOpen(true)}>
        Open model
      </button>
      <CustomDialog isOpen={isOpen} isClose={() => setIsOpen(false)}>
        <img
          src="../assets/react.svg"
          alt=""
          className="size-10 object-cover"
        />
      </CustomDialog>
    </div>
  );
};

export default SettingPage;
