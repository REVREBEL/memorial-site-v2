"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Tag } from "./Tag";
import * as _utils from "./utils";
import _styles from "./FilterTagsComponent.module.css";

export function FilterTagsComponent({
  as: _Component = _Builtin.Block,
  tag1Variant = null,
  tag1Text = "Tag Label",
  tag1Id,
  tag1Visibility = true,
  tag2Text = "Tag Label",
  tag2Visibility = true,
  tag2Id,
  tag3Variant = null,
  tag3Id,
  tag3Visibility = true,
  tag3Text = "Tag Label",
  tag4Variant = null,
  tag4Text = "Tag Label",
  tag4Id,
  tag4Visibility = true,
  tag5Variant = null,
  buttonFilledButtonText = "Share a memory",
  tag5Visibility = true,
  tag5Id,
  tag6Variant = null,
  tag6Text = "Tag Label",
  tag6Visibility = true,
  tag6Id,
  tag2Variant = null,
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
        <Tag
          colorVariant={tag1Variant}
          text={tag1Text}
          visibility={tag1Visibility}
          id={tag1Id}
        />
        <Tag
          colorVariant={tag2Variant}
          text={tag2Text}
          visibility={tag2Visibility}
          id={tag2Id}
        />
        <Tag
          colorVariant={tag3Variant}
          visibility={tag3Visibility}
          text={tag3Text}
          id={tag3Id}
        />
        <Tag
          colorVariant={tag4Variant}
          text={tag4Text}
          visibility={tag4Visibility}
          id={tag4Id}
        />
        <Tag
          colorVariant={tag5Variant}
          text={buttonFilledButtonText}
          visibility={tag5Visibility}
          id={tag5Id}
        />
        <Tag
          colorVariant={tag6Variant}
          text={tag6Text}
          visibility={tag6Visibility}
          id={tag6Id}
        />
      </_Builtin.Block>
    </_Component>
  );
}
