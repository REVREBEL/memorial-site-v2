"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MemoryCard1X1 } from "./MemoryCard1X1";
import { MemoryCard16X9 } from "./MemoryCard16X9";

export function MemoryDateCard(
    {
        as: _Component = _Builtin.Block,
        variant = "1x1"
    }
) {
    const _styleVariantMap = {
        "1x1": "",
        "16x9": "w-variant-4ac62fef-6919-e36d-ebf1-62e5579a3b0e"
    };

    const _activeStyleVariant = _styleVariantMap[variant];
    return <_Component className={`div-block-45 ${_activeStyleVariant}`} tag="div"><MemoryCard1X1 cardVisability={false} /><MemoryCard16X9 /></_Component>;
}