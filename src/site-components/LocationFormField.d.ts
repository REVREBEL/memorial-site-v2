import * as React from "react";
import * as Types from "./types";

declare function LocationFormField(
    props: {
        as?: React.ElementType;
        locationFormFieldVisibility?: Types.Visibility.VisibilityConditions;
        locationFormFieldId?: Types.Basic.IdTextInput;
        locationFormFieldLabel?: React.ReactNode;
        locationFormIconVisibility?: Types.Visibility.VisibilityConditions;
        locationFormInputRuntimeProps?: Types.Devlink.RuntimeProps;
    }
): React.JSX.Element