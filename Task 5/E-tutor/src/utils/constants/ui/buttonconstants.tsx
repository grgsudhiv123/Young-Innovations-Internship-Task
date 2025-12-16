export const buttonTypeConstants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  GRAY: "gray",
  LIGHT_PRIMARY: "light-primary",
  LIGHT_SECONDARY: "light-secondary",
  LIGHT_GRAY: "light-gray",
  TERTIARY_PRIMARY: "tertiary-primary",
  TERTIARY_SECONDARY: "tertiary-secondary",
  TERTIARY_GRAY: "tertiary-gray",
} as const;

export type ButtonType =
  (typeof buttonTypeConstants)[keyof typeof buttonTypeConstants];

export const sizeConstants = {
  SMALL: "sm",
  MEDIUM: "base",
  LARGE: "lg",
} as const;

export type SizeType = (typeof sizeConstants)[keyof typeof sizeConstants];
