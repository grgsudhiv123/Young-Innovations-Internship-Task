import AdvanceInfoForm from "../../forms/advanceInfoForm/advanceInfo";
import BasicInfoForm from "../../forms/basicInformation";
import CurriculumForm from "../../forms/curriculumForm/curriculum";
import PublicCourseForm from "../../forms/publicCourse";
type ActiveTabContentTypes = {
  step: number;
  // setStep: (step: number) => void;
};
const ActiveTabContents = ({ step }: ActiveTabContentTypes) => {
  return (
    <>
      {step === 0 && <BasicInfoForm />}
      {step === 1 && <AdvanceInfoForm />}
      {step === 2 && <CurriculumForm />}
      {step === 3 && <PublicCourseForm />}
    </>
  );
};

export default ActiveTabContents;
