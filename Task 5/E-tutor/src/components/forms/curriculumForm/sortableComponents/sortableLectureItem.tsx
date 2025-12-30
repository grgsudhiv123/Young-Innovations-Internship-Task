import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  BookIcon,
  ListIcon,
  PencilLineIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";

import { CurriculumContents } from "../../../../utils/constants/curriculumContentsConstants";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContents,
  SelectItem,
  SelectTrigger,
} from "../../../ui/customSelect";
import InputModels, { type ModelNameKey } from "./inputModels";
import { useMemo, useState } from "react";

const SortableLetureItem = ({
  id,
  inputFieldName,
  onLectureRemove,
}: {
  id: string | number;
  inputFieldName: string;
  onLectureRemove: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { register, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const isLectureContent = watch(`${inputFieldName}.lectureContent`);

  console.log("isLectureContent  : ", isLectureContent);

  const lectureContents = useMemo(() => {
    if (!isLectureContent) return;

    const contents = {
      [CurriculumContents.VIDEO]: isLectureContent.videoUrl,
      [CurriculumContents.ATTACH_FILE]: isLectureContent.lecture_file,
      [CurriculumContents.CAPTIONS]: isLectureContent.caption,
      [CurriculumContents.DESCRIPTION]: isLectureContent.description,
      [CurriculumContents.LECTURE_NOTES]: isLectureContent.lecture_notes,
    };

    return contents;
  }, [isLectureContent]);

  return (
    <div
      ref={setNodeRef}
      className="section bg-white flex w-full flex-col justify-between p-5"
      {...attributes}
      style={style}
    >
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row gap-3">
          <span className="flex flex-row gap-2 items-center">
            <button
              type="button"
              {...listeners}
              className={clsx(isDragging ? "cursor-grabbing" : "cursor-grab")}
            >
              <ListIcon size={20} className="text-gray-500" />
            </button>
            <input
              type="text"
              {...register(`${inputFieldName}.lectureName`)}
              placeholder="Lecture name"
              className="body-md-400 text-gray-900"
            />
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger
              placeholder="Contents"
              className="px-4 py-0"
              textStyle="text-primary-500 font-semibold "
              chevronStyle="text-primary-500 font-semibold"
            />
            <SelectContents className="translate-y-[105%] mt-2 max-w-45 w-full">
              {Object.values(CurriculumContents).map((item, i) => {
                return (
                  <SelectItem
                    key={i}
                    newvalue={item}
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedContent(item);
                    }}
                  >
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContents>
          </Select>
          <button type="button" className="cursor-pointer">
            <PencilLineIcon
              size={24}
              className="text-gray-500 hover:text-primary-500 transition-all ease-in-out duration-200"
            />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={onLectureRemove}
          >
            <TrashIcon
              size={24}
              className="text-gray-500 hover:text-primary-500 transition-all ease-in-out duration-200"
            />
          </button>
        </div>
      </div>
      <InputModels
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedContent={selectedContent as ModelNameKey}
        baseName={`${inputFieldName}.lectureContent`}
      />
      {lectureContents && (
        <div className="grid grid-cols-12 gap-4 p-5 ">
          {lectureContents?.[CurriculumContents.VIDEO] && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setSelectedContent(CurriculumContents.VIDEO);
              }}
              className="w-full flex flex-row gap-3.5 col-span-6 border border-gray-100 p-2 hover:bg-gray-50 cursor-pointer transform-all ease-in-out duration-200"
            >
              <div className="max-h-20 h-full max-w-32 w-full aspect-video">
                <video className="h-full w-full" controls>
                  <source
                    src={lectureContents?.[CurriculumContents.VIDEO]?.url}
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="w-full">
                <p className="flex flex-row gap-1.5 text-gray-700 items-center">
                  <span className="uppercase text-success-500 font-medium text-xs leading-3">
                    FILE UPLOADED
                  </span>
                  <span className="text-[10px] font-normal leading-2.5">.</span>
                  <span className="text-xs leading-4 font-normal">
                    {lectureContents?.[CurriculumContents.VIDEO]?.duration}
                  </span>
                </p>
                <p className="body-md-400 text-gray-900 capitalize line-clamp-2 text-start">
                  {lectureContents?.[CurriculumContents.VIDEO]?.name}
                </p>
              </div>
            </button>
          )}

          {lectureContents?.[CurriculumContents.DESCRIPTION] && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setSelectedContent(CurriculumContents.DESCRIPTION);
              }}
              className="w-full flex flex-col gap-1 items-start justify-start col-span-6 border border-gray-100 p-2 hover:bg-gray-50 cursor-pointer transform-all ease-in-out duration-200"
            >
              <p className="body-lg-500">Description</p>
              <p className="body-md-400 text-gray-700 line-clamp-2 text-justify">
                {lectureContents?.[CurriculumContents.DESCRIPTION]}
              </p>
            </button>
          )}

          {lectureContents?.[CurriculumContents.CAPTIONS] && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setSelectedContent(CurriculumContents.CAPTIONS);
              }}
              className="w-full flex flex-col gap-1 items-start justify-start col-span-6 border border-gray-100 p-2 hover:bg-gray-50 cursor-pointer transform-all ease-in-out duration-200"
            >
              <p className="body-lg-500">Captions</p>
              <p className="body-md-400 text-gray-700 line-clamp-2 text-justify">
                {lectureContents[CurriculumContents.CAPTIONS]}
              </p>
            </button>
          )}

          {lectureContents?.[CurriculumContents.ATTACH_FILE] && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setSelectedContent(CurriculumContents.ATTACH_FILE);
              }}
              className="w-full flex flex-col gap-1 items-start justify-start col-span-6 border border-gray-100 p-2 hover:bg-gray-50 cursor-pointer transform-all ease-in-out duration-200"
            >
              <p className="body-lg-500">Attached File</p>
              <div className="w-full flex mt-2 gap-2">
                <BookIcon size={24} />
                <a
                  href={lectureContents[
                    CurriculumContents.ATTACH_FILE
                  ].url.replace("blob:", "")}
                  target="_blank"
                  className="body-md-400 text-gray-700 line-clamp-2 text-justify capitalize hover:text-secondary-500"
                >
                  {lectureContents[CurriculumContents.ATTACH_FILE].name}
                </a>
              </div>
            </button>
          )}

          {lectureContents?.[CurriculumContents.ATTACH_FILE] && (
            <div className="w-full flex flex-row gap-3.5 col-span-6 border border-gray-100 p-1 hover:bg-gray-50 cursor-pointer transform-all ease-in-out duration-200"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default SortableLetureItem;
