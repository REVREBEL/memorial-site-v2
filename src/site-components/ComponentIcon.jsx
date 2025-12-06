"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ComponentIcon.module.css";

export function ComponentIcon({
  as: _Component = _Builtin.Block,
  variant = "Flower",
  iconsFlowerIconVisibility = true,
  iconsBookIconVisibility = true,
  iconsHeartIconVisibility = true,
  iconsPieIconVisibility = true,
}) {
  const _styleVariantMap = {
    Flower: "",
    Book: "w-variant-19786a29-f9f7-10be-b391-07e42004b0d2",
    Heart: "w-variant-d6d7dccb-1708-18f6-c76d-5fa5d2e455bd",
    Pie: "w-variant-04a49676-1b62-c1eb-d393-5ae373e3c2a6",
    "No Icon": "w-variant-e71522b7-4640-e2a2-4e30-754240250375",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component tag="div">
      {iconsFlowerIconVisibility ? (
        <_Builtin.HtmlEmbed
          className={_utils.cx(
            _styles,
            "button_icon",
            "is-secondary",
            _activeStyleVariant
          )}
          value="%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20color%3D%22currentColor%22%20stroke-width%3D%221.5%22%3E%3Cpath%20d%3D%22M6.90588%204.53682C6.50592%204.2998%206%204.58808%206%205.05299V18.947C6%2019.4119%206.50592%2019.7002%206.90588%2019.4632L18.629%2012.5162C19.0211%2012.2838%2019.0211%2011.7162%2018.629%2011.4838L6.90588%204.53682Z%22%20fill%3D%22currentColor%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"
        />
      ) : null}
      {iconsBookIconVisibility ? (
        <_Builtin.HtmlEmbed
          className={_utils.cx(
            _styles,
            "button_icon",
            "is-secondary",
            _activeStyleVariant
          )}
          value="%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20color%3D%22currentColor%22%20stroke-width%3D%221.5%22%3E%3Cpath%20d%3D%22M6.90588%204.53682C6.50592%204.2998%206%204.58808%206%205.05299V18.947C6%2019.4119%206.50592%2019.7002%206.90588%2019.4632L18.629%2012.5162C19.0211%2012.2838%2019.0211%2011.7162%2018.629%2011.4838L6.90588%204.53682Z%22%20fill%3D%22currentColor%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"
        />
      ) : null}
    </_Component>
  );
}
