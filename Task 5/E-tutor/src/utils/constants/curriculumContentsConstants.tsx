export const CurriculumContents = {
  VIDEO: "Video",
  ATTACH_FILE: "Attach File",
  CAPTINOS: "Captions",
  DESCRIPTION: "Description",
  LECTURE_NOTES: "Lecture Notes",
} as const;

export type CurriculumContentsType =
  (typeof CurriculumContents)[keyof typeof CurriculumContents];
