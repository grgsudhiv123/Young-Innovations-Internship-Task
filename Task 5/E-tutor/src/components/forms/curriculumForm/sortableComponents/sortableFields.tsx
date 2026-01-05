import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";

import SortableSectionItem from "./sortableSelectionItem";
import { useFieldArray, useFormContext } from "react-hook-form";
import CustomButton from "../../../ui/button";

const defaultCurriculumField = {
  sectionName: "",
};

const SortableFields = () => {
  const { control } = useFormContext();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "curriculum",
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    move(oldIndex, newIndex);
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="w-full h-auto space-y-6">
            {fields.length !== 0 ? (
              fields.map((item, index) => {
                return (
                  <SortableSectionItem
                    id={item.id}
                    key={item.id}
                    onRemove={() => remove(index)}
                    sectionindex={index}
                  ></SortableSectionItem>
                );
              })
            ) : (
              <div className="w-full p-10 text-center bg-gray-50">
                <p className="body-lg-400 text-gray-700">No input fields </p>
                {}
              </div>
            )}
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
