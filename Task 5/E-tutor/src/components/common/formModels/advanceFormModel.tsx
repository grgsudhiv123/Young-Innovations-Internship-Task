import { useFormContext } from "react-hook-form";
import {
  FileText,
  Target,
  Users,
  ListChecks,
  type IconProps,
  ImageIcon,
  CameraIcon,
} from "@phosphor-icons/react";

const AdvanceFormModel = () => {
  const { getValues } = useFormContext();
  const advanceInfoValues = {
    courseThumbnail: getValues("courseThumbnail"),
    courseTrailer: getValues("courseTrailer"),
    courseDescription: getValues("courseDescription"),
    courseTeach: getValues("courseTeach"),
    targetAudience: getValues("targetAudience"),
    courseRequirements: getValues("courseRequirements"),
  };

  const getFileName = (file: File) => {
    if (typeof file === "string") return file;
    if (file instanceof File) return file.name;
    return "Not provided";
  };

  return (
    <div className="max-w-220 w-full space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Media Files
        </h4>
        <div className="space-y-0">
          <InfoRow
            label="Course Thumbnail"
            value={getFileName(advanceInfoValues.courseThumbnail)}
            icon={ImageIcon}
          />
          <InfoRow
            label="Course Trailer"
            value={getFileName(advanceInfoValues.courseTrailer)}
            icon={CameraIcon}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Description
        </h4>
        <div className="space-y-0">
          <InfoRow
            label="Course Description"
            value={advanceInfoValues.courseDescription}
            icon={FileText}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Course Content
        </h4>
        <div className="space-y-0">
          <ListRow
            label="What You'll Teach"
            items={advanceInfoValues.courseTeach}
            icon={Target}
          />
          <ListRow
            label="Target Audience"
            items={advanceInfoValues.targetAudience}
            icon={Users}
          />
          <ListRow
            label="Course Requirements"
            items={advanceInfoValues.courseRequirements}
            icon={ListChecks}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvanceFormModel;

const InfoRow = ({
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
      <p className="text-base font-semibold text-gray-900 wrap-break-words line-clamp-1">
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </p>
    </div>
  </div>
);

const ListRow = ({
  label,
  items,
  icon: Icon,
}: {
  label: string;
  items: { value: string }[];
  icon?: React.ComponentType<IconProps>;
}) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    {Icon && (
      <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
        <Icon size={20} className="text-primary-600" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      {items && items.length > 0 ? (
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-base text-gray-900 flex items-start gap-2"
            >
              <span className="text-primary-600 mt-1">•</span>
              <span className="flex-1">{item.value}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-gray-400 italic">Not provided</span>
      )}
    </div>
  </div>
);
