import CustomButton from "../ui/button";
import {
  Select,
  SelectContents,
  SelectItem,
  SelectTrigger,
} from "../ui/customSelect";
import { Controller, useForm } from "react-hook-form";
import {
  BasicInfoSchema,
  type BasicInfoFormType,
} from "../../schemas/basicInfoFormSchems";
import { zodResolver } from "@hookform/resolvers/zod";
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

const BasicInfoForm = () => {
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

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<BasicInfoFormType>({
    defaultValues: defaultValues,
    resolver: zodResolver(BasicInfoSchema),
  });

  const onSubmit = (data: BasicInfoFormType) => {
    console.log("formData : ", data);
  };

  const courseCategoryWatch = watch("courseCategory");
  // const courseSubCategoryWatch = watch("courseSubCategory");
  const availableSubCategories =
    COURSE_SUB_CATEGORIES[
      courseCategoryWatch as keyof typeof COURSE_SUB_CATEGORIES
    ] || [];

  const categoryChange = (changedValue: string) => {
    const entry = Object.entries(COURSE_SUB_CATEGORIES).find(
      ([mainkey, subArray]) => {
        if (changedValue === mainkey) {
          // console.log("subarray : ", subArray);
        }
      }
    );
    return entry;
  };

  if (courseCategoryWatch) {
    categoryChange(courseCategoryWatch);
  }
  return (
    <>
      <div className="py-6 px-10 flex flex-row justify-between border-b border-gray-200">
        <h4 className="text-heading-4 text-gray-900 inline">
          Basic Information
        </h4>

        <div className="flex gap-3">
          <CustomButton
            variant="light-primary"
            size="base"
            className=""
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </CustomButton>
          <CustomButton variant="tertiary-primary" size="base" className="">
            Save & Preview
          </CustomButton>
        </div>
      </div>
      <div className="w-full h-auto px-10 py-8 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-auto space-y-6">
            <Controller
              name="title"
              control={control}
              render={({ field }) => {
                const watchValue = watch("title");
                return (
                  <CustomFormField
                    label="Title"
                    placeholder="Your course title"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.title?.message}
                    maxLength={80}
                    watchValue={watchValue}
                  />
                );
              }}
            />

            <Controller
              name="subtitle"
              control={control}
              render={({ field }) => {
                const watchValue = watch("subtitle");
                return (
                  <CustomFormField
                    label="subtitle"
                    placeholder="Your course subtitle"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.subtitle?.message}
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
                render={({ field }) => (
                  <Select
                    error={errors?.courseCategory?.message}
                    value={field.value}
                    onValueChange={field.onChange}
                    label="Course Category"
                    className="grid col-span-6"
                  >
                    <SelectTrigger placeholder="Select option" />
                    <SelectContents>
                      {COURSE_CATEGORIES.map((item: string, i: number) => {
                        return (
                          <SelectItem value={item} key={i}>
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
                render={({ field }) => (
                  <Select
                    error={errors?.courseSubCategory?.message}
                    value={field.value}
                    onValueChange={field.onChange}
                    label="Course Sub-category"
                    className="grid col-span-6"
                  >
                    <SelectTrigger placeholder="Select option" />
                    <SelectContents>
                      {availableSubCategories.map((item: string, i: number) => {
                        return (
                          <SelectItem value={item} key={i}>
                            {item}
                          </SelectItem>
                        );
                      })}
                    </SelectContents>
                  </Select>
                )}
              />
            </div>

            <Controller
              name="coursetopic"
              control={control}
              render={({ field }) => {
                const watchValue = watch("coursetopic");
                return (
                  <CustomFormField
                    label="coursetopic"
                    placeholder="Your course coursetopic"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.coursetopic?.message}
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
                render={({ field }) => (
                  <>
                    <Select
                      error={errors?.courseLanguage?.message}
                      value={field.value}
                      onValueChange={field.onChange}
                      label="Course Language"
                      className="grid col-span-3"
                    >
                      <SelectTrigger placeholder="Select option" />
                      <SelectContents>
                        {COURSE_LANGUAGE.map(
                          (item: COURSE_LANGUAGE_TYPE, i) => {
                            return (
                              <SelectItem value={item} key={i}>
                                {item}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContents>
                    </Select>
                  </>
                )}
              />
              <Controller
                control={control}
                name="subtitleLanguage"
                render={({ field }) => (
                  <Select
                    error={errors?.subtitleLanguage?.message}
                    value={field.value}
                    onValueChange={field.onChange}
                    label="Subtitle Language"
                    className="grid col-span-3"
                  >
                    <SelectTrigger placeholder="Select option" />
                    <SelectContents>
                      {SUBTITLE_LANGUAGE.map(
                        (item: SUBTITLE_LANGUAGE_TYPE, i: number) => {
                          return (
                            <SelectItem value={item} key={i}>
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
                render={({ field }) => (
                  <Select
                    error={errors?.courseLevel?.message}
                    value={field.value}
                    onValueChange={field.onChange}
                    label="Course Level"
                    className="grid col-span-3"
                  >
                    <SelectTrigger placeholder="Select option" />
                    <SelectContents>
                      {COURSE_LEVEL.map(
                        (item: COURSE_LEVEL_TYPE, i: number) => {
                          return (
                            <SelectItem value={item} key={i}>
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
                control={control}
                name="durations"
                render={({ field }) => {
                  return (
                    <CustomInputDateSelector
                      label="Durations"
                      placeholder="Course Durations"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.durations?.message}
                      type="number"
                      className="grid col-span-3"
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="mt-8 w-full flex justify-between">
            <CustomButton
              type="button"
              size="lg"
              variant="tertiary-gray"
              className="border border-gray-200"
              onClick={() => reset(defaultValues)}
            >
              Cancel
            </CustomButton>
            <CustomButton type="submit" size="lg">
              Save & Next
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default BasicInfoForm;
