import { declareComponent } from "@webflow/react";
import { MemoryForm } from "./MemoryForm";

const MemoryFormPreview = () => (
  <MemoryForm onSubmit={async () => {}} />
);

export default declareComponent(MemoryFormPreview, {
  name: "MemoryForm",
  group: "Memorial Site",
  description: "Memory submission form (preview only, submission disabled).",
});
