import {
  Shield,
  Upload,
  Camera,
  History,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6">

      <div className="flex items-center gap-3 mb-10">

        <Shield size={36} />

        <div>
          <h1 className="font-bold text-xl">
            FaceMask AI
          </h1>

          <p className="text-slate-400 text-sm">
            Detection Dashboard
          </p>
        </div>

      </div>

      <nav className="space-y-3">

        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800">
          <Upload size={20} />
          Upload Detection
        </button>

        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800">
          <Camera size={20} />
          Webcam Detection
        </button>

        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800">
          <History size={20} />
          History
        </button>

      </nav>

    </aside>
  );
}