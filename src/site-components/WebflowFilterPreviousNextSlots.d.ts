import * as React from "react";
import * as Types from "./types";

declare function WebflowFilterPreviousNextSlots(
    props: {
        as?: React.ElementType;
        viewMoreSlotVisibility?: Types.Visibility.VisibilityConditions;
        viewMoreViewMoreSlot?: Types.Devlink.Slot;
        viewMoreSlot2?: Types.Slots.SlotContent;
        viewMoreRuntimeProps?: Types.Devlink.RuntimeProps;
        nextSlotVisibility?: Types.Visibility.VisibilityConditions;
        nextNextPageSlot?: Types.Devlink.Slot;
        nextSlot?: Types.Slots.SlotContent;
        nextRuntimeProps?: Types.Devlink.RuntimeProps;
        previousSlotVisibility?: Types.Visibility.VisibilityConditions;
        previousPreviousPageSlot?: Types.Devlink.Slot;
        previousSlot?: Types.Slots.SlotContent;
        previousRuntimeProps?: Types.Devlink.RuntimeProps;
    }
): React.JSX.Element