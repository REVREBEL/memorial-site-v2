"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function MemoryJournalFilterTagsSlots(
    {
        as: _Component = _Builtin.Block,
        newestFIlterTagNewestFIlterTagRuntimeProps = {},
        newestFIlterTagNewestFilterTagSlot,
        allPostsFIlterTagAllPostsFIlterTagRuntimeProps = {},
        allPostsFIlterTagAllPostsFIlterTagSlot,
        userFilterTagsUserFilterTagsRuntimeProps = {},
        componentRuntimeProps = {},
        componentComponentId,
        componentComponentVisibility = true,
        tag3RelativeTagSlot,
        tag3RuntimeProps = {},
        tag4FriendsTagSlot,
        tag4RuntimeProps = {},
        tag4Visibility = true,
        tag5CoWorkerTagSlot,
        tag6BusinessPartnerTagSlot,
        tag5RuntimeProps = {},
        tag5Visibility = true,
        tag1Visibility = true,
        tag2Visibility = true,
        tag3Visibility = true,
        tag6Visibility = true,
        tag7ChurchFriendSlot,
        tag7RuntimeProps = {},
        tag7Visibility = true,
        tag8NeverMetTagSlot,
        tag8RuntimeProps = {},
        tag8Visibility = true,
        userFilterTagsUserFilterTagsSlot
    }
) {
    return componentComponentVisibility ? <_Component
        className="component_filter-tags"
        tag="div"
        id={componentComponentId}
        {...componentRuntimeProps}><_Builtin.Block
            className="flex_horizontal width_100percent flex-align_center gap-xsmall padding-inline_mediumn"
            tag="div">{tag1Visibility ? <_Builtin.Block tag="div" {...newestFIlterTagNewestFIlterTagRuntimeProps}>{newestFIlterTagNewestFilterTagSlot}</_Builtin.Block> : null}{tag2Visibility ? <_Builtin.Block tag="div" {...allPostsFIlterTagAllPostsFIlterTagRuntimeProps}>{allPostsFIlterTagAllPostsFIlterTagSlot}</_Builtin.Block> : null}{tag6Visibility ? <_Builtin.Block tag="div" {...userFilterTagsUserFilterTagsRuntimeProps}>{userFilterTagsUserFilterTagsSlot}</_Builtin.Block> : null}</_Builtin.Block></_Component> : null;
}