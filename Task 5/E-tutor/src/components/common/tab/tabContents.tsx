import AdvanceInfoForm from "../../forms/advanceInfo";
import BasicInfoForm from "../../forms/basicInformation";
import CurriculumForm from "../../forms/curriculum";
import PublicCourseForm from "../../forms/publicCourse";

const ActiveTabContents = ({ step }: { step: number }) => {
  switch (step) {
    case 0:
      return <BasicInfoForm />;

    case 1:
      return <AdvanceInfoForm />;

    case 2:
      return <CurriculumForm />;

    case 3:
      return <PublicCourseForm />;

    default:
      return <BasicInfoForm />;
  }
};

export default ActiveTabContents;
