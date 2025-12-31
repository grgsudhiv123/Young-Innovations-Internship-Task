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

const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
const ACCEPTED_NOTE_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

// const ACCEPTED_FILES_TYPE = [
//   ".doc",
//   ".docx",
//   ".xml",
//   "application/msword",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ...ACCEPTED_IMAGE_TYPES,
//   ...ACCEPTED_VIDEO_TYPES,
// ];
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const MAX_FILE_SIZE = 15 * 1024 * 1024;

export const AdvanceInfoSchema = z.object({
  courseThumbnail: z.union([
    z
      .instanceof(File)
      .refine((val) => MAX_IMAGE_SIZE >= val.size, {
        message: "Thumbnail is required",
      })
      .refine((val) => ACCEPTED_IMAGE_TYPES.includes(val.type), {
        message: ".jpg, .jpeg, .png and .webp files are accepted.",
      }),
    z.string().url({ message: "Invalid resource URL" }),
  ]),
  courseTrailer: z.union([
    z
      .instanceof(File)
      .refine((val) => ACCEPTED_VIDEO_TYPES.includes(val.type), {
        message: "video/mp4, video/webm and video/ogg files are accepted.",
      })
      .refine((val) => MAX_VIDEO_SIZE >= val.size, {
        message: "Thumbnail is required",
      }),
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

export const CurriculumSchema = z.object({
  curriculum: z
    .array(
      z.object({
        sectionName: z.string().min(1, "Section name is required"),

        lectures: z.array(
          z.object({
            lectureName: z.string().min(1, "Lecture name is required"),
            lectureContent: z.object({
              videoUrl: z
                .object({
                  file: z
                    .custom<File>((val) => val instanceof File, {
                      message: "Invalid video file",
                    })
                    .refine(
                      (file) => ACCEPTED_VIDEO_TYPES.includes(file.type),
                      "video/mp4, video/webm and video/ogg files are accepted."
                    )
                    .refine(
                      (file) => file.size <= MAX_VIDEO_SIZE,
                      "Video must be less than 100MB"
                    ),
                  url: z.string().url("Invalid video URL"),
                  duration: z.string(),
                  name: z.string(),
                })
                .optional(),

              lecture_file: z
                .object({
                  file: z
                    .custom<File>((val) => val instanceof File, {
                      message: "Invalid file",
                    })
                    .refine((file) => file.size <= MAX_FILE_SIZE, {
                      message: "File must be less than 15MB",
                    }),
                  url: z.string(),
                  name: z.string(),
                  size: z.number(),
                  type: z.string(),
                })

                .optional(),
              caption: z
                .string()
                .min(1, "Caption field cannot be empty")
                .optional(),
              description: z
                .string()
                .min(1, "Description field cannot be empty")
                .optional(),
              lecture_notes: z
                .object({
                  note_text: z.string().min(1, "Note text is required"),
                  note_file: z
                    .instanceof(File)
                    .refine(
                      (val) => ACCEPTED_NOTE_FILE_TYPES.includes(val.type),
                      {
                        message: "PDF, DOC and DOCX files are accepted.",
                      }
                    )
                    .refine((val) => MAX_FILE_SIZE >= val.size, {
                      message: `Max file size is ${MAX_FILE_SIZE}.`,
                    }),
                })
                .optional(),
            }),
          })
        ),
      })
    )
    .min(1, "Curriculum section required"),
});

export const PublishCourseSChema = z.object({
  welcome_message: z.string().min(1, "Welcome message is required"),
  congratulation_message: z
    .string()
    .min(1, "Congratulation message is required"),
  instructors: z.array(
    z
      .object({
        name: z.string(),
        role: z.string(),
        img: z.string(),
      })
      .optional()
  ),
});

export const CompleteSchema = z.union([
  BasicInfoSchema,
  AdvanceInfoSchema,
  CurriculumSchema,
  PublishCourseSChema,
]);

export type CurriculumType = z.infer<typeof CurriculumSchema>;
export type CompleteFormType = z.infer<typeof CompleteSchema>;

export const STEP_SCHEMA = [
  BasicInfoSchema,
  AdvanceInfoSchema,
  CurriculumSchema,
  PublishCourseSChema,
];
