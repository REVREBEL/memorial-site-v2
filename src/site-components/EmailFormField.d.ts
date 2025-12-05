import * as React from "react";
import * as Types from "./types";

declare function EmailFormField(
    props: {
        as?: React.ElementType;
        emailFormFieldVisibility?: Types.Visibility.VisibilityConditions;
        emailFormFieldId?: Types.Basic.IdTextInput;
        emailFormIconVisibility?: Types.Visibility.VisibilityConditions;
        emailFormFieldLabel?: React.ReactNode;
        emailFormInputRuntimeProps?: Types.Devlink.RuntimeProps;
        emailDisclaimerVisibility?: Types.Visibility.VisibilityConditions;
        emailBottomDisclaimerLabel?: React.ReactNode;
    }
): React.JSX.Element