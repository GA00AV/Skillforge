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

// Mock course data
const courseData = {
  id: "1",
  title: "Complete React Development Course",
  instructor: "John Smith",
  duration: "12h 30m",
  students: 15420,
  rating: 4.8,
  progress: 65,
  currentLesson: {
    id: "lesson-3",
    title: "Understanding React Hooks",
    duration: "18:45",
    videoUrl: "/placeholder.svg?height=400&width=800&text=Video+Player",
  },
  sections: [
    {
      id: "section-1",
      title: "Getting Started",
      duration: "2h 15m",
      completed: true,
      lessons: [
        {
          id: "lesson-1",
          title: "Introduction to React",
          duration: "12:30",
          completed: true,
          type: "video",
        },
        {
          id: "lesson-2",
          title: "Setting up Development Environment",
          duration: "15:45",
          completed: true,
          type: "video",
        },
        {
          id: "lesson-3",
          title: "Your First React Component",
          duration: "18:20",
          completed: true,
          type: "video",
        },
      ],
    },
    {
      id: "section-2",
      title: "React Fundamentals",
      duration: "3h 45m",
      completed: false,
      lessons: [
        {
          id: "lesson-4",
          title:
            "Understanding React Hooks so that flasdlfkjsadfjsadjflksadjfljsdfjsdjfsdjfjsdfjsdlkfjsldkjflkjj",
          duration: "18:45",
          completed: false,
          type: "video",
          current: true,
        },
        {
          id: "lesson-5",
          title: "State Management",
          duration: "22:15",
          completed: false,
          type: "video",
        },
        {
          id: "lesson-6",
          title: "Props and Components",
          duration: "16:30",
          completed: false,
          type: "video",
        },
        {
          id: "lesson-7",
          title: "React Hooks Cheatsheet",
          duration: "5:00",
          completed: false,
          type: "resource",
        },
      ],
    },
    {
      id: "section-3",
      title: "Advanced Concepts",
      duration: "4h 20m",
      completed: false,
      lessons: [
        {
          id: "lesson-8",
          title: "Context API",
          duration: "25:10",
          completed: false,
          type: "video",
        },
        {
          id: "lesson-9",
          title: "Custom Hooks",
          duration: "19:45",
          completed: false,
          type: "video",
        },
        {
          id: "lesson-10",
          title: "Performance Optimization",
          duration: "28:30",
          completed: false,
          type: "video",
        },
      ],
    },
  ],
};

export default function WatchCoursePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(1125); // 18:45 in seconds
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "section-2",
  ]);
  const videoRef = useRef<HTMLDivElement>(null);

  // Simulate video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="bg-black relative group">
          <div
            ref={videoRef}
            className="relative aspect-video bg-gray-900 flex items-center justify-center"
          >
            {/* Video Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Understanding React Hooks</p>
                <p className="text-sm text-gray-400">Duration: 18:45</p>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full w-16 h-16"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-600 rounded-full h-1 cursor-pointer">
                    <div
                      className="bg-white h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white hover:bg-opacity-20"
                      onClick={() =>
                        setCurrentTime(Math.max(0, currentTime - 10))
                      }
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white hover:bg-opacity-20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white hover:bg-opacity-20"
                      onClick={() =>
                        setCurrentTime(Math.min(duration, currentTime + 10))
                      }
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white hover:bg-opacity-20"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>

                    <span className="text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white hover:bg-opacity-20"
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          {playbackSpeed}x
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                          <DropdownMenuItem
                            key={speed}
                            onClick={() => setPlaybackSpeed(speed)}
                          >
                            {speed}x
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white hover:bg-opacity-20"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info & Tabs */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {courseData.currentLesson.title}
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
              <p className="text-gray-600 mb-4">
                In this comprehensive lesson, you'll learn about React Hooks,
                one of the most important features introduced in React 16.8.
                We'll cover useState, useEffect, and other essential hooks that
                will transform how you write React components.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">
                  What you'll learn:
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Understanding the useState hook for state management</li>
                  <li>
                    Using useEffect for side effects and lifecycle methods
                  </li>
                  <li>Custom hooks and when to use them</li>
                  <li>Best practices and common patterns</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col ">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {courseData.sections.map((section) => (
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
                    <p className="text-sm text-gray-600">{section.duration}</p>
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
                    {section.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`p-3 border-b border-gray-100 last:border-b-0 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer ${
                          lesson.current
                            ? "bg-blue-50 border-l-4 border-l-blue-600"
                            : ""
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <Play className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium truncate ${
                              lesson.current ? "text-blue-900" : "text-gray-900"
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {lesson.duration}
                          </p>
                        </div>
                        {/* <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : lesson.current ? (
                            <div className="w-4 h-4 rounded-full border-2 border-blue-600" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                          )}
                        </div> */}
                        {/* {lesson.type === "resource" && (
                          <Button size="sm" variant="ghost" className="p-1">
                            <Download className="w-3 h-3" />
                          </Button>
                        )} */}
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
