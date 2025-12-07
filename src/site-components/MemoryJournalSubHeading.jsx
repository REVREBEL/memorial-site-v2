"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MemoryJournalSubHeading.module.css";

export function MemoryJournalSubHeading({
  as: _Component = _Builtin.Block,
  componentComponentId,
  componentComponentVisibility = true,
  memoryJournalMemoryJournalHeadingText = "Memory Journal",
  memoryJournalMemoryWallHeadlineTag = "h1",
  buttonButtonRuntimeProps = {},
  buttonButtonSlot,
  buttonButtonSlotId,
  filterTagsFilterTagsVisibility = true,
  filterTagsFilterTagsSlot,
  filterTagsFilterTagsRuntimeProps = {},
  filterTagsFilterTagsId,
  memoryJournalMemoryWallHeadingSlot,
  memoryJournalMemoryWallHeadingRuntimeProps = {},
  memoryJournalMemoryJournalParagr = "Share your precious memories",
  memoryJournalMemoryJournalSubHeadingTag = "h3",
  memoryJournalMemoryJournalSubHeadingText = "share a memories",
  memoryJournalMemoryJournalSubHeadingRuntimeProps = {},
  memoryJournalMemoryJournalSubHeadingSlot,
}) {
  return componentComponentVisibility ? (
    <_Component
      className={_utils.cx(_styles, "memory-wall")}
      tag="section"
      id={componentComponentId}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "flex_vertical", "flex-align_center")}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(_styles, "memory-wall_sub-heading")}
          tag={memoryJournalMemoryJournalSubHeadingTag}
          {...memoryJournalMemoryJournalSubHeadingRuntimeProps}
        >
          {memoryJournalMemoryJournalSubHeadingSlot ??
            memoryJournalMemoryJournalSubHeadingText}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "margin-block_small")}
          tag="div"
          id={buttonButtonSlotId}
          {...buttonButtonRuntimeProps}
        >
          {buttonButtonSlot}
        </_Builtin.Block>
        {filterTagsFilterTagsVisibility ? (
          <_Builtin.Block
            tag="div"
            id={filterTagsFilterTagsId}
            {...filterTagsFilterTagsRuntimeProps}
          >
            {filterTagsFilterTagsSlot}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
