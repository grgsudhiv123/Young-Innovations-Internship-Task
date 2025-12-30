import { Controller, useFormContext } from "react-hook-form";
import CustomFormField from "../../../../ui/customInput";

const SectionNameInput = () => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="section_name"
      render={({ field }) => {
        return (
          <CustomFormField
            label="Section"
            placeholder="Write your section name here.."
            onChange={field.onChange}
            value={field.value}
          />
        );
      }}
    />
  );
};

export default SectionNameInput;
