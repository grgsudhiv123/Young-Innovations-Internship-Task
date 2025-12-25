import { AdvanceInfoSchema, BasicInfoSchema } from "../../schemas/formSchema";

export const ValidateStep = async (step: number, getValues: () => void) => {
  const values = getValues();

  if (step === 0) {
    return BasicInfoSchema.safeParse(values).success;
  }

  if (step === 1) {
    return AdvanceInfoSchema.safeParse(values).success;
  }
};
