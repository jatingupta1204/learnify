import React, { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { ChevronLeft } from "lucide-react";
import { Progress } from "../../../components/ui/progress";
import { toast } from "sonner";
import axiosInstance from "../../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const UpdateLecture = () => {
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoType, setVideoType] = useState("upload"); // "upload" or "youtube"
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  /// Fetch lecture details
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await axiosInstance.get(
          `/course/getLectureById/${lectureId}`
        );
        if (response.data.success) {
          const lec = response.data.lecture;
          setTitle(lec.lectureTitle || "");
          setIsFree(lec.isPreviewFree || false);
          if (lec.videoUrl) {
            // Check if it's a YouTube URL
            if (lec.videoUrl.includes("youtube.com") || lec.videoUrl.includes("youtu.be")) {
              setVideoType("youtube");
              setYoutubeUrl(lec.videoUrl);
              setFileName("YouTube Video");
              setUploadVideoInfo({
                videoUrl: lec.videoUrl,
              });
            } else {
              // It's an uploaded video
              setVideoType("upload");
              setFileName(lec.videoUrl.split("/").pop());
              setUploadVideoInfo({
                videoUrl: lec.videoUrl,
                publicId: lec.publicId,
              });
            }
          }
        } else {
          toast.error("Lecture not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load lecture");
      }
    };
    fetchLecture();
  }, [lectureId]);

  // Handle file upload
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setMediaProgress(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        "/media/upload-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: ({ loaded, total }) =>
            setUploadProgress(Math.round((loaded * 100) / total)),
        }
      );

      if (response.data.success) {
        setUploadVideoInfo({
          videoUrl: response.data.data.url,
          publicId: response.data.data.public_id,
        });
        setUploadProgress(100);
        toast.success("Video uploaded successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload video");
    } finally {
      setTimeout(() => setMediaProgress(false), 500);
    }
  };

  // Remove lecture
  const removeLectureHandler = async () => {
    try {
      const response = await axiosInstance.delete(
        `/course/removeLecture/${lectureId}`
      );
      if (response.data.success) {
        toast.success("Lecture removed");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove lecture");
    }
  };

  // Update lecture
  const updateLectureHandler = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Title is required");
      return;
    }

    let videoInfo = null;
    if (videoType === "upload" && !uploadVideoInfo) {
      toast.error("Please upload a video file");
      return;
    }
    if (videoType === "youtube" && !youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    if (videoType === "youtube") {
      // Validate YouTube URL
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/;
      if (!youtubeRegex.test(youtubeUrl.trim())) {
        toast.error("Please enter a valid YouTube URL");
        return;
      }
      videoInfo = {
        videoUrl: youtubeUrl.trim(),
      };
    } else {
      videoInfo = uploadVideoInfo;
    }

    setLoading(true);
    try {
      const payload = {
        lectureTitle: title,
        isPreviewFree: isFree,
        videoInfo: videoInfo,
      };

      const response = await axiosInstance.put(
        `/course/${courseId}/updateLecture/${lectureId}`,
        payload
      );

      if (response.data.success) {
        toast.success("Lecture updated successfully");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 flex items-start justify-center py-6 px-4">
      <div className="w-full max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <BackButton />
          <h1 className="text-2xl font-semibold">Update Your Lecture</h1>
        </div>

        <form
          onSubmit={updateLectureHandler}
          className="bg-gray-700 border border-gray-800 rounded-lg shadow-sm p-6 space-y-6"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-medium">Edit Lecture</h2>
            <p className="text-sm text-gray-400">
              Make changes and click save when done.
            </p>
          </div>

          <div>
            <Button
              variant="destructive"
              type="button"
              onClick={removeLectureHandler}
            >
              Remove Lecture
            </Button>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter lecture title"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="video">
              Video <span className="text-red-400">*</span>
            </Label>

            {/* Video Type Selection */}
            <div className="flex gap-4 mt-2 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="videoType"
                  value="upload"
                  checked={videoType === "upload"}
                  onChange={(e) => setVideoType(e.target.value)}
                />
                <span>Upload Video</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="videoType"
                  value="youtube"
                  checked={videoType === "youtube"}
                  onChange={(e) => setVideoType(e.target.value)}
                />
                <span>YouTube Link</span>
              </label>
            </div>

            {/* Conditional Video Input */}
            {videoType === "upload" ? (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-600">
                  <span className="">Choose File</span>
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={fileChangeHandler}
                  />
                </label>
                <span className="text-sm text-gray-300">
                  {fileName || "No file chosen"}
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Input
                  type="url"
                  placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-400">
                  Enter a valid YouTube URL. The video will be embedded directly.
                </p>
              </div>
            )}
          </div>

          {/* Free Switch */}
          <div className="flex items-center gap-3">
            <Switch checked={isFree} onCheckedChange={setIsFree} />
            <Label>Is this video FREE?</Label>
          </div>

          {/* Progress */}
          {mediaProgress && (
            <div className="my-4 w-full">
              <Progress value={uploadProgress} />
              <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
            </div>
          )}

          <div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Lecture"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLecture;
