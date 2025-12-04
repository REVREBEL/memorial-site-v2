"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ComponentSizeVariant } from "./ComponentSizeVariant";

export function MemoryCard1X1(
    {
        as: _Component = _Builtin.Block,
        componentSizeVariantCardSizeVariant = "Primary",
        optionsCardColorVariant = "Primary",
        imageImage = "https://cdn.prod.website-files.com/69219eaa23d0fd8b7effe1fe/69297c6ba716fc21cbfb0b96_IMG_1549-Edit.avif",
        imageAltText = "__wf_reserved_inherit",
        imageVisibility = false,
        metaPostedByName = "Posted by: Gary Stringham",
        metaMemoryDate = <br />,
        previewMemoryHeadline = "Becoming a Licensed Beautician",
        previewMemoryHeadlineTag = "h1",
        detailLikeIconVisibility = true,
        detailMemoryDetail = "Patricia went on to complete cosmetology training at Boulder High School. This early chapter of her life reflected her creative spirit and her love of helping others feel their best, leading her to become a licensed beautician in Colorado.",
        cardVisability = true,
        detailLocationText = "Baseline Lake",
        cardSizeVariantCardSizeVariant = null,
        headlineTag = "h1",
        previewLinkText = "Read More ",
        metaTimeIndicator = "5 days ago"
    }
) {
    const _styleVariantMap = {
        "Primary": "",
        "Secondary": "w-variant-bc1388a3-2956-51d3-5b2a-cd6ec82a62f2",
        "Secondary Accet": "w-variant-5895fbf3-61ee-25b0-ef66-5700a0890057",
        "Tertiary": "w-variant-f1fd8323-66ff-43cd-c923-7635f0fb3d8b",
        "Tertiary Accent": "w-variant-c43689d3-b135-cd15-efed-45db3731f586"
    };

    const _activeStyleVariant = _styleVariantMap[optionsCardColorVariant];

    return cardVisability ? <_Component
        className={`component-color-variant ${_activeStyleVariant}`}
        id="w-node-_73eb0ae7-e9bf-61cd-60e7-10fbd84d8db9-d84d8db9"
        tag="div"><ComponentSizeVariant
            variant={componentSizeVariantCardSizeVariant}
            linkText={previewLinkText}
            imageImage={imageImage}
            imageVisibility={imageVisibility}
            metaMemoryData={metaMemoryDate}
            metaLocationText={detailLocationText}
            metaTimeIndicator={metaTimeIndicator}
            previewMemoryHeadlineTag={previewMemoryHeadlineTag}
            previewMemoryHeadline={previewMemoryHeadline}
            detailMemoryDetail={detailMemoryDetail}
            detailLikeIconVisibility={detailLikeIconVisibility}
            metaSharedBy={metaPostedByName}
            imageAltText={imageAltText} /></_Component> : null;
}