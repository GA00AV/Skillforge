import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, ChevronDown, Video } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchCourseDetails } from "@/lib/utils";
import { type Lecture, type Section } from "@/types/types";
import { toast } from "sonner";

export default function UploadCoursePage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeTab, setActiveTab] = useState(1);
  let params = useParams();
  let courseQuery = useQuery({
    queryKey: ["Course", params.courseid],
    queryFn: () =>
      fetchCourseDetails(
        `http://localhost:3000/course/${params.courseid}/basic`,
        params.courseid as string
      ),
  });
  // step validation
  // const isStepValid = () => {
  //   if (activeTab === 1) {
  //     return (
  //       courseTitle.trim() !== "" &&
  //         courseDescription.trim() !== "" &&
  //         courseCategory.trim() !== "" &&
  //         courseImage !== null,
  //       coursePrice.trim() !== "" && Number(coursePrice) > 0
  //     );
  //   }
  //   if (activeTab === 2) {
  //     return (
  //       sections.length > 0 &&
  //       sections.every(
  //         (s) =>
  //           s.title.trim() !== "" &&
  //           s.lectures.length > 0 &&
  //           s.lectures.every((l) => {
  //             return l.title.trim() !== "" && l.description.trim() !== "";
  //           })
  //       )
  //     );
  //   }
  //   return false;
  // };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        title: `New Section ${sections.length + 1}`,
        lectures: [],
      },
    ]);
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const handleAddLecture = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: [
                ...section.lectures,
                {
                  id: Date.now().toString(),
                  title: `New Lecture ${section.lectures.length + 1}`,
                  description: "",
                  videoUrl: "",
                  resources: [],
                  uploadProgress: 0,
                  resourceUploadProgress: {},
                },
              ],
            }
          : section
      )
    );
  };

  const handleDeleteLecture = (sectionId: string, lectureId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.filter(
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
    field: keyof Lecture,
    value: any
  ) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture.id === lectureId
                  ? { ...lecture, [field]: value }
                  : lecture
              ),
            }
          : section
      )
    );
  };

  const handleVideoUpload = (
    sectionId: string,
    lectureId: string,
    file: File
  ) => {
    const lectureToUpdate = sections
      .find((s) => s.id === sectionId)
      ?.lectures.find((l) => l.id === lectureId);
    if (!lectureToUpdate) return;

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        handleLectureChange(sectionId, lectureId, "uploadProgress", progress);
      } else {
        clearInterval(interval);
        handleLectureChange(
          sectionId,
          lectureId,
          "videoUrl",
          URL.createObjectURL(file)
        );
      }
    }, 100);
  };
  if (courseQuery.isLoading) {
    return <p>Loading...</p>;
  }
  if (courseQuery.isError) {
    toast(`Error: ${courseQuery.error.message}`);
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Course
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in the details to create your online course.
          </p>
        </div>
      </div>

      <Tabs value={String(activeTab)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="1">Course Details</TabsTrigger>
          <TabsTrigger value="2">Curriculum</TabsTrigger>
        </TabsList>
        <Card className="border-gray-200">
          {/* Step 1 */}
          <TabsContent value="1" className="space-y-6">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="courseTitle" className="pb-2">
                  Course Title
                </Label>
                <Input
                  required
                  defaultValue={courseQuery.data ? courseQuery.data.title : ""}
                  id="courseTitle"
                  name="title"
                  placeholder="e.g., Master JavaScript in 30 Days"
                />
              </div>
              <div>
                <Label htmlFor="courseDescription" className="pb-2">
                  Course Description
                </Label>
                <Textarea
                  required
                  name="description"
                  id="courseDescription"
                  placeholder="Provide a detailed description..."
                  defaultValue={
                    courseQuery.data ? courseQuery.data.description : ""
                  }
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="courseCategory" className="pb-2">
                  Category
                </Label>
                <Select
                  required
                  name="category"
                  defaultValue={
                    courseQuery.data ? courseQuery.data.category : ""
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="coursePrice" className="pb-2">
                  Course Price (₹)
                </Label>
                <Input
                  id="coursePrice"
                  type="number"
                  name="price"
                  placeholder="e.g., 499"
                  defaultValue={courseQuery.data ? courseQuery.data.price : ""}
                  min="0"
                  step="1"
                />
              </div>
              <div>
                <Label htmlFor="courseImage" className="pb-2">
                  Course Thumbnail Image
                </Label>
                <Input
                  required
                  name="thumbnail"
                  id="courseImage"
                  type="file"
                  accept="image/*"
                />
                {courseQuery.data && (
                  <img
                    src={
                      courseQuery.data.thumbnail
                        ? courseQuery.data.thumbnail
                        : ""
                    }
                    alt="Course Thumbnail"
                    className="mt-4 w-48 h-auto object-cover rounded-md"
                  />
                )}
              </div>
            </CardContent>
          </TabsContent>

          {/* Step 2 */}
          <TabsContent value="2" className="space-y-6">
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
                      value={section.title}
                      onChange={(e) =>
                        setSections(
                          sections.map((s) =>
                            s.id === section.id
                              ? { ...s, title: e.target.value }
                              : s
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
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <CollapsibleContent className="mt-4 space-y-4">
                    {section.lectures.map((lecture, lectureIndex) => (
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
                              onChange={(e) =>
                                e.target.files &&
                                handleVideoUpload(
                                  section.id,
                                  lecture.id,
                                  e.target.files[0]
                                )
                              }
                            />
                            {lecture.uploadProgress > 0 &&
                              lecture.uploadProgress < 100 && (
                                <Progress
                                  value={lecture.uploadProgress}
                                  className="mt-2 h-2"
                                />
                              )}
                            {lecture.videoUrl &&
                              lecture.uploadProgress === 100 && (
                                <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                                  <Video className="w-4 h-4" />
                                  Video uploaded!
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
          </TabsContent>

          {/* Navigation */}
          <div className="flex px-6 justify-between pb-6">
            <Button
              variant="outline"
              onClick={() => setActiveTab(activeTab - 1)}
              disabled={activeTab === 1}
            >
              Back
            </Button>
            <Button
              className="bg-gray-900 hover:bg-gray-800 text-white"
              type="button"
              // disabled={!isStepValid()}
              onClick={
                activeTab !== 2
                  ? () => setActiveTab(activeTab + 1)
                  : () => {
                      alert("Course submitted successfully ✅");
                    }
              }
            >
              {activeTab === 2 ? "Submit" : "Next"}
            </Button>
          </div>
        </Card>
      </Tabs>
    </div>
  );
}
