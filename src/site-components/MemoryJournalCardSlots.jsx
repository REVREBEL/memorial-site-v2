"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function MemoryJournalCardSlots(
    {
        as: _Component = _Builtin.Block,
        memoryJournalCardSlosMemoryJournalCardSlotsRuntimeProps = {},
        memoryJournalCardSlosMemoryJournalCardSlot,
        memoryJournalCardSlotsId,
        memoryJournalCardSlosMemoryJournalCardSlotsVisibility = true
    }
) {
    return (
        <_Component className="memory-journal_cards-section" tag="section"><_Builtin.Block className="memory-journal_card-section-padding" tag="div"><_Builtin.Block className="memory-journal_inner-form-container-copy" tag="div"><_Builtin.Block className="memory-journal_card-component" tag="div">{memoryJournalCardSlosMemoryJournalCardSlotsVisibility ? <_Builtin.Block
                            className="memory-journal_card-slot"
                            tag="div"
                            id={memoryJournalCardSlotsId}
                            {...memoryJournalCardSlosMemoryJournalCardSlotsRuntimeProps}>{memoryJournalCardSlosMemoryJournalCardSlot}</_Builtin.Block> : null}</_Builtin.Block></_Builtin.Block></_Builtin.Block></_Component>
    );
}