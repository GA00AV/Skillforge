import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import {
  useMutation as useMutationGraphQl,
  useQuery as useQueryGraphQL,
} from "@apollo/client/react";
import {
  GET_BASIC_COURSEINFO,
  UPLOAD_BASIC_COURSEINFO,
} from "@/lib/graphqlClient";
import LoadingScreen from "./LoadingScreen";
import ErrorForComponent from "./ErrorForComponent";
import { useParams } from "react-router";
import type { BasicCourseReturn, ThumbnailUploadUrl } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { uploadData } from "@/lib/utils";
export default function BasicCourseInfoForm({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
}) {
  const {
    mutate: thumbnailUploader,
    isPending,
    isError,
    error: ThumbnailUploadError,
  } = useMutation({
    mutationFn: async ({ url, fileUpload }: { url: string; fileUpload: any }) =>
      await uploadData(url, fileUpload),
    onSuccess: () => setActiveTab(activeTab + 1),
  });
  const params = useParams();
  const { loading, error, data } = useQueryGraphQL<BasicCourseReturn>(
    GET_BASIC_COURSEINFO,
    {
      variables: { id: params.courseid },
    }
  );
  const [
    updateCourseBasicInfo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutationGraphQl<ThumbnailUploadUrl>(UPLOAD_BASIC_COURSEINFO);
  const [courseImage, setCourseImage] = useState<File | null>(null);
  let defaultValues: BasicCourseReturn | undefined;
  if (data) {
    if (data.course) defaultValues = { course: data.course };
  }
  const imgShowUrl = courseImage
    ? URL.createObjectURL(courseImage)
    : defaultValues
    ? defaultValues.course.thumbnail
      ? defaultValues.course.thumbnail
      : ""
    : "";
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let payload = {
      id: params.courseid,
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      category: formData.get("category"),
      thumbnail: courseImage ? true : false,
    };
    const isChanged = defaultValues
      ? defaultValues.course.category !== payload.category ||
        defaultValues.course.description !== payload.description ||
        defaultValues.course.price !== payload.price ||
        defaultValues.course.title !== payload.title ||
        courseImage
      : true;
    if (!isChanged) {
      setActiveTab(activeTab + 1);
      return;
    }
    let result = await updateCourseBasicInfo({
      variables: { data: payload },
    });
    if (result.data) {
      if (result.data.updateCourseBasicInfo.url) {
        thumbnailUploader({
          url: result.data.updateCourseBasicInfo.url,
          fileUpload: courseImage,
        });
      }
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }
  if (error && error.message !== "Course doesn't Exist!") {
    return <ErrorForComponent name={error.name} error={error.message} />;
  }
  if (mutationError) {
    return (
      <ErrorForComponent
        name={mutationError.name}
        error={mutationError.message}
      />
    );
  }
  if (isError) {
    return (
      <ErrorForComponent
        name={ThumbnailUploadError.name}
        error={ThumbnailUploadError.message}
      />
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title" className="pb-2">
            Course Title
          </Label>
          <Input
            required
            defaultValue={defaultValues ? defaultValues.course.title : ""}
            id="title"
            name="title"
            placeholder="e.g., Master JavaScript in 30 Days"
          />
        </div>
        <div>
          <Label htmlFor="description" className="pb-2">
            Course Description
          </Label>
          <Textarea
            required
            defaultValue={defaultValues ? defaultValues.course.description : ""}
            name="description"
            id="description"
            placeholder="Provide a detailed description..."
            rows={6}
          />
        </div>
        <div>
          <Label htmlFor="category" className="pb-2">
            Category
          </Label>
          <select
            id="category"
            name="category"
            required
            defaultValue={defaultValues ? defaultValues.course.category : ""}
            className="peer block w-full appearance-none rounded-md border border-input bg-background 
                       px-3 py-2 pr-8 text-sm text-foreground shadow-sm transition 
                       placeholder:text-muted-foreground 
                       focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring 
                       disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
            <option value="photography">Photography</option>
          </select>
        </div>
        <div>
          <Label htmlFor="price" className="pb-2">
            Course Price (₹)
          </Label>
          <Input
            required
            defaultValue={defaultValues ? defaultValues.course.price : ""}
            id="price"
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
            required={
              defaultValues
                ? defaultValues.course.thumbnail
                  ? false
                  : true
                : true
            }
            name="thumbnail"
            id="courseImage"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCourseImage(e.target.files ? e.target.files[0] : null)
            }
          />

          {imgShowUrl && (
            <img
              src={imgShowUrl}
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
          disabled={mutationLoading || isPending}
        >
          {!(mutationLoading || isPending) && "Next"}
          {mutationLoading && "Uploading Course..."}
          {isPending && "Uploading Thumbnail..."}
        </Button>
      </div>
    </form>
  );
}
