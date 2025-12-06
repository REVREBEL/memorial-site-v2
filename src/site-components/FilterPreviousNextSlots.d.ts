import * as React from "react";
import * as Types from "./types";

declare function FilterPreviousNextSlots(props: {
  as?: React.ElementType;
  viewMoreViewMoreSlot?: Types.Devlink.Slot;
  viewMoreRuntimeProps?: Types.Devlink.RuntimeProps;
  viewMoreSlotVisibility?: Types.Visibility.VisibilityConditions;
  nextRuntimeProps?: Types.Devlink.RuntimeProps;
  nextNextPageSlot?: Types.Devlink.Slot;
  previousRuntimeProps?: Types.Devlink.RuntimeProps;
  previousFamilyTagSlot?: Types.Devlink.Slot;
  nextSlotVisibility?: Types.Visibility.VisibilityConditions;
  previousSlotVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
