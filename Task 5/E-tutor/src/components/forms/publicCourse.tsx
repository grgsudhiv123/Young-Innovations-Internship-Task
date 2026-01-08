import { Controller, useFieldArray, useFormContext } from "react-hook-form";
// import FormButtons from "../common/tab/formButtons";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useRef, useState, type ChangeEvent } from "react";
import { PublicCoursesConstants } from "../../utils/constants/publicCoursesConstants";
import { ZeroBefore } from "./curriculumForm/sortableComponents/sortableSelectionItem";

export interface searchValueType {
  name: string;
  img: string;
  role: string;
}

// type publicCourseType = {
//   welcome_message: string;
//   congratulation_message: string;
//   instructors: searchValueType;
// };

const PublicCourseForm = () => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [searchValue, setSearchValue] = useState<searchValueType[] | null>(
    null
  );
  const { control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "instructors",
  });

  const instructors = watch("instructors") as searchValueType[];

  // const handleNext = async () => {
  //   const isValid = await trigger([
  //     "courseDescription",
  //     "courseTeach",
  //     "targetAudience",
  //     "courseRequirements",
  //   ]);
  //   if (!isValid) return;
  // };
  // const handlePrevious = () => {
  //   setStep(2);
  // };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = filteredValues(e.target.value);
    setSearchValue(value);
  };

  const filteredValues = (value: string) => {
    const filteredValues = PublicCoursesConstants.filter((item) =>
      item.name.toLowerCase().trim().includes(value.toLowerCase().trim())
    );
    return value === "" || value === undefined ? [] : filteredValues;
  };

  const handleAppend = (item: searchValueType) => {
    append(item);
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    setSearchValue(null);
  };
  return (
    <>
      <div className="w-full py-8 px-10 border-b border-gray-100 space-y-10">
        <div className="w-full space-y-6">
          <p className="body-xl-500 text-gray-900">Message</p>
          <div className="grid grid-cols-12 gap-6">
            <Controller
              name="welcome_message"
              render={({ field, fieldState }) => {
                const isError = fieldState.error;
                return (
                  <div className="relative col-span-6 space-y-1.5">
                    <p className="body-md-400">Welcome Message</p>
                    <textarea
                      id="welcome_message"
                      placeholder="Enter course starting message here..."
                      className={clsx(
                        "w-full outline-none border border-gray-100 px-4.5 py-4",
                        isError ? "bg-primary-100" : ""
                      )}
                      rows={5}
                      {...field}
                    />

                    {isError && (
                      <span className="absolute left-0 -bottom-2 body-sm-400 text-primary-500">
                        {isError.message}
                      </span>
                    )}
                  </div>
                );
              }}
            />
            <Controller
              name="congratulation_message"
              render={({ field, fieldState }) => {
                const isError = fieldState.error;
                return (
                  <div className="relative col-span-6 space-y-1.5">
                    <p className="body-md-400">Congratulations Message</p>
                    <textarea
                      id="congratulation_message"
                      placeholder="Enter your course completed message here..."
                      className={clsx(
                        "w-full outline-none border border-gray-100 px-4.5 py-4",
                        isError ? "bg-primary-100" : ""
                      )}
                      rows={5}
                      {...field}
                    />
                    {isError && (
                      <span className="absolute left-0 -bottom-2 body-sm-400 text-primary-500">
                        {isError.message}
                      </span>
                    )}
                  </div>
                );
              }}
            />
          </div>
        </div>

        <div className="w-full space-y-6">
          <p className="body-xl-500 text-gray-900">
            Add Instructor ({ZeroBefore(fields.length)})
          </p>
          <div className="relative max-w-152 w-full flex flex-row py-4.5 px-3 border border-gray-100">
            <MagnifyingGlassIcon size={24} />
            <input
              type="text"
              className="w-full outline-none ml-3"
              placeholder="Search by username"
              ref={searchInputRef}
              onChange={handleSearchChange}
            />

            {searchValue && searchValue.length > 0 && (
              <div className="absolute left-0 bottom-0 translate-y-full w-full flex flex-col gap-2 bg-white shadow-2xl border border-gray-50 rounded-sm p-2 ">
                {searchValue.map((item, i) => {
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAppend(item)}
                      className="w-full flex gap-3 hover:bg-gray-50 p-2 border border-gray-100 cursor-pointer"
                    >
                      <div className="size-12 aspect-square rounded-full overflow-hidden">
                        <img
                          src={item.img}
                          alt="dummyuserphoto"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <p className="body-md-400 text-gray-600 text-start">
                          {item.name}
                        </p>
                        <p className="body-md-600 text-gray-900">{item.role}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {fields && fields.length > 0 && (
            <div className="grid grid-cols-12 gap-6">
              {instructors.map((user, i) => {
                return (
                  <div
                    key={i}
                    className="col-span-4 flex w-full justify-between p-4 bg-gray-50 hover:bg-gray-100 transform-all ease-in-out duration-200 cursor-pointer"
                  >
                    <div className="w-full flex gap-3">
                      <div className="size-12 aspect-square rounded-full overflow-hidden">
                        <img
                          src={user.img}
                          alt="dummyuserphoto"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <p className="body-md-600 text-gray-900">
                          {user?.name}
                        </p>
                        <p className="body-md-400 text-gray-600">{user.role}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-gray-900 hover:text-gray-600 cursor-pointer"
                      onClick={() => remove(i)}
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* <div className="px-10">
        <FormButtons
          handleNextBtn={handleNext}
          handlePreviosBtn={handlePrevious}
          prevButtonLabel="Previous"
        />
      </div> */}
    </>
  );
};

export default PublicCourseForm;
