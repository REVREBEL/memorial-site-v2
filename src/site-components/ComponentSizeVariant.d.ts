import * as React from "react";
import * as Types from "./types";

declare function ComponentSizeVariant(
    props: {
        as?: React.ElementType;
        variant?: "1x1" | "2x3" | "3x2";
        imageImage?: Types.Asset.Image;
        imageAltText?: Types.Basic.AltText;
        imageVisibility?: Types.Visibility.VisibilityConditions;
        /** Month Year*/
        metaMemoryData?: React.ReactNode;
        previewMemoryHeadlineTag?: Types.Basic.HeadingTag;
        previewMemoryHeadline?: React.ReactNode;
        metaLocation?: React.ReactNode;
        detailMemoryDetail?: React.ReactNode;
        detailLikeIconVisibility?: Types.Visibility.VisibilityConditions;
        metaLocationText?: React.ReactNode;
        metaTimeIndicator?: React.ReactNode;
        metaSharedBy?: React.ReactNode;
        linkText?: React.ReactNode;
    }
): React.JSX.Element