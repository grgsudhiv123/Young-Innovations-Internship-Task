import { useFormContext } from "react-hook-form";
import { CurriculumContents } from "../../../../utils/constants/curriculumContentsConstants";
import { CustomDialog } from "../../../ui/customDialog";
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
  baseName,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedContent: ModelNameKey;
  baseName: string;
}) => {
  const { trigger, reset } = useFormContext();

  const handleSubmit = async () => {
    const isValid = await trigger([`${baseName}`]);
    if (isValid) {
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    reset([`${baseName}`]);
    setIsOpen(false);
  };

  function renderFields(key: ModelNameKey) {
    switch (key) {
      case "Section":
        return <SectionNameInput />;
      case CurriculumContents.VIDEO:
        return (
          <LectureVideoInput
            baseName={baseName}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        );
      case CurriculumContents.ATTACH_FILE:
        return (
          <LectureFiles
            baseName={baseName}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        );
      case CurriculumContents.CAPTIONS:
        return (
          <LectureCaption
            setIsOpen={setIsOpen}
            baseName={baseName}
            handleCancel={handleCancel}
          />
        );
      case CurriculumContents.DESCRIPTION:
        return (
          <LectureDescription
            baseName={baseName}
            setIsOpen={setIsOpen}
            handleCancel={handleCancel}
          />
        );
      case CurriculumContents.LECTURE_NOTES:
        return (
          <LectureNotes
            baseName={baseName}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        );
      default:
        return null;
    }
  }

  return (
    <CustomDialog isOpen={isOpen} isClose={() => setIsOpen(false)}>
      <div className="w-full h-auto bg-white">
        <div className="w-full px-5 py-4 border border-b border-gray-100">
          <p className="body-lg-500 text-base leading-5.5">
            {ModelName(selectedContent)}
          </p>
        </div>
        <div className="w-full px-5.5 py-6 space-y-6">
          {renderFields(selectedContent)}
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
  [CurriculumContents.CAPTIONS]: "Add Lecture Caption",
  [CurriculumContents.DESCRIPTION]: "Add Lecture Description",
  [CurriculumContents.LECTURE_NOTES]: "Add Lecture Notes",
} as const;

export type ModelNameKey = keyof typeof modelNameMap;

function ModelName(key: ModelNameKey) {
  return modelNameMap[key];
}
