import { useAppSelector } from "../../../hooks/multistepFormHook";
import SortableFields from "./sortableComponents/sortableFields";

const CurriculumForm = () => {
  const data = useAppSelector((state) => state.multistepForm.step3);
  console.log("curriculum data : ", data);
  return (
    <>
      <div className="w-full h-auto px-10 py-8 ">
        <SortableFields />
      </div>
    </>
  );
};

export default CurriculumForm;
