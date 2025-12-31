import { useState } from "react";

import TabButtons from "../components/common/tab/tabButtons";
import ActiveTabContents from "../components/common/tab/tabContents";
import { FormProvider, useForm } from "react-hook-form";
import { CompleteSchema, type CompleteFormType } from "../schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const NewCoursePage = () => {
  const [step, setStep] = useState(0);

  const methods = useForm<CompleteFormType>({
    defaultValues: {
      title: "",
      subtitle: "",
      coursetopic: "",
      courseCategory: "",
      courseSubCategory: "",
      subtitleLanguage: "",
      courseLanguage: "",
      courseLevel: "",
      durations: "",
      courseThumbnail: "",
      courseTrailer: "",
      courseDescription: "",
      courseTeach: [{ value: "" }],
      targetAudience: [{ value: "" }],
      courseRequirements: [{ value: "" }],
      curriculum: [
        // {
        //   sectionName: "",
        //   lectures: [
        //     {
        //       lectureName: "",
        //       lectureContent: {
        //         videoUrl: undefined,
        //         lecture_file: undefined,
        //         caption: "",
        //         description: "",
        //         lecture_notes: {
        //           note_text: "",
        //           note_file: undefined,
        //         },
        //       },
        //     },
        //   ],
        // },
      ],
    },
    resolver: zodResolver(CompleteSchema),
  });

  const FinalFormSubmit = (data: CompleteFormType) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(FinalFormSubmit)}>
        <div className="max-w-330 w-full h-fit mx-auto bg-white pb-10">
          <TabButtons setStep={setStep} step={step} />
          <ActiveTabContents step={step} setStep={setStep} />
        </div>
      </form>
    </FormProvider>
  );
};

export default NewCoursePage;
