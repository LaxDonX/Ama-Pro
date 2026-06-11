export type ToolCategory =
  | "ads"
  | "listing"
  | "image"
  | "video"
  | "keyword"
  | "research"
  | "other";

export type ToolDefinition = {
  id: string;
  name: string;
  category: ToolCategory;
  status: "available" | "planned" | "disabled";
  description: string;
  route: string;
};

export type Task = {
  id: string;
  toolId: string;
  status: "queued" | "running" | "completed" | "failed";
  progress: number;
  createdAt: string;
  resultFiles?: {
    name: string;
    downloadUrl: string;
  }[];
};
