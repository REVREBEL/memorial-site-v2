"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FilterTagsWebflowSlots } from "./FilterTagsWebflowSlots";
import { WebflowFilterPreviousNextSlots } from "./WebflowFilterPreviousNextSlots";
import * as _utils from "./utils";
import _styles from "./GuestbookComponentWebflowSlots.module.css";

export function GuestbookComponentWebflowSlots({
  as: _Component = _Builtin.Block,
  componentComponentVisibility = true,
  componentComponentId,
  guestbookMainHeadingGuestbookMainHeadingSlot,
  leftContentBlockGuestbookSubHeadingSlot,
  leftContentBlockGuestbookCountSlot,
  rightContentBlockGuestbookFormSlot,
  guestbookNameHeadingGuestbookNameHeadingSlot,
  filterTagComponentFilterTagComponentSlot,
  guestbookCard1GuestbookCardSlot,
  guestbookCard2GuestbookCardSlot,
  guestbookCard3GuestbookCardSlot,
  guestbookCard4GuestbookCardSlot,
  guestbookCard3RuntimeProps = {},
  guestbookCard5GuestbookCardSlot,
  guestbookCard6GuestbookCardSlot,
  guestbookCard7GuestbookCardSlot,
  guestbookCard8GuestbookCardSlot,
  guestbookCard1RuntimeProps = {},
  guestbookCard2RuntimeProps = {},
  guestbookCard4RuntimeProps = {},
  guestbookCard6RuntimeProps = {},
  guestbookCard5RuntimeProps = {},
  guestbookCard7RuntimeProps = {},
  guestbookCard8RuntimeProps = {},
  guestbookCard9GuestbookCardSlot,
  guestbookCard9RuntimeProps = {},
  filterPreviousNextFilterPreviousNextSlotsSlot,
  filterPreviousNextRuntimeProps = {},
  guestbookMainHeadingRuntimeProps = {},
  leftContentBlockGuestbookSubHeadingRuntimeProps = {},
  leftContentBlockGuestbookCountRuntimeProps = {},
  rightContentBlockRuntimeProps = {},
  filterTagComponentRuntimeProps = {},
  guestbookNameHeadingRuntimeProps = {},
  slot,
  slot,
  slot,
  slot,
  slot,
  slot,
  slot,
  slot,
  slot,
  slot,
  slot,
  slot,
  slot,
  slot,
}) {
  return componentComponentVisibility ? (
    <_Component
      className={_utils.cx(_styles, "component_guestbook")}
      tag="div"
      id={componentComponentId}
    >
      <_Builtin.NotSupported _atom="Slot" />
      <_Builtin.Block
        className={_utils.cx(_styles, "guestbook_form-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "section_guestbook-content")}
          id={_utils.cx(
            _styles,
            "w-node-_979f49be-b8d8-5dd3-3701-ee2451751161-5175115e"
          )}
          tag="section"
        >
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.NotSupported _atom="Slot" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "section_guestbook-form")}
          id={_utils.cx(
            _styles,
            "w-node-_979f49be-b8d8-5dd3-3701-ee2451751164-5175115e"
          )}
          tag="section"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "guestbook_form-container")}
            tag="div"
          >
            <_Builtin.NotSupported _atom="Slot" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Section
        className={_utils.cx(_styles, "guestbook-cards-section")}
        grid={{
          type: "section",
        }}
        tag="section"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "guestbook_names-container")}
          tag="div"
        >
          <_Builtin.NotSupported _atom="Slot" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "guestbook_names-section")}
          tag="section"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-bar_padding")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "component_filter-tags")}
              tag="div"
            >
              <FilterTagsWebflowSlots
                slot={
                  <GuestbookFilterTag filterVariant="Family" text="family" />
                }
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.BlockContainer
          className={_utils.cx(_styles, "guestbook_card-container")}
          id={_utils.cx(
            _styles,
            "w-node-_979f49be-b8d8-5dd3-3701-ee245175116e-5175115e"
          )}
          grid={{
            type: "container",
          }}
          tag="div"
        >
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.NotSupported _atom="Slot" />
        </_Builtin.BlockContainer>
        <_Builtin.Block
          className={_utils.cx(_styles, "filter-bar_padding")}
          tag="div"
        >
          <WebflowFilterPreviousNextSlots
            viewMoreSlot2={<ButtonNextPrevious />}
            previousSlot={<ButtonNextPrevious buttonVariantType="Previous" />}
            nextSlot={<ButtonNextPrevious buttonVariantType="Next" />}
          />
        </_Builtin.Block>
      </_Builtin.Section>
    </_Component>
  ) : null;
}
