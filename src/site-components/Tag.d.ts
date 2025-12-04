import * as React from "react";
import * as Types from "./types";

declare function Tag(
    props: {
        as?: React.ElementType;
        variant?: "Clear" | "Primary" | "Tertiary" | "Secondary" | "Primary Outline" | "Primary Outline Accent" | "Tertiary Outline" | "Tertiary Outline Accent" | "Secondary Outline" | "Secondary Outline Accent";
        text?: React.ReactNode;
        visibility?: Types.Visibility.VisibilityConditions;
        id?: Types.Basic.IdTextInput;
    }
): React.JSX.Element