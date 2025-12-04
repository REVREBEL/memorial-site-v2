import * as React from "react";
import * as Types from "./types";

declare function ButtonFilled(
    props: {
        as?: React.ElementType;
        variant?: "Primary" | "Tertiary" | "Primary Outline" | "Tertiary Outline";
        buttonId?: Types.Basic.IdTextInput;
        visibility?: Types.Visibility.VisibilityConditions;
        buttonText?: React.ReactNode;
        buttonLink?: Types.Basic.Link;
    }
): React.JSX.Element