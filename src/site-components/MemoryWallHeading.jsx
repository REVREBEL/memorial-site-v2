"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonFilled } from "./ButtonFilled";
import { Tag } from "./Tag";

export function MemoryWallHeading(
    {
        as: _Component = _Builtin.Block,
        tag = "h1",
        title = "emory Wall",
        buttonFilledButtonText = "Share a memory",
        buttonFilledVariant = null,
        buttonFilledButtonId,

        buttonFilledButtonLink = {
            href: "#"
        },

        tag1Variant = null,
        tag2Text = "Tag Label",
        tag2Visibility = true,
        tag2Id,
        tag3Id,
        tag3Visibility = true,
        tag3Text = "Tag Label",
        tag3Variant = null,
        tag5Variant = null,
        tag5Visibility = true,
        tag5Id,
        tag6Variant = null,
        tag6Text = "Tag Label",
        tag6Visibility = true,
        tag6Id,
        tag1Text = "Tag Label",
        tag1Id,
        tag1Visibility = true,
        tag4Variant = null,
        tag4Text = "Tag Label",
        tag4Id,
        tag4Visibility = true
    }
) {
    return (
        <_Component className="memory-wall" tag="section"><_Builtin.Block className="flex_vertical flex-align_center" tag="div"><_Builtin.Heading
                    className="events_heading flex_horizontal flex-align_center margin-bottom_xsmall text-color-dark-green"
                    tag={tag}>{title}</_Builtin.Heading><_Builtin.Block className="margin-block_small" tag="div"><ButtonFilled
                        buttonText={buttonFilledButtonText}
                        variant={buttonFilledVariant}
                        buttonId={buttonFilledButtonId}
                        buttonLink={buttonFilledButtonLink} /></_Builtin.Block><_Builtin.Block
                    className="flex_horizontal width_100percent flex-align_center gap-xsmall padding-inline_mediumn"
                    tag="div"><Tag
                        variant={tag1Variant}
                        text={tag1Text}
                        visibility={tag1Visibility}
                        id={tag1Id} /><Tag
                        variant={tag1Variant}
                        text={tag2Text}
                        visibility={tag2Visibility}
                        id={tag2Id} /><Tag
                        variant={tag3Variant}
                        visibility={tag3Visibility}
                        text={tag3Text}
                        id={tag3Id} /><Tag
                        variant={tag4Variant}
                        text={tag4Text}
                        visibility={tag4Visibility}
                        id={tag4Id} /><Tag
                        variant={tag5Variant}
                        text={buttonFilledButtonText}
                        visibility={tag5Visibility}
                        id={tag5Id} /><Tag
                        variant={tag6Variant}
                        text={tag6Text}
                        visibility={tag6Visibility}
                        id={tag6Id} /></_Builtin.Block></_Builtin.Block><_Builtin.Block className="padding-global padding-section-large" tag="div"><_Builtin.Block className="container-xlarge" tag="div" /></_Builtin.Block></_Component>
    );
}