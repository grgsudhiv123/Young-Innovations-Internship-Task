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
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import SortableLetureItem from "./sortableLectureItem";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";

const defaultLecture = () => ({
  lectureName: "",
  lectureContent: {},
});

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

  const { control } = useFormContext();

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

    if (!active || !over || active.id === over.id) return;

    const oldIndex = lectureFields.findIndex((f) => f.id === active.id);
    const newIndex = lectureFields.findIndex((f) => f.id === over.id);
    moveLecture(oldIndex, newIndex);
  };

  return (
    <Controller
      control={control}
      name={`curriculum.${sectionindex}.sectionName`}
      render={({ field, fieldState }) => {
        const isError = fieldState.error;

        return (
          <div ref={setNodeRef} style={style} className="bg-gray-50">
            <div
              className={clsx(
                "section flex w-full flex-row justify-between p-6",
                isError ? "bg-primary-50" : ""
              )}
            >
              <div className="w-1/3 flex flex-row gap-3">
                <span className="flex flex-row gap-2 items-center">
                  <button
                    type="button"
                    {...listeners}
                    {...attributes}
                    className={clsx(
                      isDragging ? "cursor-grabbing" : "cursor-grab"
                    )}
                  >
                    <ListIcon size={24} />
                  </button>
                  <span className="body-lg-500 text-gray-900 whitespace-nowrap">
                    Sections {ZeroBefore(sectionindex + 1)}:
                  </span>
                </span>

                <div className="relative w-full">
                  <input
                    type="text"
                    className={clsx(
                      "outline-none body-lg-400 p-1 w-full border-b border-transparent",
                      isError
                        ? "focus-within:border-primary-500 bg-primary-100"
                        : "focus-within:border-gray-200"
                    )}
                    placeholder="Section name"
                    value={field.value}
                    onChange={field.onChange}
                  />

                  {isError && (
                    <span className="absolute bottom-0 left-0 translate-y-full text-primary-500 text-xs">
                      {isError.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => appendLecture(defaultLecture())}
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
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={onRemove}
                >
                  <TrashIcon
                    size={24}
                    className="text-gray-500 hover:text-primary-500 transition-all ease-in-out duration-200"
                  />
                </button>
              </div>
            </div>

            <div
              className={clsx(
                "w-full px-6 pb-6 space-y-4",
                isError ? "bg-primary-50" : ""
              )}
            >
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
                          inputFieldName={`curriculum.${sectionindex}.lectures.${index}`}
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
      }}
    />
  );
};
export default SortableSectionItem;

export function ZeroBefore(number: number) {
  const isSingleDigit = number.toString().length <= 1;
  if (number === 0) {
    return "0";
  } else {
    return isSingleDigit ? `0${number}` : `${number}`;
  }
}
