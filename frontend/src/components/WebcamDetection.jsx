import React, {
  useRef,
  useState,
  useEffect
} from "react";

import Webcam from "react-webcam";
import api from "../services/api";

export default function WebcamDetection() {

  const webcamRef = useRef(null);

  const [detections, setDetections] =
    useState([]);

  const [cameraOn, setCameraOn] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const labels = {
    0: "Incorrect Mask",
    1: "No Mask",
    2: "With Mask"
  };

  const detectFrame = async () => {

    if (
      !webcamRef.current ||
      !cameraOn
    )
      return;

    const imageSrc =
      webcamRef.current.getScreenshot();

    if (!imageSrc) return;

    const blob = await fetch(
      imageSrc
    ).then((r) => r.blob());

    const formData =
      new FormData();

    formData.append(
      "file",
      blob,
      "webcam.jpg"
    );

    try {

      setLoading(true);

      const res =
        await api.post(
          "/detect",
          formData
        );

      setDetections(
        res.data.detections
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    let interval;

    if (cameraOn) {

      interval =
        setInterval(
          detectFrame,
          3000
        );

    }

    return () => {

      if (interval)
        clearInterval(interval);

    };

  }, [cameraOn]);

  return (

    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      p-5
      "
    >

      <h2 className="text-xl font-bold mb-4">
        Live Webcam Detection
      </h2>

      {cameraOn && (

        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="
          rounded-xl
          w-full
          "
        />

      )}

      <div className="flex gap-3 mt-4">

        <button
          onClick={() =>
            setCameraOn(true)
          }
          className="
          px-4 py-2
          bg-green-600
          rounded-lg
          "
        >
          Start Camera
        </button>

        <button
          onClick={() =>
            setCameraOn(false)
          }
          className="
          px-4 py-2
          bg-red-600
          rounded-lg
          "
        >
          Stop Camera
        </button>

      </div>

      {loading && (
        <p className="mt-3">
          Detecting...
        </p>
      )}

      <div className="mt-5 space-y-2">

        {detections.map(
          (item, index) => (

            <div
              key={index}
              className="
              bg-slate-800
              rounded-xl
              p-3
              "
            >

              <p>
                {
                  labels[
                    item.class
                  ]
                }
              </p>

              <p>
                Confidence:
                {" "}
                {(item.confidence * 100).toFixed(1)}%
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}