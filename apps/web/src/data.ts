import type { Task, ToolDefinition } from "./types";

export const tools: ToolDefinition[] = [
  {
    id: "ads-diagnosis",
    name: "Ads Diagnosis",
    category: "ads",
    status: "available",
    description: "Upload performance files and generate clear optimization tasks.",
    route: "/app/tools/ads-diagnosis",
  },
  {
    id: "listing-builder",
    name: "Listing Builder",
    category: "listing",
    status: "planned",
    description: "Draft, refine, and version product listings from reusable inputs.",
    route: "/app/tools/listing-builder",
  },
  {
    id: "image-studio",
    name: "Image Studio",
    category: "image",
    status: "planned",
    description: "Prepare product visuals, creative angles, and export-ready assets.",
    route: "/app/tools/image-studio",
  },
  {
    id: "video-flow",
    name: "Video Flow",
    category: "video",
    status: "planned",
    description: "Turn product points and media into lightweight video workflows.",
    route: "/app/tools/video-flow",
  },
  {
    id: "keyword-map",
    name: "Keyword Map",
    category: "keyword",
    status: "planned",
    description: "Collect, group, and review keyword opportunities for product work.",
    route: "/app/tools/keyword-map",
  },
  {
    id: "market-research",
    name: "Market Research",
    category: "research",
    status: "planned",
    description: "Track competitors, positioning notes, and repeatable research files.",
    route: "/app/tools/market-research",
  },
];

export const tasks: Task[] = [
  {
    id: "task-1048",
    toolId: "ads-diagnosis",
    status: "completed",
    progress: 100,
    createdAt: "2026-06-10 16:42",
    resultFiles: [
      {
        name: "optimization_report.xlsx",
        downloadUrl: "#",
      },
    ],
  },
  {
    id: "task-1049",
    toolId: "listing-builder",
    status: "running",
    progress: 64,
    createdAt: "2026-06-10 17:03",
  },
  {
    id: "task-1050",
    toolId: "image-studio",
    status: "queued",
    progress: 12,
    createdAt: "2026-06-10 17:11",
  },
];
