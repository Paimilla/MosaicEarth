"use client";

import React from "react";
import { SiteAssessment } from "@/types/planetary";

interface IllustrativeAssessmentCardProps {
  assessment: SiteAssessment;
  targetBodyName?: string;
}

export function IllustrativeAssessmentCard({
  assessment,
  targetBodyName,
}: IllustrativeAssessmentCardProps) {
  return (
    <div className="w-full rounded-2xl bg-[#03060c] border border-space-800 p-5 sm:p-6 shadow-2xl text-left space-y-4">
      {/* Top Header Label */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white font-sans tracking-tight">
          {assessment.title}
        </h3>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded font-semibold">
          ILLUSTRATIVE · NOT SCIENTIFICALLY SCORED
        </span>
      </div>

      {/* Main Score & Subtitle */}
      <div>
        <div className="text-3xl sm:text-4xl font-extrabold text-[#10b981] font-sans tracking-tight leading-none">
          {assessment.overallScore}/{assessment.overallMax}
        </div>
        <p className="text-xs text-slate-400 font-sans mt-1.5">
          {assessment.subtitle}
          {targetBodyName ? ` (vs ${targetBodyName})` : ""}
        </p>
      </div>

      {/* Metric Bars List */}
      <div className="space-y-3.5 pt-1">
        {assessment.dimensions.map((dim) => (
          <div key={dim.key} className="space-y-1">
            {/* Row with Label and Score */}
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold text-white font-sans text-xs sm:text-sm">
                {dim.label}
              </span>
              <span className="font-mono font-medium text-slate-200 text-xs sm:text-sm">
                {dim.score}/{dim.max}
              </span>
            </div>

            {/* Explanation / Dimension hint */}
            <div className="text-[10px] text-slate-400 font-sans -mt-0.5">
              {dim.explanation}
            </div>

            {/* Emerald Progress Bar */}
            <div className="h-1.5 w-full bg-[#162032] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#10b981] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(dim.score / dim.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Note */}
      {assessment.footerNote && (
        <div className="pt-3 border-t border-space-850/80">
          <p className="text-[11px] sm:text-xs text-slate-400 font-sans leading-relaxed">
            {assessment.footerNote}
          </p>
        </div>
      )}
    </div>
  );
}
