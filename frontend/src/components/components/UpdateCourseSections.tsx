import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, ChevronDown, Video } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router";
import type { SectionInput } from "@/types/types";
import { useParams } from "react-router";
import { v4 } from "uuid";

export default function UpdateCourseSections() {
  const params = useParams();
  const [sections, setSections] = useState<SectionInput[]>([]);
  const navigate = useNavigate();

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
        if (section.lectures) {
          return { ...section, lectures: [...section.lectures] };
        }
      }
    });
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

  // const handleVideoUpload = (
  //   sectionId: string,
  //   lectureId: string,
  //   file: File
  // ) => {
  //   const lectureToUpdate = sections
  //     .find((s) => s.id === sectionId)
  //     ?.lectures.find((l) => l.id === lectureId);
  //   if (!lectureToUpdate) return;

  //   // Simulate upload progress
  //   let progress = 0;
  //   const interval = setInterval(() => {
  //     progress += 10;
  //     if (progress <= 100) {
  //       handleLectureChange(sectionId, lectureId, "uploadProgress", progress);
  //     } else {
  //       clearInterval(interval);
  //       handleLectureChange(
  //         sectionId,
  //         lectureId,
  //         "videoUrl",
  //         URL.createObjectURL(file)
  //       );
  //     }
  //   }, 100);
  // };
  return (
    <TabsContent value="2" className="space-y-6">
      {/* <form> */}
      <CardHeader className="flex flex-row items-center justify-between">
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
                onClick={() =>
                  setSections(sections.filter((s) => s.id !== section.id))
                }
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
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
                    </div>
                    <div>
                      <Label className="pb-2">Video File</Label>
                      <Input
                        type="file"
                        accept="video/*"
                        // onChange={(e) =>
                        //   e.target.files &&
                        //   handleVideoUpload(
                        //     section.id,
                        //     lecture.id,
                        //     e.target.files[0]
                        //   )
                        // }
                      />
                      {/* {lecture.uploadProgress > 0 &&
                        lecture.uploadProgress < 100 && (
                          <Progress
                            value={lecture.uploadProgress}
                            className="mt-2 h-2"
                          />
                        )}
                      {lecture.videoUrl && lecture.uploadProgress === 100 && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                          <Video className="w-4 h-4" />
                          Video uploaded!
                        </div>
                      )} */}
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
      <div className="flex px-6 justify-between pb-6">
        <Button variant="outline" onClick={() => navigate(0)}>
          Back
        </Button>
        <Button
          className="bg-gray-900 hover:bg-gray-800 text-white"
          type="submit"
          // disabled={!isStepValid()}
          onClick={() => {
            alert("Course submitted successfully ✅");
          }}
        >
          Submit
        </Button>
      </div>
      {/* </form> */}
    </TabsContent>
  );
}
