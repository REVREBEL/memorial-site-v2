"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function MemoryJournalFilterTag(
    {
        as: _Component = _Builtin.Block,
        visibility = true,
        id,
        text = "Tag Label",
        tagSlot,
        runtimeProps = {},
        filterVariant = "Clear"
    }
) {
    const _styleVariantMap = {
        "Clear": "",
        "Newest Tag": "w-variant-9fb2eb3d-a5bc-b47f-4f19-31d5bf56b4b7",
        "Family": "w-variant-9fb2eb3d-a5bc-b47f-4f19-31d5bf56b4b8",
        "Relatives": "w-variant-9fb2eb3d-a5bc-b47f-4f19-31d5bf56b4b9",
        "Friends": "w-variant-9fb2eb3d-a5bc-b47f-4f19-31d5bf56b4ba",
        "Co-Workers": "w-variant-9fb2eb3d-a5bc-b47f-4f19-31d5bf56b4bb",
        "Business Partners": "w-variant-9fb2eb3d-a5bc-b47f-4f19-31d5bf56b4bc",
        "Secondary Outline": "w-variant-9fb2eb3d-a5bc-b47f-4f19-31d5bf56b4bd"
    };

    const _activeStyleVariant = _styleVariantMap[filterVariant];

    return visibility ? <_Component
        className={`tag ${_activeStyleVariant}`}
        tag="div"
        id={id}
        {...runtimeProps}>{tagSlot ?? text}</_Component> : null;
}