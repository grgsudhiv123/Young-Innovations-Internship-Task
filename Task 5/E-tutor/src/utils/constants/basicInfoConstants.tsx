export const COURSE_CATEGORIES = [
  "Development",
  "Business",
  "Design",
  "Marketing",
] as const;

export type COURSE_CATEGORY_TYPE = (typeof COURSE_CATEGORIES)[number];

export const COURSE_SUB_CATEGORIES = {
  Development: ["Web Development", "App Development", "Data Science"],
  Business: ["Entrepreneurship", "Management", "Sales"],
  Design: ["UI/UX Design", "Graphic Design"],
  Marketing: ["SEO", "Social Media"],
} as const;

export type COURSE_SUBCATEGORY_TYPE =
  (typeof COURSE_SUB_CATEGORIES)[keyof typeof COURSE_SUB_CATEGORIES][number];

export const COURSE_LANGUAGE = ["English", "Spanish", "French"] as const;

export type COURSE_LANGUAGE_TYPE = (typeof COURSE_LANGUAGE)[number];

export const SUBTITLE_LANGUAGE = ["English", "Spanish", "French"] as const;

export type SUBTITLE_LANGUAGE_TYPE = (typeof SUBTITLE_LANGUAGE)[number];

export const COURSE_LEVEL = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;

export type COURSE_LEVEL_TYPE = (typeof COURSE_LEVEL)[number];

export const COURSE_DURATION = ["Days", "Week", "Month", "Year"] as const;

export type COURSE_DURATION_TYPE = (typeof COURSE_DURATION)[number];
