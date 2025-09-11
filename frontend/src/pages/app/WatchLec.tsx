import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  ChevronDown,
  ChevronRight,
  Video,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VideoPlayer from "@/components/components/VideoPlayer";
import { useQuery as useQueryGraphQL } from "@apollo/client/react";
import { GET_COURSE_SECTIONS } from "@/lib/graphqlClient";
import type { CourseSectionsReturn, SectionType } from "@/types/types";
import LoadingScreen from "@/components/components/LoadingScreen";
import ErrorForComponent from "@/components/components/ErrorForComponent";
import { useParams } from "react-router";

export default function WatchCoursePage() {
  let [sections, setSections] = useState<SectionType[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const params = useParams();
  let [currentLesson, setCurrentLesson] = useState<{
    id: string;
    title: string;
    description: string;
    duration: number;
    src: string;
  }>();
  let { data, loading, error } = useQueryGraphQL<CourseSectionsReturn>(
    GET_COURSE_SECTIONS,
    { variables: { id: params.courseid } }
  );
  useEffect(() => {
    if (data) {
      if (data.course) {
        if (data.course.sections.length !== 0) {
          setSections(data.course.sections);
        }
        for (const section of data.course.sections) {
          if (section.lectures.length !== 0) {
            for (const lec of section.lectures) {
              if (lec.src) {
                setCurrentLesson(lec);
                return;
              }
            }
          }
        }
      }
    }
  }, [data]);
  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorForComponent name={error.name} error={error.message} />;
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  if (sections.length === 0) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="text-bold">No sections found!</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="bg-black relative group">
          <VideoPlayer src="http://localhost:9000/production/88768718-fab8-4be8-bfee-2fb8e37d9f66/1d78f3de-e218-4ad7-bfde-89cab36bc2bc/d542584a-2211-4bc5-aa32-68a86fb8b1a1/42c183db-4c67-4e46-b623-7e8d53e95027/master.m3u8" />
        </div>

        {/* Course Info & Tabs */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentLesson?.title}
                </h1>
              </div>
            </div>
          </div>

          {/* <TabsContent value="overview" > */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>About this lesson</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900 mb-4">{currentLesson?.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col ">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {sections.map((section) => (
              <div
                key={section.id}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {section.title}
                    </h3>
                    {/* <p className="text-sm text-gray-600">{section.duration}</p> */}
                  </div>
                  <div className="flex items-center space-x-2">
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {expandedSections.includes(section.id) && (
                  <div className="border-t border-gray-200">
                    {section.lectures.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`p-3 border-b border-gray-100 last:border-b-0 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer ${
                          lesson.id === currentLesson?.id
                            ? "bg-blue-50 border-l-4 border-l-blue-600"
                            : ""
                        }`}
                        onClick={() => setCurrentLesson(lesson)}
                      >
                        <div className="flex-shrink-0">
                          <Play className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium truncate ${
                              lesson.id === currentLesson?.id
                                ? "text-blue-900"
                                : "text-gray-900"
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
