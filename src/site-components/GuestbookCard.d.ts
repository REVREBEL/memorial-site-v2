import * as React from "react";
import * as Types from "./types";

declare function GuestbookCard(
    props: {
        as?: React.ElementType;
        mainComponentId?: Types.Basic.IdTextInput;
        mainComponentVisibility?: Types.Visibility.VisibilityConditions;
        mainComponentColorVariant?: "Warm Sandston" | "Slate Navy" | "Slate Blue" | "Ocean Teal" | "Rustwood Red" | "Rose Clay";
        guestbookDateId?: Types.Basic.IdTextInput;
        guestbookDateRuntimeProps?: Types.Devlink.RuntimeProps;
        guestbookDateDateLabel?: React.ReactNode;
        /** MMMM / YYYY*/
        guestbookDateGuestbookDate?: React.ReactNode;
        nameFullName?: React.ReactNode;
        locationVisibility?: Types.Visibility.VisibilityConditions;
        locationIconVisibility?: Types.Visibility.VisibilityConditions;
        locationId?: Types.Basic.IdTextInput;
        locationRuntimeProps?: Types.Devlink.RuntimeProps;
        tag1Visibility?: Types.Visibility.VisibilityConditions;
        tag1Id?: Types.Basic.IdTextInput;
        tag1RuntimeProps?: Types.Devlink.RuntimeProps;
        tag1Text?: React.ReactNode;
        tag2Visibility?: Types.Visibility.VisibilityConditions;
        tag2Id?: Types.Basic.IdTextInput;
        tag2RuntimeProps?: Types.Devlink.RuntimeProps;
        tag2Text?: React.ReactNode;
        locationLocationText?: React.ReactNode;
    }
): React.JSX.Element