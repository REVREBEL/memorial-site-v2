import * as React from "react";
import * as Types from "./types";

declare function Guestbook(
    props: {
        as?: React.ElementType;
        subHeadlineText?: React.ReactNode;
        headline?: React.ReactNode;
        signHeadline?: React.ReactNode;
        signSubHeading?: React.ReactNode;
        guestbookCount?: React.ReactNode;
        guestbookCard1ColorVariant?: "Priamry" | "Tertiary" | "Tertiary Accent" | "Secondary" | "Secondary accent" | "Other";
        guestbookCard1GuestbookSIgnedDate?: React.ReactNode;
        guestbookCard1FullName?: React.ReactNode;
        guestbookCard1LocationText?: React.ReactNode;
        guestbookCard1FirstMetText?: React.ReactNode;
        guestbookCard1RelationshipText?: React.ReactNode;
        guestbookCard2ColorVariant?: "Priamry" | "Tertiary" | "Tertiary Accent" | "Secondary" | "Secondary accent" | "Other";
        guestbookCard2GuestbookSIgnedDate?: React.ReactNode;
        guestbookCard2FullName?: React.ReactNode;
        guestbookCard2LocationText?: React.ReactNode;
        guestbookCard2FirstMetText?: React.ReactNode;
        guestbookCard2RelationshipText?: React.ReactNode;
        text?: Types.Builtin.Text;
        loading?: Types.Builtin.Text;
        guestbookCard6ColorVariant?: "Priamry" | "Tertiary" | "Tertiary Accent" | "Secondary" | "Secondary accent" | "Other";
        guestbookCard6GuestbookSIgnedDate?: React.ReactNode;
        guestbookCard6FullName?: React.ReactNode;
        guestbookCard6LocationText?: React.ReactNode;
        guestbookCard5ColorVariant?: "Priamry" | "Tertiary" | "Tertiary Accent" | "Secondary" | "Secondary accent" | "Other";
        guestbookCard5GuestbookSIgnedDate?: React.ReactNode;
        guestbookCard5FullName?: React.ReactNode;
        guestbookCard5FirstMetText?: React.ReactNode;
        guestbookCard5LocationText?: React.ReactNode;
        guestbookCard5RelationshipText?: React.ReactNode;
        guestbookCard6FirstMetText?: React.ReactNode;
        guestbookCard6RelationshipText?: React.ReactNode;
        guestbookCard4ColorVariant?: "Priamry" | "Tertiary" | "Tertiary Accent" | "Secondary" | "Secondary accent" | "Other";
        guestbookCard4GuestbookSIgnedDate?: React.ReactNode;
        guestbookCard4FullName?: React.ReactNode;
        guestbookCard4FirstMetText?: React.ReactNode;
        guestbookCard4LocationText?: React.ReactNode;
        guestbookCard4RelationshipText?: React.ReactNode;
    }
): React.JSX.Element
