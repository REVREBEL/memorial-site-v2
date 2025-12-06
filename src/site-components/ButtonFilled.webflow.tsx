import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import { ButtonFilled } from "./ButtonFilled";

export default declareComponent(ButtonFilled, {
  name: "ButtonFilled",
  group: "Memorial UI",
  props: {
    buttonText: props.Text({
      name: "Text",
      defaultValue: "see the details",
    }),
    variant: props.Variant({
      name: "Variant",
      options: [
        "Primary",
        "Tertiary",
        "Primary Outline",
        "Tertiary Outline",
      ],
      defaultValue: "Tertiary",
    }),
    visibility: props.Boolean({ name: "Visible", defaultValue: true }),
    buttonLink: props.Link({
      name: "Link",
      defaultValue: { href: "#" },
    }),
  },
});
