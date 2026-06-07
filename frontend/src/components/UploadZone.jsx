import { useState } from "react";
import api from "../services/api";
import {
  Upload,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export default function UploadZone({
  setGlobalDetections,
}) {
  const [preview, setPreview] = useState(null);
  const [detections, setDetections] = useState([]);
  const [resultImage, setResultImage] = useState("");
  const [loading, setLoading] = useState(false);

  const colors = {
    "With Mask": "bg-green-500",
    "No Mask": "bg-red-500",
    "Incorrect Mask": "bg-yellow-500",
  };

  const icons = {
    "With Mask": <CheckCircle size={18} />,
    "No Mask": <XCircle size={18} />,
    "Incorrect Mask": <AlertTriangle size={18} />,
  };

  const handleUpload = async (file) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post(
        "/detect",
        formData
      );

      const newDetections =
        res.data.detections || [];

      setDetections(newDetections);

      // KPI Cards update
      setGlobalDetections(
        newDetections
      );

      setResultImage(
        res.data.image_url
      );

    } catch (err) {
      console.error(
        "Detection Error:",
        err
      );

      alert(
        "Detection Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    handleUpload(
      e.target.files[0]
    );
  };

  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      p-6
      shadow-xl
      "
    >
      <h2 className="text-2xl font-bold mb-4">
        Image Detection
      </h2>

      {/* Upload Area */}
      <label
        className="
        flex
        flex-col
        items-center
        justify-center
        border-2
        border-dashed
        border-slate-700
        rounded-2xl
        p-10
        cursor-pointer
        hover:border-blue-500
        transition
        "
      >
        <Upload size={50} />

        <p className="mt-3 text-slate-400">
          Click to Upload Image
        </p>

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={onFileChange}
        />
      </label>

      {/* Loading */}
      {loading && (
        <div className="mt-6">
          <div className="h-2 rounded bg-slate-700 overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse w-full"></div>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Running AI Detection...
          </p>
        </div>
      )}

      {/* Original Uploaded Image */}
      {preview && (
        <div className="mt-6">

          <h3 className="text-lg font-semibold mb-3">
            Uploaded Image
          </h3>

          <img
            src={preview}
            alt="preview"
            className="
            w-full
            rounded-xl
            border
            border-slate-700
            "
          />
        </div>
      )}

      {/* Detection Results */}
      {detections.length > 0 && (
        <div className="mt-6">

          <h3 className="font-semibold text-lg mb-4">
            Detection Results
          </h3>

          <div className="space-y-3">

            {detections.map(
              (item, index) => (
                <div
                  key={index}
                  className="
                  bg-slate-800
                  rounded-xl
                  p-4
                  "
                >
                  <div className="flex justify-between">

                    <div className="flex items-center gap-2">

                      {
                        icons[
                          item.label
                        ]
                      }

                      <span>
                        {
                          item.label
                        }
                      </span>

                    </div>

                    <span
                      className={`
                      ${
                        colors[
                          item.label
                        ]
                      }
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      `}
                    >
                      {(
                        item.confidence *
                        100
                      ).toFixed(1)}
                      %
                    </span>

                  </div>

                  <div className="mt-3 h-2 bg-slate-700 rounded">

                    <div
                      className={`
                      h-full
                      rounded
                      ${
                        colors[
                          item.label
                        ]
                      }
                      `}
                      style={{
                        width: `${
                          item.confidence *
                          100
                        }%`,
                      }}
                    />

                  </div>

                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* Processed Image */}
      {resultImage && (
        <div className="mt-6">

          <h3 className="text-lg font-semibold mb-3">
            Processed Result
          </h3>

          <img
            src={`${resultImage}?t=${Date.now()}`}
            alt="result"
            className="
            w-full
            rounded-xl
            border
            border-slate-700
            shadow-xl
            "
          />

        </div>
      )}

      {/* AI Summary */}
      {detections.length > 0 && (
        <div
          className="
          mt-6
          bg-slate-800
          rounded-xl
          p-5
          "
        >
          <h3 className="font-bold text-lg mb-3">
            AI Analysis
          </h3>

          {detections.map(
            (item, index) => (
              <div
                key={index}
                className="mb-3"
              >
                <p>
                  Status:
                  <span className="font-semibold ml-2">
                    {item.label}
                  </span>
                </p>

                <p>
                  Confidence:
                  {" "}
                  {(
                    item.confidence *
                    100
                  ).toFixed(2)}
                  %
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}