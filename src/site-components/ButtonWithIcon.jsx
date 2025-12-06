"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ComponentIcon } from "./ComponentIcon";
import * as _utils from "./utils";
import _styles from "./ButtonWithIcon.module.css";

export function ButtonWithIcon({
  as: _Component = _Builtin.Block,
  styleVariant = "Color Tertiary",
  buttonId,
  visibility = true,

  buttonLink = {
    href: "#",
  },

  buttonText = "Discover heR Life events",
  buttonIcon = "",
  iconsFlowerIconVisibility = true,
  iconsBookIconVisibility = true,
  iconsHeartIconVisibility = true,
  iconsPieIconVisibility = true,
}) {
  const _styleVariantMap = {
    "Color Primary": "w-variant-ee45998d-5a43-c57c-c7d6-4808e7a72733",
    "Color Tertiary": "",
    "Color Primary Outline": "w-variant-a5b066d0-eea5-807d-c902-fb41893ff2ea",
    "Color Tertiary Outline": "w-variant-528938e1-f8f6-e1bb-79b8-a5a9da37d75a",
  };

  const _activeStyleVariant = _styleVariantMap[styleVariant];

  return visibility ? (
    <_Component
      className={_utils.cx(
        _styles,
        "button",
        "is-accent-tertiary",
        "on-accent-tertiary",
        _activeStyleVariant
      )}
      tag="div"
      id={buttonId}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "tag",
          "is-secondary",
          _activeStyleVariant
        )}
        tag="div"
      >
        <ComponentIcon
          iconsFlowerIconVisibility={iconsFlowerIconVisibility}
          iconsBookIconVisibility={iconsBookIconVisibility}
          iconsHeartIconVisibility={iconsHeartIconVisibility}
          iconsPieIconVisibility={iconsPieIconVisibility}
          variant="Pie"
        />
        <_Builtin.Link
          className={_utils.cx(
            _styles,
            "button_label",
            "is-secondary",
            "is-icon",
            _activeStyleVariant
          )}
          button={true}
          block=""
          options={buttonLink}
        >
          {buttonText}
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
