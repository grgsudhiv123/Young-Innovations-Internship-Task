import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListIcon, PencilLineIcon, TrashIcon } from "@phosphor-icons/react";
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
import { useState } from "react";

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

  const { register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");

  return (
    <div
      ref={setNodeRef}
      className="section bg-white flex w-full flex-row justify-between p-5"
      {...attributes}
      style={style}
    >
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
            {...register(inputFieldName)}
            placeholder="Lecture name"
            className="body-md-400 text-gray-900"
          />
        </span>
      </div>
      <div className="flex items-center gap-4">
        {/* <select className="cursor-pointer px-4 body-md-500">
          <option selected disabled hidden>
            Contents
          </option>
          {Object.values(CurriculumContents).map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select> */}
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
      <InputModels
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedContent={selectedContent as ModelNameKey}
      />
    </div>
  );
};

export default SortableLetureItem;
