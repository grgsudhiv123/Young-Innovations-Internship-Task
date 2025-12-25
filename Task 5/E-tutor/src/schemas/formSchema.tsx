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
import { getPlainText } from "../utils/constants/getPlainText";

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
});

export type BasicInfoFormType = z.infer<typeof BasicInfoSchema>;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const AdvanceInfoSchema = z.object({
  courseThumbnail: z.union([
    z
      .instanceof(File)
      .refine((val) => val.size < 1, { message: "Thumbnail is required" })
      .refine((val) => ACCEPTED_IMAGE_TYPES.includes(val.type), {
        message: ".jpg, .jpeg, .png and .webp files are accepted.",
      }),
    z.string().url({ message: "Invalid resource URL" }),
  ]),
  courseTrailer: z.union([
    z
      .instanceof(File)
      .refine((val) => val.size < 1, { message: "Thumbnail is required" }),
    z.string().url({ message: "Invalid resource URL" }),
  ]),
  courseDescription: z.string().refine(
    (val) => {
      const text = getPlainText(val);
      return text && text.length >= 50 && text.length <= 2000;
    },
    {
      message: "Description must be between 50 and 2000 characters",
    }
  ),
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

export const CompleteSchema = BasicInfoSchema.merge(AdvanceInfoSchema);
export type CompleteFormType = z.infer<typeof CompleteSchema>;
