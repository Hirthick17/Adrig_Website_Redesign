"use client";

import dynamic from "next/dynamic";
import type { ServiceKey } from "@/content/services";
import { SceneFallback } from "./primitives/SceneFallback";

const ChatbotScene = dynamic(() => import("./scenes/ChatbotScene"), {
  loading: () => <SceneFallback />,
});

const LLMScene = dynamic(() => import("./scenes/LLMScene"), {
  loading: () => <SceneFallback />,
});

const AIAutomationScene = dynamic(() => import("./scenes/AIAutomationScene"), {
  loading: () => <SceneFallback />,
});

const WorkflowScene = dynamic(() => import("./scenes/WorkflowScene"), {
  loading: () => <SceneFallback />,
});

const DataAnalysisScene = dynamic(() => import("./scenes/DataAnalysisScene"), {
  loading: () => <SceneFallback />,
});

const SoftwareScene = dynamic(() => import("./scenes/SoftwareScene"), {
  loading: () => <SceneFallback />,
});

const ConsultationScene = dynamic(() => import("./scenes/ConsultationScene"), {
  loading: () => <SceneFallback />,
});

const SCENES: Record<ServiceKey, React.ComponentType> = {
  chatbot: ChatbotScene,
  llm: LLMScene,
  "ai-automation": AIAutomationScene,
  workflow: WorkflowScene,
  "data-analysis": DataAnalysisScene,
  software: SoftwareScene,
  consultation: ConsultationScene,
};

export function ServiceSceneRenderer({ serviceKey }: { serviceKey: ServiceKey }) {
  const Scene = SCENES[serviceKey] || ConsultationScene;
  return <Scene />;
}

export default ServiceSceneRenderer;
