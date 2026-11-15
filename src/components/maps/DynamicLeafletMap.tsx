"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

export const DynamicLeafletMap = dynamic(
  () => import("./LeafletPlanetaryMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] sm:min-h-[620px] bg-space-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
        <span className="font-mono text-xs">Loading planetary cartographic engine...</span>
      </div>
    ),
  }
);

export default DynamicLeafletMap;
