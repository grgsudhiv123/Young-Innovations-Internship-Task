import { useFormContext } from "react-hook-form";
import FormButtons from "../../common/tab/formButtons";
import SortableFields from "./sortableComponents/sortableFields";

const CurriculumForm = ({ setStep }: { setStep: (step: number) => void }) => {
  const { trigger, getValues } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger();
    console.log("curriculum form values : ", getValues("curriculum"));
    if (isValid) {
      console.log("Form values", getValues("curriculum"));
      setStep(3);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  return (
    <>
      <div className="w-full h-auto px-10 py-8 ">
        <SortableFields />
      </div>
      <div className="px-10">
        <FormButtons
          handleNextBtn={handleNext}
          handlePreviosBtn={handlePrevious}
          prevButtonLabel="Previous"
        />
      </div>
    </>
  );
};

export default CurriculumForm;
