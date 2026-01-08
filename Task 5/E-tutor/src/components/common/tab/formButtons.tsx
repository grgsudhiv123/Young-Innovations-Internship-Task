import CustomButton from "../../ui/button";

type FormButtonsType = {
  handlePreviosBtn: () => void;
  handleNextBtn: () => void;
  prevButtonLabel: string;
  nextButtonLabel: string;
};
const FormButtons = ({
  handlePreviosBtn,
  handleNextBtn,
  prevButtonLabel,
  nextButtonLabel,
}: FormButtonsType) => {
  return (
    <div className="mt-8 w-full flex justify-between px-10">
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
        <span>{nextButtonLabel}</span>
      </CustomButton>
    </div>
  );
};

export default FormButtons;
