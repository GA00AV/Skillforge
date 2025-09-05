import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import BasicCourseInfoForm from "@/components/components/BasicCourseInfoForm";
import UpdateCourseSections from "@/components/components/UpdateCourseSections";

export default function EditCoursePage() {
  const [activeTab, setActiveTab] = useState(1);

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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="1">Course Details</TabsTrigger>
          <TabsTrigger value="2">Curriculum</TabsTrigger>
        </TabsList>
        <Card className="border-gray-200">
          {/* Step 1 */}
          <TabsContent value="1" className="space-y-6">
            <BasicCourseInfoForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </TabsContent>

          {/* Step 2 */}
          <TabsContent value="2" className="space-y-6">
            <UpdateCourseSections
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
