import * as React from "react";

declare function Tag(props: {
  as?: React.ElementType;
  variant?:
    | "Clear"
    | "Primary"
    | "Tertiary"
    | "Secondary"
    | "Primary Outline"
    | "Tertiary Outline"
    | "Secondary Outline";
}): React.JSX.Element;
