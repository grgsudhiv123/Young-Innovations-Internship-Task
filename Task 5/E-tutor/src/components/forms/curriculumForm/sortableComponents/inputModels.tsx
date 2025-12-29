import { CurriculumContents } from "../../../../utils/constants/curriculumContentsConstants";
import CustomButton from "../../../ui/button";
import { CustomDialog } from "../../../ui/customDialog";
import CustomFormField from "../../../ui/customInput";
import LectureCaption from "./contentsInput/lectureCaption";
import LectureDescription from "./contentsInput/lectureDescription";
import LectureFiles from "./contentsInput/lectureFiles";
import LectureNotes from "./contentsInput/lectureNotes";
import LectureVideoInput from "./contentsInput/lectureVideoInput";
import SectionNameInput from "./contentsInput/sectionNameInput";

const InputModels = ({
  isOpen,
  setIsOpen,
  selectedContent,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedContent: ModelNameKey;
}) => {
  console.log("selectedContent : ", selectedContent);

  function renderFields(key: ModelNameKey) {
    switch (key) {
      case "Section":
        return <SectionNameInput />;

      case CurriculumContents.VIDEO:
        return <LectureVideoInput />;

      case CurriculumContents.ATTACH_FILE:
        return <LectureFiles />;

      case CurriculumContents.CAPTINOS:
        return <LectureCaption />;

      case CurriculumContents.DESCRIPTION:
        return <LectureDescription />;

      case CurriculumContents.LECTURE_NOTES:
        return <LectureNotes />;

      default:
        return null;
    }
  }

  return (
    <CustomDialog isOpen={isOpen} isClose={() => setIsOpen(false)}>
      <div className="w-2xl h-auto bg-white">
        <div className="w-full px-5 py-4 border border-b border-gray-100">
          <p className="body-lg-500 text-base leading-5.5">
            {ModelName(selectedContent)}
          </p>
        </div>
        <div className="w-full px-5.5 py-6 space-y-6">
          {renderFields(selectedContent)}
          <div className="w-full flex justify-between">
            <CustomButton
              className="bg-gray-50"
              variant="tertiary-gray"
              onClick={() => setIsOpen(false)}
            >
              <span>Cancel</span>
            </CustomButton>
            <CustomButton>
              <span>Save changes</span>
            </CustomButton>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default InputModels;

const modelNameMap = {
  Section: "Edit Section Name",
  [CurriculumContents.VIDEO]: "Lecture Video",
  [CurriculumContents.ATTACH_FILE]: "Attach File",
  [CurriculumContents.CAPTINOS]: "Add Lecture Caption",
  [CurriculumContents.DESCRIPTION]: "Add Lecture Description",
  [CurriculumContents.LECTURE_NOTES]: "Add Lecture Notes",
} as const;

export type ModelNameKey = keyof typeof modelNameMap;

function ModelName(key: ModelNameKey) {
  return modelNameMap[key];
}
