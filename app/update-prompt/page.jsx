import EditPrompt from "@components/EditPrompt";
import { Suspense } from "react";

export default function UpdatePromptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
}
