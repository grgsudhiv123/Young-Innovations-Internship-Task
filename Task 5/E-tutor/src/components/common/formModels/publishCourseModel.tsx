import { useFormContext } from "react-hook-form";
import {
  ChatCircle,
  Trophy,
  UsersThree,
  User,
  type IconProps,
} from "@phosphor-icons/react";
import type { searchValueType } from "../../forms/publicCourse";

const PublishCourseModel = () => {
  const { getValues } = useFormContext();
  const publishValues = {
    welcome_message: getValues("welcome_message"),
    congratulation_message: getValues("congratulation_message"),
    instructors: getValues("instructors"),
  };

  return (
    <div className="w-full space-y-6">
      {/* Messages Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Course Messages
        </h4>
        <div className="space-y-0">
          <InfoRow
            label="Welcome Message"
            value={publishValues.welcome_message}
            icon={ChatCircle}
          />
          <InfoRow
            label="Congratulation Message"
            value={publishValues.congratulation_message}
            icon={Trophy}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <UsersThree size={20} className="text-primary-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">Instructors</h4>
          {publishValues.instructors &&
            publishValues.instructors.length > 0 && (
              <span className="ml-auto text-sm font-medium text-gray-500">
                {publishValues.instructors.length} instructor
                {publishValues.instructors.length !== 1 ? "s" : ""}
              </span>
            )}
        </div>

        {publishValues.instructors && publishValues.instructors.length > 0 ? (
          <div className="space-y-3">
            {publishValues.instructors.map(
              (instructor: searchValueType, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-semibold text-lg">
                      {instructor.name?.charAt(0).toUpperCase() || "I"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <User size={16} className="text-gray-500" />
                      <p className="text-base font-semibold text-gray-900">
                        {instructor.name || (
                          <span className="text-gray-400 italic">
                            Unnamed Instructor
                          </span>
                        )}
                      </p>
                    </div>

                    {instructor.role && (
                      <p className="text-xs text-gray-500 mt-1">
                        Role: {instructor.role}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-400 italic text-center py-4">
            No instructors assigned
          </p>
        )}
      </div>
    </div>
  );
};

export default PublishCourseModel;

const InfoRow = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<IconProps>;
}) => (
  <div className="w-full flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    {Icon && (
      <div className="shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
        <Icon size={20} className="text-primary-600" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-base font-semibold text-gray-900 whitespace-pre-wrap">
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </p>
    </div>
  </div>
);
