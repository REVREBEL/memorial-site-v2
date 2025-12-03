"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ButtonFilled.module.css";

export function ButtonFilled({
  as: _Component = _Builtin.Block,
  variant = "Tertiary",
  buttonId,
  visibility = true,
  buttonText = "see the details",

  buttonLink = {
    href: "#",
  },
}) {
  const _styleVariantMap = {
    Primary: "w-variant-7562c00a-ef15-81f4-91b7-90a0fbab46c7",
    Tertiary: "",
    "Primary Outline": "w-variant-fbee5f1c-a6fd-a583-6b28-036790acb6e1",
    "Tertiary Outline": "w-variant-c189fcd3-5a4d-5795-6030-6819db69b481",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return visibility ? (
    <_Component
      className={_utils.cx(
        _styles,
        "button",
        "is-accent-tertiary",
        "hero_button",
        _activeStyleVariant
      )}
      tag="div"
      id={buttonId}
    >
      <_Builtin.Link
        className={_utils.cx(
          _styles,
          "button_label",
          "is-secondary",
          _activeStyleVariant
        )}
        button={true}
        block=""
        options={buttonLink}
      >
        {buttonText}
      </_Builtin.Link>
    </_Component>
  ) : null;
}
