import {
  ClipboardTextIcon,
  MonitorPlayIcon,
  PlayCircleIcon,
  StackIcon,
} from "@phosphor-icons/react";

export const multistepFormConstants = [
  {
    title: "Basic Information",
    icon: StackIcon,
  },
  {
    title: "Advance Information",
    icon: ClipboardTextIcon,
  },
  {
    title: "Curriculum",
    icon: MonitorPlayIcon,
  },
  {
    title: "Publish Course",
    icon: PlayCircleIcon,
  },
];

export const FormConstants = {
  BASIC_INFORMATION: "basic information",
  ADVANCE_INFORMATION: "advance information",
  CURRICULUM: "curriculum",
  PUBLISH_COURSE: "publish course",
} as const;

export type FormConstantsType =
  (typeof FormConstants)[keyof typeof FormConstants];
