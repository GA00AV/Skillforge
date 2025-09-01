import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export default function BasicCourseInfoForm({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
}) {
  return (
    <TabsContent value="1" className="space-y-6">
      <form>
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
              rows={6}
            />
          </div>
          <div>
            <Label htmlFor="courseCategory" className="pb-2">
              Category
            </Label>
            <Select required name="category">
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
              required
              id="coursePrice"
              type="number"
              name="price"
              placeholder="e.g., 499"
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
            {false && (
              <img
                alt="Course Thumbnail"
                className="mt-4 w-48 h-auto object-cover rounded-md"
              />
            )}
          </div>
        </CardContent>
        <div className="flex px-6 justify-between pt-6">
          <span />
          <Button
            className="bg-gray-900 hover:bg-gray-800 text-white"
            type="submit"
            onClick={() => {
              setActiveTab(activeTab + 1);
            }}
            // disabled={!isStepValid()}
          >
            Next
          </Button>
        </div>
      </form>
    </TabsContent>
  );
}
