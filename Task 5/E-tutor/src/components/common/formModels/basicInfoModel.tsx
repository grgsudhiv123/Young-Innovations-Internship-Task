import { useFormContext } from "react-hook-form";
import {
  Globe,
  Clock,
  BookIcon,
  GraduationCapIcon,
  type IconProps,
} from "@phosphor-icons/react";

const BasicInfoModel = () => {
  const { getValues } = useFormContext();
  const basicInfoValues = {
    title: getValues("title"),
    subtitle: getValues("subtitle"),
    coursetopic: getValues("coursetopic"),
    courseCategory: getValues("courseCategory"),
    courseSubCategory: getValues("courseSubCategory"),
    subtitleLanguage: getValues("subtitleLanguage"),
    courseLanguage: getValues("courseLanguage"),
    courseLevel: getValues("courseLevel"),
    durations: getValues("durations"),
  };

  return (
    <div className="max-w-220 w-full space-y-6">
      <div className="bg-linear-gradient-to-r from-primary-50 to-primary-100 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {basicInfoValues.title || "Course Title"}
        </h3>
        <p className="text-base text-gray-600">
          {basicInfoValues.subtitle || "Course Subtitle"}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Course Details
        </h4>
        <div className="space-y-0">
          <InfoRow
            label="Course Topic"
            value={basicInfoValues.coursetopic}
            icon={BookIcon}
          />
          <InfoRow
            label="Category"
            value={basicInfoValues.courseCategory}
            icon={GraduationCapIcon}
          />
          <InfoRow
            label="Sub Category"
            value={basicInfoValues.courseSubCategory}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={20} className="text-primary-600" />
            <h4 className="text-lg font-semibold text-gray-900">Languages</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Course Language
              </p>
              <p className="text-base font-semibold text-gray-900">
                {basicInfoValues.courseLanguage || (
                  <span className="text-gray-400 italic">Not set</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Subtitle Language
              </p>
              <p className="text-base font-semibold text-gray-900">
                {basicInfoValues.subtitleLanguage || (
                  <span className="text-gray-400 italic">Not set</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-primary-600" />
            <h4 className="text-lg font-semibold text-gray-900">
              Level & Duration
            </h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Course Level
              </p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                {basicInfoValues.courseLevel || "Not set"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Duration</p>
              <p className="text-base font-semibold text-gray-900">
                {basicInfoValues.durations || (
                  <span className="text-gray-400 italic">Not set</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoModel;

export const InfoRow = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<IconProps>;
}) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    {Icon && (
      <div className="shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
        <Icon size={20} className="text-primary-600" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-base font-semibold text-gray-900 line-clamp-1">
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </p>
    </div>
  </div>
);
