"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GuestbookCount.module.css";

export function GuestbookCount({
  as: _Component = _Builtin.Block,
  guestbookCountText = "7",
  visibility = true,
  description = "Family, friends, and loved ones have already signed the guestbook. Join them by adding your own message.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "guestbook_count-container")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "guestbook_count-wrapper")}
        id={_utils.cx(
          _styles,
          "w-node-d5060127-3298-5396-645e-d9e062c4df12-728a209f"
        )}
        tag="div"
      >
        {visibility ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "number-accent", "guestbook_count")}
            id={_utils.cx(
              _styles,
              "w-node-d3e658c3-2779-15e0-efb0-7233728a20a0-728a209f"
            )}
            tag="div"
          >
            {guestbookCountText}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "paragraph")}
          id={_utils.cx(
            _styles,
            "w-node-d3e658c3-2779-15e0-efb0-7233728a20a2-728a209f"
          )}
          tag="div"
        >
          {description}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
