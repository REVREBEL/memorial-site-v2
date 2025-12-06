import * as React from "react";
import * as Types from "./types";

declare function MemoryWallHeading(props: {
  as?: React.ElementType;
  tag?: Types.Basic.HeadingTag;
  title?: React.ReactNode;
  buttonFilledButtonText?: React.ReactNode;
  buttonFilledVariant?:
    | "Primary"
    | "Tertiary"
    | "Primary Outline"
    | "Tertiary Outline";
  buttonFilledButtonId?: Types.Basic.IdTextInput;
  buttonFilledButtonLink?: Types.Basic.Link;
  tag1Variant?:
    | "Clear"
    | "Primary"
    | "Tertiary"
    | "Secondary"
    | "Primary Outline"
    | "Primary Outline Accent"
    | "Tertiary Outline"
    | "Tertiary Outline Accent"
    | "Secondary Outline"
    | "Secondary Outline Accent";
  tag2Text?: React.ReactNode;
  tag2Visibility?: Types.Visibility.VisibilityConditions;
  tag2Id?: Types.Basic.IdTextInput;
  tag3Id?: Types.Basic.IdTextInput;
  tag3Visibility?: Types.Visibility.VisibilityConditions;
  tag3Text?: React.ReactNode;
  tag3Variant?:
    | "Clear"
    | "Primary"
    | "Tertiary"
    | "Secondary"
    | "Primary Outline"
    | "Primary Outline Accent"
    | "Tertiary Outline"
    | "Tertiary Outline Accent"
    | "Secondary Outline"
    | "Secondary Outline Accent";
  tag5Variant?:
    | "Clear"
    | "Primary"
    | "Tertiary"
    | "Secondary"
    | "Primary Outline"
    | "Primary Outline Accent"
    | "Tertiary Outline"
    | "Tertiary Outline Accent"
    | "Secondary Outline"
    | "Secondary Outline Accent";
  tag5Visibility?: Types.Visibility.VisibilityConditions;
  tag5Id?: Types.Basic.IdTextInput;
  tag6Variant?:
    | "Clear"
    | "Primary"
    | "Tertiary"
    | "Secondary"
    | "Primary Outline"
    | "Primary Outline Accent"
    | "Tertiary Outline"
    | "Tertiary Outline Accent"
    | "Secondary Outline"
    | "Secondary Outline Accent";
  tag6Text?: React.ReactNode;
  tag6Visibility?: Types.Visibility.VisibilityConditions;
  tag6Id?: Types.Basic.IdTextInput;
  tag1Text?: React.ReactNode;
  tag1Id?: Types.Basic.IdTextInput;
  tag1Visibility?: Types.Visibility.VisibilityConditions;
  tag4Variant?:
    | "Clear"
    | "Primary"
    | "Tertiary"
    | "Secondary"
    | "Primary Outline"
    | "Primary Outline Accent"
    | "Tertiary Outline"
    | "Tertiary Outline Accent"
    | "Secondary Outline"
    | "Secondary Outline Accent";
  tag4Text?: React.ReactNode;
  tag4Id?: Types.Basic.IdTextInput;
  tag4Visibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
