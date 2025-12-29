import { Controller } from "react-hook-form";
import CustomFormField from "../../../../ui/customInput";

const SectionNameInput = () => {
  return (
    <Controller
      name="section_name"
      render={({ fields }) => {
        return (
          <CustomFormField
            label="Section"
            placeholder="Write your section name here.."
          />
        );
      }}
    />
  );
};

export default SectionNameInput;
