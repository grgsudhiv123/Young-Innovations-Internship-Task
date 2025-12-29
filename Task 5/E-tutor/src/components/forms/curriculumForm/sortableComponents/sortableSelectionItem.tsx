import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ListIcon,
  PencilLineIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { useFieldArray, useFormContext } from "react-hook-form";
import SortableLetureItem from "./sortableLectureItem";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";

const defaultLecture = {
  lectureName: "",
  lectureContent: {
    videoUrl: "",
    file: undefined,
    caption: "",
    description: "",
    lecture_notes: "",
  },
};

const SortableSectionItem = ({
  id,
  onRemove,
  sectionindex,
}: {
  id: string | number;
  onRemove: () => void;
  sectionindex: number;
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

  const { control, register } = useFormContext();

  const {
    fields: lectureFields,
    append: appendLecture,
    remove: removeLecture,
    move: moveLecture,
  } = useFieldArray({
    control,
    name: `curriculum.${sectionindex}.lectures`,
  });

  const handleLectureDrag = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log("active : ", active);
    console.log("over : ", over);

    if (!active || !over || active.id === over.id) return;

    const oldIndex = lectureFields.findIndex((f) => f.id === active.id);
    const newIndex = lectureFields.findIndex((f) => f.id === over.id);
    moveLecture(oldIndex, newIndex);
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style} className="bg-gray-50">
      <div className="section flex w-full flex-row justify-between  p-6">
        <div className="flex flex-row gap-3">
          <span className="flex flex-row gap-2 items-center">
            <button
              type="button"
              {...listeners}
              className={clsx(isDragging ? "cursor-grabbing" : "cursor-grab")}
            >
              <ListIcon size={24} />
            </button>
            <span className="body-lg-500 text-gray-900">
              Sections {ZeroBefore(sectionindex + 1)}:
            </span>
          </span>
          <input
            type="text"
            className="outline-none body-lg-400"
            placeholder="Section name"
            {...register(`curriculum.${sectionindex}.sectionName`)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => appendLecture(defaultLecture)}
          >
            <PlusIcon
              size={24}
              className="text-gray-500 hover:text-primary-500 transition-all ease-in-out duration-200"
            />
          </button>
          <button type="button" className="cursor-pointer">
            <PencilLineIcon
              size={24}
              className="text-gray-500 hover:text-primary-500 transition-all ease-in-out duration-200"
            />
          </button>
          <button type="button" className="cursor-pointer" onClick={onRemove}>
            <TrashIcon
              size={24}
              className="text-gray-500 hover:text-primary-500 transition-all ease-in-out duration-200"
            />
          </button>
        </div>
      </div>

      <div className="w-full px-6 pb-6 space-y-4">
        <DndContext
          onDragEnd={handleLectureDrag}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={lectureFields.map((lecture) => lecture.id)}
            strategy={verticalListSortingStrategy}
          >
            {lectureFields &&
              lectureFields.map((lecture, index) => {
                return (
                  <SortableLetureItem
                    inputFieldName={`curriculum.${sectionindex}.lectures.${index}.lectureName`}
                    onLectureRemove={() => removeLecture(index)}
                    id={lecture.id}
                    key={lecture.id}
                  ></SortableLetureItem>
                );
              })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
export default SortableSectionItem;

function ZeroBefore(number: number) {
  const isSingleDigit = number.toString().length <= 1;
  return isSingleDigit ? `0${number}` : `${number}`;
}
