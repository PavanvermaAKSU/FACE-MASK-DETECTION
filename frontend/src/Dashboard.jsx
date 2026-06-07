import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";
import UploadZone from "./components/UploadZone";
import WebcamDetection from "./components/WebcamDetection";

export default function Dashboard() {
  const [detections, setDetections] = useState([]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">

        <DashboardOverview
          detections={detections}
        />

        <div className="grid xl:grid-cols-2 gap-8 mt-8">

          <UploadZone
            setGlobalDetections={setDetections}
          />

          <WebcamDetection />

        </div>

      </main>
    </div>
  );
}