import * as React from "react";
import * as Types from "./types";

declare function MemoryJournalFilterTag(
    props: {
        as?: React.ElementType;
        visibility?: Types.Visibility.VisibilityConditions;
        id?: Types.Basic.IdTextInput;
        text?: React.ReactNode;
        tagSlot?: Types.Devlink.Slot;
        runtimeProps?: Types.Devlink.RuntimeProps;
        filterVariant?: "Clear" | "Newest Tag" | "Family" | "Relatives" | "Friends" | "Co-Workers" | "Business Partners" | "Secondary Outline";
    }
): React.JSX.Element