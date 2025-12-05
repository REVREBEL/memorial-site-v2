"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function GuestbookCount(
    {
        as: _Component = _Builtin.Block,
        guestbookCountText = "7",
        visibility = true,
        description = "Family, friends, and loved ones have already signed the guestbook. Join them by adding your own message."
    }
) {
    return (
        <_Component className="guestbook_count-container" tag="div"><_Builtin.Block
                className="guestbook_count-wrapper"
                id="w-node-d5060127-3298-5396-645e-d9e062c4df12-728a209f"
                tag="div">{visibility ? <_Builtin.Block
                    className="number-accent guestbook_count"
                    id="w-node-d3e658c3-2779-15e0-efb0-7233728a20a0-728a209f"
                    tag="div">{guestbookCountText}</_Builtin.Block> : null}<_Builtin.Block
                    className="paragraph"
                    id="w-node-d3e658c3-2779-15e0-efb0-7233728a20a2-728a209f"
                    tag="div">{description}</_Builtin.Block></_Builtin.Block></_Component>
    );
}