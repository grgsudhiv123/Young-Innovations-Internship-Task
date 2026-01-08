import {
  FormConstants,
  type FormConstantsType,
} from "../../../utils/constants/multiStepFormConstants";
import { CustomDialog } from "../../ui/customDialog";
import AdvanceFormModel from "./advanceFormModel";
import BasicInfoModel from "./basicInfoModel";
import CurriculumModel from "./curriculumodel";
import PublishCourseModel from "./publishCourseModel";

const FieldsModel = ({
  isOpen,
  setIsOpen,
  selectedContent,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedContent: FormConstantsType;
}) => {
  function renderFields(key: FormConstantsType) {
    switch (key) {
      case FormConstants.BASIC_INFORMATION:
        return <BasicInfoModel />;

      case FormConstants.ADVANCE_INFORMATION:
        return <AdvanceFormModel />;

      case FormConstants.CURRICULUM:
        return <CurriculumModel />;

      case FormConstants.PUBLISH_COURSE:
        return <PublishCourseModel />;
      default:
        return null;
    }
  }
  return (
    <CustomDialog isOpen={isOpen} isClose={() => setIsOpen(false)}>
      <div className="w-full max-w-220 max-h-[80vh] bg-white rounded-2xl overflow-y-scroll overflow-x-hidden">
        <div className="w-full px-5 py-4 border border-b border-gray-100">
          <p className="body-lg-500 text-base leading-5.5 capitalize">
            {selectedContent}
          </p>
        </div>
        <div className="w-full px-5.5 py-6 space-y-6">
          {renderFields(selectedContent)}
        </div>
      </div>
    </CustomDialog>
  );
};

export default FieldsModel;
