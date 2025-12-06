import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import { Tag } from "./Tag";

export default declareComponent(Tag, {
  name: "Tag",
  group: "Memorial UI",
  props: {
    variant: props.Variant({
      name: "Variant",
      options: ["Clear", "Primary"],
      defaultValue: "Clear",
    }),
  },
});
