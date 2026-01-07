import CustomButton from "../../ui/button";

const ActiveFormHeading = ({
  ActiveFormStep,
  handleSave,
}: {
  ActiveFormStep: string;
  handleSave: () => void;
}) => {
  return (
    <div className="py-6 px-10 flex flex-row justify-between border-b border-gray-200">
      <h4 className="text-heading-4 text-gray-900 ">{ActiveFormStep}</h4>

      <div className="flex gap-3">
        <CustomButton
          variant="light-primary"
          size="base"
          className=""
          onClick={handleSave}
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
