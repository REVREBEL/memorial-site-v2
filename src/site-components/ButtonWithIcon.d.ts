import * as React from "react";
import * as Types from "./types";

declare function ButtonWithIcon(props: {
  as?: React.ElementType;
  styleVariant?:
    | "Color Primary"
    | "Color Tertiary"
    | "Color Primary Outline"
    | "Color Tertiary Outline";
  buttonId?: Types.Basic.IdTextInput;
  visibility?: Types.Visibility.VisibilityConditions;
  buttonLink?: Types.Basic.Link;
  buttonText?: React.ReactNode;
  buttonIcon?: React.ReactNode;
  iconsFlowerIconVisibility?: Types.Visibility.VisibilityConditions;
  iconsBookIconVisibility?: Types.Visibility.VisibilityConditions;
  iconsHeartIconVisibility?: Types.Visibility.VisibilityConditions;
  iconsPieIconVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
