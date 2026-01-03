import {
  Select,
  SelectContents,
  SelectItem,
  SelectTrigger,
} from "../ui/customSelect";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  COURSE_CATEGORIES,
  COURSE_LANGUAGE,
  COURSE_LEVEL,
  COURSE_SUB_CATEGORIES,
  SUBTITLE_LANGUAGE,
  type COURSE_LANGUAGE_TYPE,
  type COURSE_LEVEL_TYPE,
  type SUBTITLE_LANGUAGE_TYPE,
} from "../../utils/constants/basicInfoConstants";
import CustomFormField from "../ui/customInput";
import CustomInputDateSelector from "../ui/customInputDateSelector";
import { useEffect } from "react";
import FormButtons from "../common/tab/formButtons";
import { type BasicInfoFormType } from "../../schemas/formSchema";

const BasicInfoForm = ({ setStep }: { setStep: (step: number) => void }) => {
  const defaultValues = {
    title: "",
    subtitle: "",
    coursetopic: "",
    courseCategory: "",
    courseSubCategory: "",
    subtitleLanguage: "",
    courseLanguage: "",
    courseLevel: "",
    durations: "",
  };
  const { reset, control, setValue, trigger, watch } =
    useFormContext<BasicInfoFormType>();

  const courseCategoryWatch = useWatch({
    control: control,
    name: "courseCategory",
  });

  const availableSubCategories =
    COURSE_SUB_CATEGORIES[
      courseCategoryWatch as keyof typeof COURSE_SUB_CATEGORIES
    ] || [];

  const nextStep = async () => {
    const isValid = await trigger();

    if (isValid) {
      setStep(1);
    }
  };

  const courseCategory = useWatch({
    name: "courseCategory",
    control,
  });
  useEffect(() => {
    setValue("courseSubCategory", "");
  }, [courseCategory, setValue]);

  const handleReset = () => reset(defaultValues);

  return (
    <div className="w-full h-auto px-10 py-8 ">
      <div className="w-full h-auto space-y-6">
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => {
            const watchValue = watch("title");
            return (
              <CustomFormField
                label="Title"
                placeholder="Your course title"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error && fieldState.error.message}
                maxLength={80}
                watchValue={watchValue}
              />
            );
          }}
        />

        <Controller
          name="subtitle"
          control={control}
          render={({ field, fieldState }) => {
            const watchValue = watch("subtitle");
            return (
              <CustomFormField
                label="subtitle"
                placeholder="Your course subtitle"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error && fieldState.error.message}
                maxLength={80}
                watchValue={watchValue}
              />
            );
          }}
        />

        <div className="w-full grid grid-cols-12 gap-6">
          <Controller
            name="courseCategory"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                error={fieldState.error && fieldState.error.message}
                value={field.value}
                onValueChange={field.onChange}
                label="Course Category"
                className="grid col-span-12 lg:col-span-6"
              >
                <SelectTrigger placeholder="Select option" />
                <SelectContents className="translate-y-full w-full">
                  {COURSE_CATEGORIES.map((item: string, i: number) => {
                    return (
                      <SelectItem newvalue={item} key={i}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectContents>
              </Select>
            )}
          />
          <Controller
            name="courseSubCategory"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Select
                  error={fieldState.error && fieldState.error.message}
                  value={field.value}
                  onValueChange={field.onChange}
                  label="Course Sub-category"
                  className="grid col-span-12 lg:col-span-6"
                >
                  <SelectTrigger
                    placeholder="Select option"
                    disabled={availableSubCategories.length > 0 ? false : true}
                  />
                  <SelectContents className="translate-y-full w-full">
                    {availableSubCategories &&
                      availableSubCategories.map((item: string, i: number) => {
                        return (
                          <SelectItem newvalue={item} key={i}>
                            {item}
                          </SelectItem>
                        );
                      })}
                  </SelectContents>
                </Select>
              );
            }}
          />
        </div>

        <Controller
          name="coursetopic"
          control={control}
          render={({ field, fieldState }) => {
            const watchValue = watch("coursetopic");
            return (
              <CustomFormField
                label="coursetopic"
                placeholder="Your course coursetopic"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error && fieldState.error.message}
                maxLength={80}
                watchValue={watchValue}
              />
            );
          }}
        />
        <div className="w-full grid grid-cols-12 gap-6">
          <Controller
            name="courseLanguage"
            control={control}
            rules={{ required: "Select the field" }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  error={fieldState.error && fieldState.error.message}
                  value={field.value}
                  onValueChange={field.onChange}
                  label="Course Language"
                  className="grid col-span-12 md:col-span-6 lg:col-span-3"
                >
                  <SelectTrigger placeholder="Select option" />
                  <SelectContents className="translate-y-full w-full">
                    {COURSE_LANGUAGE.map((item: COURSE_LANGUAGE_TYPE, i) => {
                      return (
                        <SelectItem newvalue={item} key={i}>
                          {item}
                        </SelectItem>
                      );
                    })}
                  </SelectContents>
                </Select>
              </>
            )}
          />
          <Controller
            control={control}
            name="subtitleLanguage"
            render={({ field, fieldState }) => (
              <Select
                error={fieldState.error && fieldState.error.message}
                value={field.value}
                onValueChange={field.onChange}
                label="Subtitle Language"
                className="grid col-span-12 md:col-span-6 lg:col-span-3"
              >
                <SelectTrigger placeholder="Select option" />
                <SelectContents className="translate-y-full w-full">
                  {SUBTITLE_LANGUAGE.map(
                    (item: SUBTITLE_LANGUAGE_TYPE, i: number) => {
                      return (
                        <SelectItem newvalue={item} key={i}>
                          {item}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectContents>
              </Select>
            )}
          />
          <Controller
            name="courseLevel"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                error={fieldState.error && fieldState.error.message}
                value={field.value}
                onValueChange={field.onChange}
                label="Course Level"
                className="grid col-span-12 md:col-span-6 lg:col-span-3"
              >
                <SelectTrigger placeholder="Select option" />
                <SelectContents className="translate-y-full w-full">
                  {COURSE_LEVEL.map((item: COURSE_LEVEL_TYPE, i: number) => {
                    return (
                      <SelectItem newvalue={item} key={i}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectContents>
              </Select>
            )}
          />
          <Controller
            control={control}
            name="durations"
            render={({ field, fieldState }) => {
              return (
                <CustomInputDateSelector
                  label="Durations"
                  placeholder="Course Durations"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error && fieldState.error.message}
                  type="number"
                  className="grid col-span-12 md:col-span-6 lg:col-span-3"
                />
              );
            }}
          />
        </div>
      </div>

      <FormButtons
        handlePreviosBtn={handleReset}
        handleNextBtn={nextStep}
        prevButtonLabel="Cancel"
      />
    </div>
  );
};

export default BasicInfoForm;
