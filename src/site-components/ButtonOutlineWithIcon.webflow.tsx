import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import { ButtonOutlineWithIcon } from "./ButtonOutlineWithIcon";

export default declareComponent(ButtonOutlineWithIcon, {
  name: "ButtonOutlineWithIcon",
  group: "Memorial UI",
  props: {
    buttonText: props.Text({
      name: "Text",
      defaultValue: "Discover her life events",
    }),
    styleVariant: props.Variant({
      name: "Variant",
      options: [
        "Color Primary",
        "Color Tertiary",
        "Color Primary Outline",
        "Color Tertiary Outline",
      ],
      defaultValue: "Color Tertiary",
    }),
    visibility: props.Boolean({ name: "Visible", defaultValue: true }),
    buttonLink: props.Link({
      name: "Link",
      defaultValue: { href: "#" },
    }),
    iconsFlowerIconVisibility: props.Boolean({
      name: "Show Flower Icon",
      defaultValue: true,
    }),
    iconsBookIconVisibility: props.Boolean({
      name: "Show Book Icon",
      defaultValue: true,
    }),
    iconsHeartIconVisibility: props.Boolean({
      name: "Show Heart Icon",
      defaultValue: true,
    }),
    iconsPieIconVisibility: props.Boolean({
      name: "Show Pie Icon",
      defaultValue: true,
    }),
  },
});
