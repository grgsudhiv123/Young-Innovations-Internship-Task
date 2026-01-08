import { useFormContext } from "react-hook-form";
import {
  BookOpen,
  Globe,
  Clock,
  GraduationCap,
  ImageIcon,
  VideoCamera,
  FileText,
  Target,
  Users,
  ListChecks,
  FolderOpen,
  File,
  Notepad,
  ChatCircle,
  Trophy,
  UsersThree,
  User,
  type IconProps,
} from "@phosphor-icons/react";
import type { searchValueType } from "./publicCourse";
import CustomButton from "../ui/button";
import { useNavigate } from "react-router";
import { PageRoutes } from "../../enum/routes";

type sectionType = {
  sectionName: string;
  lectures: LecturesType[];
};

type LecturesType = {
  lectureName: string;
  lectureContent: LectureContent;
};

type LectureContent = {
  lecture_file?: FileMeta;
  lecture_notes?: LectureNotes;
  attach_file?: FileMeta;
  videoUrl?: VideoUrl;
  caption?: string;
  description?: string;
};

type VideoUrl = {
  duration: string;
  name: string;
  url: string;
};

type LectureNotes = {
  note_text?: string;
  note_file?: FileMeta;
};

type FileMeta = {
  name: string;
  size: number;
  type: string;
  url: string;
};

const CompleteFormPreview = () => {
  const { getValues } = useFormContext();

  const basicInfo = {
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

  const advanceInfo = {
    courseThumbnail: getValues("courseThumbnail"),
    courseTrailer: getValues("courseTrailer"),
    courseDescription: getValues("courseDescription"),
    courseTeach: getValues("courseTeach"),
    targetAudience: getValues("targetAudience"),
    courseRequirements: getValues("courseRequirements"),
  };

  const curriculum = getValues("curriculum");

  const publishInfo = {
    welcome_message: getValues("welcome_message"),
    congratulation_message: getValues("congratulation_message"),
    instructors: getValues("instructors"),
  };

  const getFileName = (file: File) => {
    if (typeof file === "string") return file;
    if (file instanceof File) return file.name;
    return "Not provided";
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-330 w-full mx-auto space-y-6">
      {/* basic info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Basic Information
        </h3>

        <div className="bg-linear-to-r from-primary-50 to-primary-100 rounded-lg p-6 mb-6">
          <h4 className="text-2xl font-bold text-gray-900 mb-2">
            {basicInfo.title || "Course Title"}
          </h4>
          <p className="text-base text-gray-600">
            {basicInfo.subtitle || "Course Subtitle"}
          </p>
        </div>

        <div className="space-y-0 mb-6">
          <InfoRow
            label="Course Topic"
            value={basicInfo.coursetopic}
            icon={BookOpen}
          />
          <InfoRow
            label="Category"
            value={basicInfo.courseCategory}
            icon={GraduationCap}
          />
          <InfoRow label="Sub Category" value={basicInfo.courseSubCategory} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Languages */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-primary-600" />
              <p className="text-lg font-semibold text-gray-900">Languages</p>
            </div>
            <div className="space-y-3 pl-8">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Course Language
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {basicInfo.courseLanguage || (
                    <span className="text-gray-400 italic">Not set</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Subtitle Language
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {basicInfo.subtitleLanguage || (
                    <span className="text-gray-400 italic">Not set</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-primary-600" />
              <p className="text-lg font-semibold text-gray-900">
                Level & Duration
              </p>
            </div>
            <div className="space-y-3 pl-8">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Course Level
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {basicInfo.courseLevel || "Not set"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Duration
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {basicInfo.durations || (
                    <span className="text-gray-400 italic">Not set</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* advance info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Advanced Information
        </h3>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Media Files
          </h4>
          <div className="space-y-0">
            <InfoRow
              label="Course Thumbnail"
              value={getFileName(advanceInfo.courseThumbnail)}
              icon={ImageIcon}
            />
            <InfoRow
              label="Course Trailer"
              value={getFileName(advanceInfo.courseTrailer)}
              icon={VideoCamera}
            />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Description
          </h4>
          <div className="space-y-0">
            <InfoRow
              label="Course Description"
              value={advanceInfo.courseDescription}
              icon={FileText}
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Course Content
          </h4>
          <div className="space-y-0">
            <ListRow
              label="What You'll Teach"
              items={advanceInfo.courseTeach}
              icon={Target}
            />
            <ListRow
              label="Target Audience"
              items={advanceInfo.targetAudience}
              icon={Users}
            />
            <ListRow
              label="Course Requirements"
              items={advanceInfo.courseRequirements}
              icon={ListChecks}
            />
          </div>
        </div>
      </div>

      {/* curriculum */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Curriculum</h3>

        {curriculum && curriculum.length > 0 ? (
          <div className="space-y-6">
            {curriculum.map((section: sectionType, sectionIndex: number) => (
              <div
                key={sectionIndex}
                className="border border-gray-100 rounded-lg p-6 bg-gray-50"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <FolderOpen size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Section {sectionIndex + 1}:{" "}
                      {section.sectionName || "Untitled Section"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {section.lectures?.length || 0} lecture(s)
                    </p>
                  </div>
                </div>

                {section.lectures && section.lectures.length > 0 ? (
                  <div className="space-y-4">
                    {section.lectures.map(
                      (lecture: LecturesType, lectureIndex: number) => (
                        <div
                          key={lectureIndex}
                          className="border border-gray-200 rounded-lg p-4 bg-white"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-medium text-gray-500">
                              Lecture {lectureIndex + 1}:
                            </span>
                            <span className="text-base font-semibold text-gray-900">
                              {lecture.lectureName || "Untitled Lecture"}
                            </span>
                          </div>

                          {lecture.lectureContent && (
                            <div className="space-y-3 pl-4 border-l-2 border-primary-200">
                              {/* Video */}
                              {lecture.lectureContent.videoUrl && (
                                <ContentRow label="Video" icon={VideoCamera}>
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="uppercase text-success-500 font-medium text-xs">
                                      FILE UPLOADED
                                    </span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-700">
                                      {lecture.lectureContent.videoUrl.duration}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-900 mt-1">
                                    {lecture.lectureContent.videoUrl.name}
                                  </p>
                                </ContentRow>
                              )}

                              {/* Caption */}
                              {lecture.lectureContent.caption && (
                                <ContentRow label="Caption" icon={FileText}>
                                  <p className="text-sm text-gray-700">
                                    {lecture.lectureContent.caption}
                                  </p>
                                </ContentRow>
                              )}

                              {/* Description */}
                              {lecture.lectureContent.description && (
                                <ContentRow label="Description" icon={FileText}>
                                  <p className="text-sm text-gray-700">
                                    {lecture.lectureContent.description}
                                  </p>
                                </ContentRow>
                              )}

                              {/* Attached File */}
                              {lecture.lectureContent.lecture_file && (
                                <ContentRow label="Attached File" icon={File}>
                                  <div className="flex items-center gap-2">
                                    <File size={16} className="text-gray-500" />
                                    <a
                                      href={
                                        lecture.lectureContent.lecture_file.url
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                                    >
                                      {lecture.lectureContent.lecture_file.name}
                                    </a>
                                  </div>
                                </ContentRow>
                              )}

                              {/* Lecture Notes */}
                              {lecture.lectureContent.lecture_notes && (
                                <ContentRow
                                  label="Lecture Notes"
                                  icon={Notepad}
                                >
                                  {lecture.lectureContent.lecture_notes
                                    .note_text && (
                                    <p className="text-sm text-gray-700 mb-2">
                                      <span className="font-medium">
                                        Note:{" "}
                                      </span>
                                      {
                                        lecture.lectureContent.lecture_notes
                                          .note_text
                                      }
                                    </p>
                                  )}
                                  {lecture.lectureContent.lecture_notes
                                    .note_file && (
                                    <div className="flex items-center gap-2">
                                      <File
                                        size={16}
                                        className="text-gray-500"
                                      />
                                      <a
                                        href={
                                          lecture.lectureContent.lecture_notes
                                            .note_file.url
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                                      >
                                        {
                                          lecture.lectureContent.lecture_notes
                                            .note_file.name
                                        }
                                      </a>
                                    </div>
                                  )}
                                </ContentRow>
                              )}

                              {/* Empty State */}
                              {!lecture.lectureContent.videoUrl &&
                                !lecture.lectureContent.caption &&
                                !lecture.lectureContent.description &&
                                !lecture.lectureContent.lecture_file &&
                                !lecture.lectureContent.lecture_notes && (
                                  <p className="text-sm text-gray-400 italic pl-3">
                                    No content added
                                  </p>
                                )}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 italic text-center py-4">
                    No lectures in this section
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-100 rounded-lg p-12 text-center bg-gray-50">
            <FolderOpen size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 italic">No curriculum added yet</p>
          </div>
        )}
      </div>

      {/* publish course */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Publish Course</h3>

        {/* Messages */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Course Messages
          </h4>
          <div className="space-y-0">
            <InfoRow
              label="Welcome Message"
              value={publishInfo.welcome_message}
              icon={ChatCircle}
            />
            <InfoRow
              label="Congratulation Message"
              value={publishInfo.congratulation_message}
              icon={Trophy}
            />
          </div>
        </div>

        {/* Instructors */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <UsersThree size={20} className="text-primary-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Instructors</h4>
            {publishInfo.instructors && publishInfo.instructors.length > 0 && (
              <span className="ml-auto text-sm font-medium text-gray-500">
                {publishInfo.instructors.length} instructor
                {publishInfo.instructors.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {publishInfo.instructors && publishInfo.instructors.length > 0 ? (
            <div className="space-y-3">
              {publishInfo.instructors.map(
                (instructor: searchValueType, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                      {instructor.img ? (
                        <img
                          src={instructor.img}
                          alt={instructor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-primary-700 font-semibold text-lg">
                          {instructor.name?.charAt(0).toUpperCase() || "I"}
                        </span>
                      )}
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

      <CustomButton
        onClick={() => {
          navigate(PageRoutes.CREATE_NEW_COURSE);
        }}
      >
        <span>Edit Form</span>
      </CustomButton>
    </div>
  );
};

export default CompleteFormPreview;

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
      <p className="text-base font-semibold text-gray-900  whitespace-pre-wrap line-clamp-2">
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
      <div className="shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
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

const ContentRow = ({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ComponentType<IconProps>;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-2 py-2">
    {Icon && (
      <div className="shrink-0 w-6 h-6 bg-primary-50 rounded flex items-center justify-center mt-0.5">
        <Icon size={14} className="text-primary-600" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <div className="">{children}</div>
    </div>
  </div>
);
