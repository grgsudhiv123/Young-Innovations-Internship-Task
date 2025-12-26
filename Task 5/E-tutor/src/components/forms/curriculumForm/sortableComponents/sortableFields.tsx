import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useState } from "react";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";

import SortableSectionItem from "./sortableSelectionItem";
import { useFieldArray, useFormContext } from "react-hook-form";
import CustomButton from "../../../ui/button";

const defaultCurriculumField = {
  sectionName: "",
};

const SortableFields = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "curriculum",
  });

  console.log("fields : ", fields);

  const [sections, setSections] = useState<
    { id: UniqueIdentifier; lectures: UniqueIdentifier[] }[]
  >([
    {
      id: "1",
      lectures: ["1-a", "1-b", "1-c"],
    },
    {
      id: "2",
      lectures: ["2-a", "2-b", "2-c"],
    },
    {
      id: "3",
      lectures: ["3-a", "3-b", "3-c"],
    },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log("active : ", active);

    console.log("over : ", over);
    if (!active || !over) return;

    if (active.id !== over.id) {
      if (!active.id.toString().includes("-")) {
        setSections((sections) => {
          const oldIndex = sections.findIndex(
            (section) => section.id === active.id
          );
          const newIndex = sections.findIndex(
            (section) => section.id === over.id
          );

          return arrayMove(sections, oldIndex, newIndex);
        });
      } else {
        const sectionId = active.id.toString().split("-")[0];
        setSections((sections) =>
          sections.map((section) => {
            if (section.id !== sectionId) return section;

            const oldIndex = section.lectures.indexOf(active.id);
            const newIndex = section.lectures.indexOf(over.id);

            return {
              ...section,
              lectures: arrayMove(section.lectures, oldIndex, newIndex),
            };
          })
        );
      }
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="w-full h-auto space-y-6">
            {fields &&
              fields.map((item, index) => {
                return (
                  <SortableSectionItem
                    id={item.id}
                    key={item.id}
                    onRemove={() => remove(index)}
                    index={index}
                  ></SortableSectionItem>
                );
              })}
          </div>
        </SortableContext>
      </DndContext>

      <CustomButton
        variant="light-primary"
        className="w-full mt-8"
        size="base"
        onClick={() => append(defaultCurriculumField)}
      >
        <span>Add Sections</span>
      </CustomButton>
    </>
  );
};
export default SortableFields;
