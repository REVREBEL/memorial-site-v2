import * as React from "react";

declare function Tag(props: {
  as?: React.ElementType;
  variant?:
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
}): React.JSX.Element;
