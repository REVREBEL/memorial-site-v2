"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CardSizeVariant } from "./CardSizeVariant";

export function MemoryCard(
    {
        as: _Component = _Builtin.Block,
        variant = "1X1",
        metaLikeIconVisibility = true,
        memoryCard1X1PreviewMemoryHeadline = "Becoming a Licensed Beautician",
        metaMemoryData = <br />,
        metaPostedByName = "Posted by: Gary Stringham",
        imageImage = "https://cdn.prod.website-files.com/69219eaa23d0fd8b7effe1fe/69297c6ba716fc21cbfb0b96_IMG_1549-Edit.avif",
        memoryCard1X1ImageVisibility = true,
        imageAltText = "__wf_reserved_inherit",
        memoryCard1X1OptionsCardColorVariant = "1X1",
        detailMemoryDetail = "Patricia went on to complete cosmetology training at Boulder High School. This early chapter of her life reflected her creative spirit and her love of helping others feel their best, leading her to become a licensed beautician in Colorado.",
        memoryHeadlineTag = "h1",
        imageVisibility = false
    }
) {
    const _styleVariantMap = {
        "1X1": "",
        "2x3": "w-variant-81fae2e4-0c34-89aa-408d-dab213ecfbe5",
        "3x2": "w-variant-570c0bf4-401d-75a4-4fd1-e27cd6bad249"
    };

    const _activeStyleVariant = _styleVariantMap[variant];

    return (
        <_Component className={`component_card-size ${_activeStyleVariant}`} tag="div">{memoryCard1X1ImageVisibility ? <_Builtin.Block
                className={`memory-wall_image-wrapper component-color-variant ${_activeStyleVariant}`}
                id="w-node-_139fdc03-53bd-5247-8911-4a2de38924ee-6e3654b4"
                tag="div"><CardSizeVariant
                    imageVisibility={imageVisibility}
                    imageImage={imageImage}
                    imageAltText={imageAltText}
                    detailMemoryDetail={detailMemoryDetail}
                    metaMemoryData={metaMemoryData}
                    metaLikeIconVisibility={metaLikeIconVisibility}
                    memoryHeadlineTag={memoryHeadlineTag}
                    memoryCard1X1PreviewMemoryHeadline={memoryCard1X1PreviewMemoryHeadline}
                    metaPostedByName={metaPostedByName}
                    variant="3x2" /></_Builtin.Block> : null}</_Component>
    );
}