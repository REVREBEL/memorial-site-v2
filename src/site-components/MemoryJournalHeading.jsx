"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function MemoryJournalHeading(
    {
        as: _Component = _Builtin.Block,
        componentComponentId,
        componentComponentVisibility = true,
        memoryJournalMemoryJournalHeadingText = "Memory Journal",
        memoryJournalMemoryWallHeadlineTag = "h1",
        buttonFilledButtonFIlledSlot,
        buttonFilledButtonFIlledRuntimeProps = {},
        filterTagsFilterTagsVisibility = true,
        filterTagsFilterTagsSlot,
        filterTagsFilterTagsRuntimeProps = {},
        memoryJournalMemoryWallHeadingSlot,
        memoryJournalMemoryWallHeadingRuntimeProps = {},
        memoryJournalMemoryJournalSubHeadlineText = "Share your precious memories"
    }
) {
    return componentComponentVisibility ? <_Component className="memory-wall" tag="section" id={componentComponentId}><_Builtin.Block className="flex_vertical flex-align_center" tag="div"><_Builtin.Heading
                className="memory-wall_heading flex_horizontal flex-align_center margin-bottom_xsmall text-color-dark-green"
                tag={memoryJournalMemoryWallHeadlineTag}
                {...memoryJournalMemoryWallHeadingRuntimeProps}>{memoryJournalMemoryWallHeadingSlot ?? memoryJournalMemoryJournalHeadingText}</_Builtin.Heading><_Builtin.Paragraph className="paragraph">{memoryJournalMemoryJournalSubHeadlineText}</_Builtin.Paragraph></_Builtin.Block></_Component> : null;
}