import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AdvanceInfoType,
  BasicInfoFormType,
  CurriculumType,
  PublishCourseType,
} from "../schemas/formSchema";

type stepType = 1 | 2 | 3 | 4;

type formdataType = {
  step1: BasicInfoFormType | null;
  step2: AdvanceInfoType | null;
  step3: CurriculumType | null;
  step4: PublishCourseType | null;
  CurrentStep: stepType;
};

const initialState: formdataType = {
  step1: null,
  step2: null,
  step3: null,
  step4: null,
  CurrentStep: 1,
};

type saveStepPayload =
  | { step: 1; data: BasicInfoFormType }
  | { step: 2; data: AdvanceInfoType }
  | { step: 3; data: CurriculumType }
  | { step: 4; data: PublishCourseType };

const multistepFormSlice = createSlice({
  name: "multistepForm",
  initialState,
  reducers: {
    saveStepData: (state, action: PayloadAction<saveStepPayload>) => {
      const { step, data } = action.payload;
      switch (step) {
        case 1:
          state.step1 = data;
          break;
        case 2:
          state.step2 = data;
          break;
        case 3:
          state.step3 = data;
          break;
        case 4:
          state.step4 = data;
          break;

        default:
          break;
      }
      state.CurrentStep = step;
    },

    goToStep: (state, action) => {
      state.CurrentStep = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { saveStepData, goToStep, resetForm } = multistepFormSlice.actions;
export default multistepFormSlice;
