"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function WebflowFilterPreviousNextSlots({
  as: _Component = _Builtin.Block,
  viewMoreSlotVisibility = true,
  viewMoreViewMoreSlot,
  viewMoreSlot2,
  viewMoreRuntimeProps = {},
  nextSlotVisibility = true,
  nextNextPageSlot,
  nextSlot,
  nextRuntimeProps = {},
  previousSlotVisibility = true,
  previousPreviousPageSlot,
  previousSlot,
  previousRuntimeProps = {},
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
        <_Builtin.NotSupported _atom="Slot" />
        <_Builtin.NotSupported _atom="Slot" />
        <_Builtin.NotSupported _atom="Slot" />
      </_Builtin.Block>
    </_Component>
  );
}
