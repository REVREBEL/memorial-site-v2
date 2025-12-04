import * as React from "react";
import * as Types from "./types";

declare function MemoryCard16X9(
    props: {
        as?: React.ElementType;
        imageImage?: Types.Asset.Image;
        imageAltText?: Types.Basic.AltText;
        imageVisibility?: Types.Visibility.VisibilityConditions;
        /** Month Year*/
        metaMemoryData?: React.ReactNode;
        previewMemoryHeadline?: React.ReactNode;
        previewMemoryHeadlineTag?: Types.Basic.HeadingTag;
        metaPostedByName?: React.ReactNode;
        detailLikeIconVisibility?: Types.Visibility.VisibilityConditions;
        detailMemoryDetail?: React.ReactNode;
        optionsCardColorVariant?: "Primary" | "Secondary" | "Secondary Accet" | "Terirary" | "Terirary Accent";
        cardVisibility?: Types.Visibility.VisibilityConditions;
    }
): React.JSX.Element