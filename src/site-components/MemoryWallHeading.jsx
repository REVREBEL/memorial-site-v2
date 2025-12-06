"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonFilled } from "./ButtonFilled";
import { FilterTagsSlots } from "./FilterTagsSlots";
import * as _utils from "./utils";
import _styles from "./MemoryWallHeading.module.css";

export function MemoryWallHeading({
  as: _Component = _Builtin.Block,
  tag = "h1",
  title = "emory Wall",
  buttonFilledButtonText = "Share a memory",
  buttonFilledVariant = null,
  buttonFilledButtonId,

  buttonFilledButtonLink = {
    href: "#",
  },

  tag1Variant = null,
  tag2Text = "Tag Label",
  tag2Visibility = true,
  tag2Id,
  tag3Id,
  tag3Visibility = true,
  tag3Text = "Tag Label",
  tag3Variant = null,
  tag5Variant = null,
  tag5Visibility = true,
  tag5Id,
  tag6Variant = null,
  tag6Text = "Tag Label",
  tag6Visibility = true,
  tag6Id,
  tag1Text = "Tag Label",
  tag1Id,
  tag1Visibility = true,
  tag4Variant = null,
  tag4Text = "Tag Label",
  tag4Id,
  tag4Visibility = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "memory-wall")} tag="section">
      <_Builtin.Block
        className={_utils.cx(_styles, "flex_vertical", "flex-align_center")}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(
            _styles,
            "events_heading",
            "flex_horizontal",
            "flex-align_center",
            "margin-bottom_xsmall",
            "text-color-dark-green"
          )}
          tag={tag}
        >
          {title}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "margin-block_small")}
          tag="div"
        >
          <ButtonFilled
            buttonText={buttonFilledButtonText}
            variant={buttonFilledVariant}
            buttonId={buttonFilledButtonId}
            buttonLink={buttonFilledButtonLink}
          />
        </_Builtin.Block>
        <FilterTagsSlots />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "padding-global",
          "padding-section-large"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "guestbook_inner-form-container")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  );
}
