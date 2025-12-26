import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListIcon, PencilLineIcon, TrashIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import {
  Select,
  SelectContents,
  SelectItem,
  SelectTrigger,
} from "../../../ui/customSelect";
import { CurriculumContents } from "../../../../utils/constants/curriculumContentsConstants";

const SortableLetureItem = ({
  id,

  onLectureRemove,
}: {
  id: string | number;
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
            <ListIcon size={24} />
          </button>
          <span className="body-lg-400">Section name : {id}</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Select>
          <SelectTrigger placeholder="Contents" />
          <SelectContents>
            {Object.values(CurriculumContents).map((item, i) => {
              return (
                <SelectItem key={i} newvalue={item}>
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
  );
};

export default SortableLetureItem;
