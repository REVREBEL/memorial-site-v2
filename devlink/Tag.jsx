"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Tag.module.css";

export function Tag({ as: _Component = _Builtin.Block, variant = "Clear" }) {
  const _styleVariantMap = {
    Clear: "",
    Primary: "w-variant-0992d1c2-1e85-66c6-5fc4-41ffecbf5acb",
    Tertiary: "w-variant-bd0e2718-84b0-337a-1973-f03ea3d8af42",
    Secondary: "w-variant-1c32fe8d-3ed1-8447-a7ac-af0c67c57ff2",
    "Primary Outline": "w-variant-c616048c-98d3-23b9-0c48-859fbbd595b8",
    "Tertiary Outline": "w-variant-27b181e2-8ffe-06c3-0497-dd1e9bffc8a7",
    "Secondary Outline": "w-variant-c41e09ae-0036-41a5-e361-e15c35a98f43",
  };

  const _activeStyleVariant = _styleVariantMap[variant];
  return (
    <_Component
      className={_utils.cx(_styles, "tag", _activeStyleVariant)}
      tag="div"
    >
      {"Tag Label"}
    </_Component>
  );
}
