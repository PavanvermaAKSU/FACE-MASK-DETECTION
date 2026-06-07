import {
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  ScanFace,
} from "lucide-react";

import StatsCard from "./StatsCard";

export default function DashboardOverview({
  detections,
}) {

  const total =
    detections.length;

  const withMask =
    detections.filter(
      (d) =>
        d.label === "With Mask"
    ).length;

  const noMask =
    detections.filter(
      (d) =>
        d.label === "No Mask"
    ).length;

  const incorrectMask =
    detections.filter(
      (d) =>
        d.label ===
        "Incorrect Mask"
    ).length;

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Face Mask Detection
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatsCard
          title="Total Detections"
          value={total}
          icon={<ScanFace size={24} />}
          color="bg-blue-500/20 text-blue-400"
        />

        <StatsCard
          title="With Mask"
          value={withMask}
          icon={<ShieldCheck size={24} />}
          color="bg-green-500/20 text-green-400"
        />

        <StatsCard
          title="No Mask"
          value={noMask}
          icon={<ShieldX size={24} />}
          color="bg-red-500/20 text-red-400"
        />

        <StatsCard
          title="Incorrect Mask"
          value={incorrectMask}
          icon={<AlertTriangle size={24} />}
          color="bg-yellow-500/20 text-yellow-400"
        />

      </div>

    </div>
  );
}