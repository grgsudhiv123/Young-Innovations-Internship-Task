import AdvanceInfoForm from "../../forms/advanceInfoForm/advanceInfo";
import BasicInfoForm from "../../forms/basicInformation";
import CurriculumForm from "../../forms/curriculum";
import PublicCourseForm from "../../forms/publicCourse";
type ActiveTabContentTypes = {
  step: number;
  setStep: (step: number) => void;
};
const ActiveTabContents = ({ step, setStep }: ActiveTabContentTypes) => {
  switch (step) {
    case 0:
      return <BasicInfoForm setStep={setStep} />;

    case 1:
      return <AdvanceInfoForm setStep={setStep} />;

    case 2:
      return <CurriculumForm />;

    case 3:
      return <PublicCourseForm />;

    default:
      return <BasicInfoForm setStep={setStep} />;
  }
};

export default ActiveTabContents;
