import * as React from "react";
import * as Types from "./types";

declare function MemoryCard(
    props: {
        as?: React.ElementType;
        variant?: "1X1" | "2x3" | "3x2";
        metaLikeIconVisibility?: Types.Visibility.VisibilityConditions;
        memoryCard1X1PreviewMemoryHeadline?: React.ReactNode;
        /** Month Year*/
        metaMemoryData?: React.ReactNode;
        metaPostedByName?: React.ReactNode;
        imageImage?: Types.Asset.Image;
        memoryCard1X1ImageVisibility?: Types.Visibility.VisibilityConditions;
        imageAltText?: Types.Basic.AltText;
        memoryCard1X1OptionsCardColorVariant?: "Primary" | "Secondary" | "Secondary Accet" | "Terirary" | "Terirary Accent";
        detailMemoryDetail?: React.ReactNode;
        memoryHeadlineTag?: Types.Basic.HeadingTag;
        imageVisibility?: Types.Visibility.VisibilityConditions;
    }
): React.JSX.Element