import z from "zod";
import {
  COURSE_CATEGORIES,
  COURSE_LANGUAGE,
  COURSE_LEVEL,
  COURSE_SUB_CATEGORIES,
  SUBTITLE_LANGUAGE,
  type COURSE_CATEGORY_TYPE,
  type COURSE_LANGUAGE_TYPE,
  type COURSE_LEVEL_TYPE,
  type COURSE_SUBCATEGORY_TYPE,
  type SUBTITLE_LANGUAGE_TYPE,
} from "../utils/constants/basicInfoConstants";

export const BasicInfoSchema = z.object({
  title: z.string().min(1, "Title is required."),
  subtitle: z.string().min(1, "Subtitle is required."),
  coursetopic: z.string().min(1, "Course topic is required."),
  courseCategory: z
    .string()
    .refine((val) => COURSE_CATEGORIES.includes(val as COURSE_CATEGORY_TYPE), {
      message: "Please select course category",
    }),
  courseSubCategory: z.string().refine(
    (val) =>
      Object.values(COURSE_SUB_CATEGORIES)
        .flat()
        .includes(val as COURSE_SUBCATEGORY_TYPE),
    {
      message: "Please select course subcategory",
    }
  ),
  courseLanguage: z
    .string()
    .refine((val) => COURSE_LANGUAGE.includes(val as COURSE_LANGUAGE_TYPE), {
      message: "Please select course language",
    }),
  subtitleLanguage: z
    .optional(z.string())
    .refine(
      (val) => SUBTITLE_LANGUAGE.includes(val as SUBTITLE_LANGUAGE_TYPE),
      {
        message: "Select subtitle language",
      }
    ),
  courseLevel: z
    .string()
    .refine((val) => COURSE_LEVEL.includes(val as COURSE_LEVEL_TYPE), {
      message: "Please select course level",
    }),
  durations: z
    .string()
    .min(1, "Please enter course duration")
    .refine(
      (val) => {
        const unit = val.split(" ")[0];
        const validUnit = Number(unit.trim());
        return Boolean(unit.trim().length > 0 || validUnit < 1);
      },
      { message: "Please enter duration" }
    )
    .refine(
      (val) => {
        const unit = val.split(" ")[0];
        const isInValidDuration = !(Number(unit.trim()) < 1);
        return Boolean(isInValidDuration);
      },
      { message: "Please enter valid duration" }
    ),
  courseDescription: z
    .string()
    .min(1, "Course description are required.")
    .max(1000, "Course description must not exceed 1000 char."),
  courseTeach: z
    .array(
      z.object({
        value: z.string().min(1, "Course teaching field cannot be empty"),
      })
    )
    .min(1, "Course teachings are required"),
  targetAudience: z
    .array(
      z.object({
        value: z.string().min(1, "Target audience field cannot be empty"),
      })
    )
    .min(1, "Target audience are required"),
  courseRequirements: z
    .array(
      z.object({
        value: z.string().min(1, "Course requirement field cannot be empty"),
      })
    )
    .min(1, "Course requirements are required"),
});

export type BasicInfoFormType = z.infer<typeof BasicInfoSchema>;
