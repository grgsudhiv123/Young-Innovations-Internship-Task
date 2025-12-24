import { PlusIcon } from "@phosphor-icons/react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import CustomFormField from "../../ui/customInput";

const MAX_ARRAY_LENGTH = 7;

const ArrayInputFields = ({
  title,
  fieldName,
  placeholder,
}: {
  title: string;
  fieldName: string;
  placeholder: string;
}) => {
  const { control, watch } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: fieldName,
    rules: { minLength: 4, maxLength: 8 },
  });

  console.log("fields : ", fields);
  return (
    <div className="w-full py-8 px-10 border-b border-gray-100 space-y-6">
      <div className="flex w-full justify-between">
        <p className="body-xl-500">
          {title}
          <span className="">
            ({fields.length}/{MAX_ARRAY_LENGTH + 1})
          </span>
        </p>
        <button
          onClick={() => {
            if (fields.length <= MAX_ARRAY_LENGTH) {
              append({ value: "" });
            }
          }}
          type="button"
          className="bg-white text-primary-500 flex items-center gap-0.5 cursor-pointer hover:bg-primary-100 p-1 transition-all duration-150 ease-in-out"
        >
          <PlusIcon size={16} />
          <span className="body-md-500">Add new</span>
        </button>
      </div>

      {fields.map((item, index) => {
        return (
          <div className="relative" key={item.id}>
            <Controller
              control={control}
              name={`${fieldName}.${index}.value`}
              render={({ field, fieldState }) => {
                const watchValue = watch(`${fieldName}.${index}.value`);
                return (
                  <>
                    <CustomFormField
                      label={`0${index + 1}`}
                      maxLength={120}
                      onChange={field.onChange}
                      value={field.value}
                      watchValue={watchValue}
                      placeholder={placeholder}
                    />
                    <span className="absolute bottom-0 translate-y-[110%] body-sm-400 text-primary-500">
                      {fieldState.error && fieldState.error.message}
                    </span>
                  </>
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ArrayInputFields;
