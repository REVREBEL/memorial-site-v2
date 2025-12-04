import * as React from "react";
import * as Types from "./types";

declare function MemoryCard1X1(
    props: {
        as?: React.ElementType;
        componentSizeVariantCardSizeVariant?: "1x1" | "2x3" | "3x2";
        optionsCardColorVariant?: "Primary" | "Secondary" | "Secondary Accet" | "Tertiary" | "Tertiary Accent";
        imageImage?: Types.Asset.Image;
        imageAltText?: Types.Basic.AltText;
        imageVisibility?: Types.Visibility.VisibilityConditions;
        metaPostedByName?: React.ReactNode;
        /** Month Year*/
        metaMemoryDate?: React.ReactNode;
        previewMemoryHeadline?: React.ReactNode;
        previewMemoryHeadlineTag?: Types.Basic.HeadingTag;
        detailLikeIconVisibility?: Types.Visibility.VisibilityConditions;
        detailMemoryDetail?: React.ReactNode;
        cardVisability?: Types.Visibility.VisibilityConditions;
        detailLocationText?: React.ReactNode;
        cardSizeVariantCardSizeVariant?: "1x1" | "2x3" | "3x2";
        headlineTag?: Types.Basic.HeadingTag;
        previewLinkText?: React.ReactNode;
        metaTimeIndicator?: React.ReactNode;
    }
): React.JSX.Element