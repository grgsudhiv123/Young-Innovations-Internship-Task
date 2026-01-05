import { goToStep } from "../../../features/multistepFormReducer";
import { useAppDispatch } from "../../../hooks/multistepFormHook";
import CustomButton from "../../ui/button";

const ActiveFormHeading = ({ ActiveFormStep }: { ActiveFormStep: string }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(goToStep(2));
  };
  return (
    <div className="py-6 px-10 flex flex-row justify-between border-b border-gray-200">
      <h4 className="text-heading-4 text-gray-900 ">{ActiveFormStep}</h4>

      <div className="flex gap-3">
        <CustomButton
          variant="light-primary"
          size="base"
          className=""
          onClick={handleSubmit}
        >
          <span>Save</span>
        </CustomButton>
        <CustomButton variant="tertiary-primary" size="base" className="">
          <span>Save & Preview</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default ActiveFormHeading;
