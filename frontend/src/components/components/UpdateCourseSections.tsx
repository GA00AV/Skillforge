import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ChevronDown, AlertCircle, Video } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import {
  type SectionFormType,
  type SectionFormError,
  type UploadSections,
  type CourseSectionsReturn,
  type UploadVideosType,
  type LectureType,
} from "@/types/types";
import { v4 } from "uuid";
import { useNavigate, useParams } from "react-router";
import { getVideoDuration, getVideoFile, uploadData } from "@/lib/utils";
import {
  useMutation as useMutationGraphQL,
  useQuery as useQueryGraphQL,
} from "@apollo/client/react";
import {
  GET_COURSE_SECTIONS,
  UPLOAD_COURSE_SECTIONS,
} from "@/lib/graphqlClient";
import LoadingScreen from "./LoadingScreen";
import ErrorForComponent from "./ErrorForComponent";
const deletedOnes: { sections: string[]; lectures: string[] } = {
  sections: [],
  lectures: [],
};
export default function UpdateCourseSections({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
}) {
  let params = useParams();
  let navigate = useNavigate();

  const [sections, setSections] = useState<SectionFormType[]>([]);
  const [sectionsErrors, setSectionsErrors] = useState<SectionFormError[]>([]);
  const { data, loading, error } = useQueryGraphQL<CourseSectionsReturn>(
    GET_COURSE_SECTIONS,
    {
      variables: { id: `${params.courseid}` },
    }
  );
  const [updateSections, { loading: SubmitLoading, error: SubmitError }] =
    useMutationGraphQL<UploadVideosType>(UPLOAD_COURSE_SECTIONS);

  useEffect(() => {
    async function setData() {
      if (data) {
        if (data.course) {
          let sections: SectionFormType[] = [];
          for (const section of data.course.sections) {
            const lectures = [];
            for (const lec of section.lectures) {
              lectures.push({
                id: lec.id,
                title: lec.title,
                description: lec.description,
                upload: false,
                video: await getVideoFile(lec.src, lec.title),
                duration: lec.duration,
              });
            }
            sections.push({ id: section.id, title: section.title, lectures });
          }
          setSections(sections);
        }
      }
    }
    setData();
  }, [data]);
  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: v4(),
        title: `New Section ${sections.length + 1}`,
        lectures: [],
      },
    ]);
  };

  const handleAddLecture = (sectionId: string) => {
    const newSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          lectures: [
            ...(section.lectures ?? []), // handle undefined gracefully
            {
              id: v4(),
              title: "",
              description: "",
              video: null,
              upload: true,
              duration: 0,
            },
          ],
        };
      }
      return section;
    });

    setSections(newSections);
  };

  const handleDeleteLecture = (sectionId: string, lectureId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures?.filter(
                (lecture) => lecture.id !== lectureId
              ),
            }
          : section
      )
    );
    deletedOnes.lectures.push(lectureId);
  };
  const getLecture = (lectureid: string) => {
    for (const section of sections) {
      for (const lec of section.lectures) {
        if (lec.id === lectureid) {
          return lec;
        }
      }
    }
    return null;
  };
  const handleLectureChange = (
    sectionId: string,
    lectureId: string,
    field: string,
    value: any
  ) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures?.map((lecture) =>
                lecture.id === lectureId
                  ? { ...lecture, [field]: value }
                  : lecture
              ),
            }
          : section
      )
    );
  };
  const handleVideoChange = (
    sectionID: string,
    lectureID: string,
    data: File | null
  ) => {
    setSections(
      sections.map((section) =>
        section.id === sectionID
          ? {
              ...section,
              lectures: section.lectures?.map((lecture) =>
                lecture.id === lectureID
                  ? { ...lecture, ...{ upload: true, video: data } }
                  : lecture
              ),
            }
          : section
      )
    );
  };
  async function handleSubmitSections() {
    let errors: SectionFormError[] = [];
    for (const section of sections) {
      let lecturesError: {}[] = [];
      for (const lecture of section.lectures) {
        let lectureError: Record<string, string> = {};
        if (!lecture.title) {
          lectureError["title"] = "Title is required";
        }
        if (!lecture.description) {
          lectureError["description"] = "Description is required";
        }
        if (!lecture.video) {
          lectureError["video"] = "Video is required";
        }
        if (Object.keys(lectureError).length !== 0) {
          lectureError["id"] = lecture.id;
          lecturesError.push(lectureError);
        }
      }
      if (!section.title) {
        if (lecturesError) {
          errors.push({
            id: section.id,
            lectures: lecturesError,
            title: "Title is required for section",
          });
        } else {
          errors.push({
            id: section.id,
            title: "Title is required for section",
          });
        }
      } else {
        if (lecturesError.length !== 0) {
          errors.push({ id: section.id, lectures: lecturesError });
        }
      }
    }
    if (errors.length !== 0) {
      setSectionsErrors(errors);
    } else {
      // everything fine
      let sectionDataToSend: UploadSections = {
        courseId: `${params.courseid}`,
        deletedLectures: deletedOnes.lectures,
        deletedSections: deletedOnes.sections,
        sections: [],
      };
      for (const s of sections) {
        let lectures: LectureType[] = [];
        for (const l of s.lectures) {
          lectures.push({
            id: l.id,
            title: l.title,
            description: l.description,
            upload: l.upload,
            duration: l.upload
              ? Math.round(await getVideoDuration(l.video))
              : l.duration,
          });
        }
        sectionDataToSend.sections.push({
          id: s.id,
          title: s.title,
          lectures,
        });
      }
      setSectionsErrors([]);
      const result = await updateSections({
        variables: { data: sectionDataToSend },
      });
      if (result.data) {
        for (const sec of result.data.updateSections.Sections) {
          for (const lecture of sec.Lectures) {
            const lec = getLecture(lecture.lectureId);
            if (lec) {
              try {
                await uploadData(lecture.url, lec.video);
              } catch {
                continue;
              }
            }
          }
        }
      }
      navigate("/app/my-courses");
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorForComponent error={error.message} name={error.name} />;
  }
  if (SubmitError) {
    return (
      <ErrorForComponent error={SubmitError.message} name={SubmitError.name} />
    );
  }
  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between mb-2">
        <CardTitle className="text-lg text-gray-900">
          Course Curriculum
        </CardTitle>
        <Button onClick={handleAddSection} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No sections added yet. Click "Add Section" to get started.
          </div>
        )}
        {sections.map((section, sectionIndex) => (
          <Collapsible
            key={section.id}
            className="border rounded-md p-4 bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <Input
                required
                value={section.title}
                onChange={(e) =>
                  setSections(
                    sections.map((s) =>
                      s.id === section.id ? { ...s, title: e.target.value } : s
                    )
                  )
                }
                className="flex-1 mr-4 bg-white"
                placeholder={`Section ${sectionIndex + 1} Title`}
              />

              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSections(sections.filter((s) => s.id !== section.id));
                  deletedOnes.sections.push(section.id);
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            {sectionsErrors.map((sectionError) => {
              if (sectionError.id === section.id) {
                return sectionError.title ? (
                  <div
                    className="flex items-center text-red-600 my-2 mx-2"
                    key={Math.random()}
                  >
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-xs">{sectionError.title}</span>
                  </div>
                ) : (
                  ""
                );
              }
              return "";
            })}
            <CollapsibleContent className="mt-4 space-y-4">
              {section.lectures?.map((lecture, lectureIndex) => (
                <Card key={lecture.id} className="border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">
                      Lecture {lectureIndex + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleDeleteLecture(section.id, lecture.id)
                      }
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="pb-2">Lecture Title</Label>
                      <Input
                        required
                        value={lecture.title}
                        onChange={(e) =>
                          handleLectureChange(
                            section.id,
                            lecture.id,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Introduction to JavaScript"
                      />
                      {sectionsErrors.map((sectionError) => {
                        if (sectionError.id === section.id) {
                          return sectionError.lectures?.map((lec) => {
                            if (lec.id === lecture.id) {
                              return lec.title ? (
                                <div
                                  className="flex items-center space-x-1 text-red-600 mx-2 my-2"
                                  key={Math.random()}
                                >
                                  <AlertCircle className="h-3 w-3" />
                                  <span className="text-xs">{lec.title}</span>
                                </div>
                              ) : (
                                ""
                              );
                            }
                          });
                        }
                        return "";
                      })}
                    </div>
                    <div>
                      <Label className="pb-2">Lecture Description</Label>
                      <Textarea
                        value={lecture.description}
                        onChange={(e) =>
                          handleLectureChange(
                            section.id,
                            lecture.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Briefly describe this lecture."
                        rows={3}
                      />
                      {sectionsErrors.map((sectionError) => {
                        if (sectionError.id === section.id) {
                          return sectionError.lectures?.map((lec) => {
                            if (lec.id === lecture.id) {
                              return lec.description ? (
                                <div
                                  className="flex items-center space-x-1 text-red-600 mx-2 my-2"
                                  key={Math.random()}
                                >
                                  <AlertCircle className="h-3 w-3" />
                                  <span className="text-xs">
                                    {lec.description}
                                  </span>
                                </div>
                              ) : (
                                ""
                              );
                            }
                          });
                        }
                        return "";
                      })}
                    </div>
                    <div>
                      <Label className="pb-2">Video File</Label>
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            handleVideoChange(
                              section.id,
                              lecture.id,
                              e.target.files[0]
                            );
                          }
                        }}
                      />
                      {sectionsErrors.map((sectionError) => {
                        if (sectionError.id === section.id) {
                          return sectionError.lectures?.map((lec) => {
                            if (lec.id === lecture.id) {
                              return lec.video ? (
                                <div
                                  className="flex items-center space-x-1 text-red-600 mx-2 mt-2"
                                  key={Math.random()}
                                >
                                  <AlertCircle className="h-3 w-3" />
                                  <span className="text-xs">{lec.video}</span>
                                </div>
                              ) : (
                                ""
                              );
                            }
                          });
                        }
                        return "";
                      })}
                      {lecture.video && !lecture.upload && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Video className="w-4 h-4 rounded-lg" />
                          {`${lecture.title} is uploaded`}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              <Button
                onClick={() => handleAddLecture(section.id)}
                variant="outline"
                className="w-full mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lecture
              </Button>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
      {/* Navigation */}
      <div className="flex px-6 justify-between py-6">
        <Button variant="outline" onClick={() => setActiveTab(activeTab - 1)}>
          Back
        </Button>
        <Button
          disabled={SubmitLoading}
          className="bg-gray-900 hover:bg-gray-800 text-white"
          type="submit"
          onClick={handleSubmitSections}
        >
          {SubmitLoading ? "Submiting" : "Submit"}
        </Button>
      </div>
    </div>
  );
}
