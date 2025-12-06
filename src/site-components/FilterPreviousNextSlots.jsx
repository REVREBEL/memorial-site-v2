"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FilterPreviousNextSlots.module.css";

export function FilterPreviousNextSlots({
  as: _Component = _Builtin.Block,
  viewMoreViewMoreSlot,
  viewMoreRuntimeProps = {},
  viewMoreSlotVisibility = true,
  nextRuntimeProps = {},
  nextNextPageSlot,
  previousRuntimeProps = {},
  previousFamilyTagSlot,
  nextSlotVisibility = true,
  previousSlotVisibility = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "component_filter-tags")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "flex_horizontal",
          "width_100percent",
          "flex-align_center",
          "gap-xsmall",
          "padding-inline_mediumn"
        )}
        tag="div"
      >
        {viewMoreSlotVisibility ? (
          <_Builtin.Block tag="div" {...viewMoreRuntimeProps}>
            {viewMoreViewMoreSlot}
          </_Builtin.Block>
        ) : null}
        {nextSlotVisibility ? (
          <_Builtin.Block tag="div" {...nextRuntimeProps}>
            {nextNextPageSlot}
          </_Builtin.Block>
        ) : null}
        {previousSlotVisibility ? (
          <_Builtin.Block tag="div" {...previousRuntimeProps}>
            {previousFamilyTagSlot}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
