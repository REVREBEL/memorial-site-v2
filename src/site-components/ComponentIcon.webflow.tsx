import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import { ComponentIcon } from "./ComponentIcon";

export default declareComponent(ComponentIcon, {
  name: "ComponentIcon",
  group: "Memorial UI",
  props: {
    variant: props.Variant({
      name: "Icon Variant",
      options: ["Flower", "Book", "Heart", "Pie", "No Icon"],
      defaultValue: "Flower",
    }),
    iconsFlowerIconVisibility: props.Boolean({
      name: "Show Flower",
      defaultValue: true,
    }),
    iconsBookIconVisibility: props.Boolean({
      name: "Show Book",
      defaultValue: true,
    }),
    iconsHeartIconVisibility: props.Boolean({
      name: "Show Heart",
      defaultValue: true,
    }),
    iconsPieIconVisibility: props.Boolean({
      name: "Show Pie",
      defaultValue: true,
    }),
  },
});
