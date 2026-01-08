import { useFormContext } from "react-hook-form";
import {
  FolderOpen,
  VideoCamera,
  FileText,
  Notepad,
  File,
  type IconProps,
} from "@phosphor-icons/react";

type sectionType = {
  sectionName: string;
  lectures: LecturesType[];
};

type LecturesType = {
  lectureName: string;
  lectureContent: LectureContent;
};

type LectureContent = {
  lecture_file: FileMeta;
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

const CurriculumModel = () => {
  const { getValues } = useFormContext();
  const curriculum = getValues("curriculum");

  return (
    <div className="max-w-220 w-full space-y-6">
      {curriculum && curriculum.length > 0 ? (
        curriculum.map((section: sectionType, sectionIndex: number) => (
          <div
            key={sectionIndex}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
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
              <div className="space-y-4 mt-4">
                {section.lectures.map(
                  (lecture: LecturesType, lectureIndex: number) => (
                    <div
                      key={lectureIndex}
                      className="border border-gray-100 rounded-lg p-4 bg-gray-50"
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

                          {lecture.lectureContent.caption && (
                            <ContentRow label="Caption" icon={FileText}>
                              <p className="text-sm text-gray-700">
                                {lecture.lectureContent.caption}
                              </p>
                            </ContentRow>
                          )}

                          {lecture.lectureContent.description && (
                            <ContentRow label="Description" icon={FileText}>
                              <p className="text-sm text-gray-700">
                                {lecture.lectureContent.description}
                              </p>
                            </ContentRow>
                          )}

                          {lecture.lectureContent.lecture_file && (
                            <ContentRow label="Attached File" icon={File}>
                              <div className="flex items-center gap-2">
                                <File size={16} className="text-gray-500" />
                                <a
                                  href={lecture.lectureContent.lecture_file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                                >
                                  {lecture.lectureContent.lecture_file.name}
                                </a>
                              </div>
                            </ContentRow>
                          )}

                          {lecture.lectureContent.lecture_notes && (
                            <ContentRow label="Lecture Notes" icon={Notepad}>
                              {lecture.lectureContent.lecture_notes
                                .note_text && (
                                <p className="text-sm text-gray-700 mb-2">
                                  <span className="font-medium">Note: </span>
                                  {
                                    lecture.lectureContent.lecture_notes
                                      .note_text
                                  }
                                </p>
                              )}
                              {lecture.lectureContent.lecture_notes
                                .note_file && (
                                <div className="flex items-center gap-2">
                                  <File size={16} className="text-gray-500" />
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
        ))
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FolderOpen size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 italic">No curriculum added yet</p>
        </div>
      )}
    </div>
  );
};

export default CurriculumModel;

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
      <div className="wrap-break-words">{children}</div>
    </div>
  </div>
);
