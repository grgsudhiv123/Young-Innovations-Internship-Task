import CustomButton from "../../ui/button";

type FormButtonsType = {
  handlePreviosBtn: () => void;
  handleNextBtn: () => void;
  prevButtonLabel: string;
};
const FormButtons = ({
  handlePreviosBtn,
  handleNextBtn,
  prevButtonLabel,
}: FormButtonsType) => {
  return (
    <div className="mt-8 w-full flex justify-between">
      <CustomButton
        type="button"
        size="lg"
        variant="tertiary-gray"
        className="border border-gray-200 "
        onClick={handlePreviosBtn}
      >
        <span>{prevButtonLabel}</span>
      </CustomButton>
      <CustomButton type="submit" size="lg" onClick={handleNextBtn}>
        <span>Save & Next</span>
      </CustomButton>
    </div>
  );
};

export default FormButtons;
