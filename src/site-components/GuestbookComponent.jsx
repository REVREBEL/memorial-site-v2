"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GuestbookMainHeading } from "./GuestbookMainHeading";
import { GuestbookSubHeading } from "./GuestbookSubHeading";
import { GuestbookCount } from "./GuestbookCount";
import { GuestbookForm } from "./GuestbookForm";
import { GuestbookCard } from "./GuestbookCard";

const _interactionsData = JSON.parse(
    '{"events":{"e-161":{"id":"e-161","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-162"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".on-click_show","originalId":"6922263caf3f8676a995b64f|97fa6ebd-a714-35af-19e4-9e414fc7f178","appliesTo":"CLASS"},"targets":[{"selector":".on-click_show","originalId":"6922263caf3f8676a995b64f|97fa6ebd-a714-35af-19e4-9e414fc7f178","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764768029167},"e-162":{"id":"e-162","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-161"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".on-click_show","originalId":"6922263caf3f8676a995b64f|97fa6ebd-a714-35af-19e4-9e414fc7f178","appliesTo":"CLASS"},"targets":[{"selector":".on-click_show","originalId":"6922263caf3f8676a995b64f|97fa6ebd-a714-35af-19e4-9e414fc7f178","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764768029167},"e-163":{"id":"e-163","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-164"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"42559019-68e5-39f0-820b-942110e60485","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"42559019-68e5-39f0-820b-942110e60485","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764768705219},"e-164":{"id":"e-164","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-163"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"42559019-68e5-39f0-820b-942110e60485","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"42559019-68e5-39f0-820b-942110e60485","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764768705220},"e-167":{"id":"e-167","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-168"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".memory-wall_move-rotate","originalId":"692f7cd9818359e904b9f167|ec37340d-8dcb-089d-d9e3-14fd58250420","appliesTo":"CLASS"},"targets":[{"selector":".memory-wall_move-rotate","originalId":"692f7cd9818359e904b9f167|ec37340d-8dcb-089d-d9e3-14fd58250420","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764772390272},"e-168":{"id":"e-168","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-167"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".memory-wall_move-rotate","originalId":"692f7cd9818359e904b9f167|ec37340d-8dcb-089d-d9e3-14fd58250420","appliesTo":"CLASS"},"targets":[{"selector":".memory-wall_move-rotate","originalId":"692f7cd9818359e904b9f167|ec37340d-8dcb-089d-d9e3-14fd58250420","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764772390273},"e-195":{"id":"e-195","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-49","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-196"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"5dfec0d9-8b9b-bb30-cc8e-6ceb358f312a","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"5dfec0d9-8b9b-bb30-cc8e-6ceb358f312a","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764785782879},"e-196":{"id":"e-196","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-195"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"5dfec0d9-8b9b-bb30-cc8e-6ceb358f312a","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"5dfec0d9-8b9b-bb30-cc8e-6ceb358f312a","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764785782879}},"actionLists":{"a-37":{"id":"a-37","title":"Show Message [ON_CLICK]","actionItemGroups":[{"actionItems":[{"id":"a-37-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"selector":".memory-wall_heading-wrapper","selectorGuids":["a11dfe58-9e14-7a84-d511-8b6e5593c092"]},"value":0,"unit":""}},{"id":"a-37-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeIn","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_bottom-paragraph","selectorGuids":["1881fdc8-69bb-9b99-b797-06a4260f0d8e"]},"value":1,"unit":""}},{"id":"a-37-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_botom-content","selectorGuids":["f302f035-1b12-87ab-fa79-ab1aa4fa0949"]},"globalSwatchId":"--_apps---colors--background-dark","rValue":41,"bValue":141,"gValue":112,"aValue":1}},{"id":"a-37-n-9","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inQuad","duration":1000,"target":{"selector":".memory-wall_top-date.memory-wall_move-rotate","selectorGuids":["b68885af-7deb-a21b-266c-2480b1c4c597","bba5e08f-da7e-a2fc-9219-e553b3e3daf5"]},"xValue":35,"yValue":130,"zValue":null,"xUnit":"px","yUnit":"px","zUnit":"px"}}]},{"actionItems":[{"id":"a-37-n-8","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inQuad","duration":1500,"target":{"selector":".memory-wall_top-date.memory-wall_move-rotate","selectorGuids":["b68885af-7deb-a21b-266c-2480b1c4c597","bba5e08f-da7e-a2fc-9219-e553b3e3daf5"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764768046901},"a-38":{"id":"a-38","title":"Show Message [OFF CLICK]","actionItemGroups":[{"actionItems":[{"id":"a-38-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"selector":".memory-wall_botom-content","selectorGuids":["f302f035-1b12-87ab-fa79-ab1aa4fa0949"]},"globalSwatchId":"","rValue":0,"bValue":0,"gValue":0,"aValue":0}},{"id":"a-38-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_bottom-paragraph","selectorGuids":["1881fdc8-69bb-9b99-b797-06a4260f0d8e"]},"value":0,"unit":""}},{"id":"a-38-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeIn","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_heading-wrapper","selectorGuids":["a11dfe58-9e14-7a84-d511-8b6e5593c092"]},"value":1,"unit":""}},{"id":"a-38-n-7","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":1000,"target":{"selector":".guestbook_month-year","selectorGuids":["1f9cb317-b6af-0acc-34ef-7423da8921cf"]},"xValue":-35,"yValue":130,"xUnit":"px","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-38-n-8","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":1500,"target":{"selector":".guestbook_month-year","selectorGuids":["1f9cb317-b6af-0acc-34ef-7423da8921cf"]},"zValue":-90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764768046901},"a-49":{"id":"a-49","title":"Show Message [ON_CLICK] 2","actionItemGroups":[{"actionItems":[{"id":"a-49-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"selector":".memory-wall_heading-wrapper","selectorGuids":["a11dfe58-9e14-7a84-d511-8b6e5593c092"]},"value":0,"unit":""}},{"id":"a-49-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeIn","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_bottom-paragraph","selectorGuids":["1881fdc8-69bb-9b99-b797-06a4260f0d8e"]},"value":1,"unit":""}},{"id":"a-49-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_botom-content","selectorGuids":["f302f035-1b12-87ab-fa79-ab1aa4fa0949"]},"globalSwatchId":"--_apps---colors--background-dark","rValue":41,"bValue":141,"gValue":112,"aValue":1}},{"id":"a-49-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inQuad","duration":1000,"target":{"selector":".memory-wall_top-date.memory-wall_move-rotate","selectorGuids":["b68885af-7deb-a21b-266c-2480b1c4c597","bba5e08f-da7e-a2fc-9219-e553b3e3daf5"]},"xValue":35,"yValue":130,"zValue":null,"xUnit":"px","yUnit":"px","zUnit":"px"}}]},{"actionItems":[{"id":"a-49-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inQuad","duration":1500,"target":{"selector":".memory-wall_top-date.memory-wall_move-rotate","selectorGuids":["b68885af-7deb-a21b-266c-2480b1c4c597","bba5e08f-da7e-a2fc-9219-e553b3e3daf5"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764768046901},"a-50":{"id":"a-50","title":"Show Message [OFF CLICK] 2","actionItemGroups":[{"actionItems":[{"id":"a-50-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"selector":".memory-wall_botom-content","selectorGuids":["f302f035-1b12-87ab-fa79-ab1aa4fa0949"]},"globalSwatchId":"","rValue":0,"bValue":0,"gValue":0,"aValue":0}},{"id":"a-50-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_bottom-paragraph","selectorGuids":["1881fdc8-69bb-9b99-b797-06a4260f0d8e"]},"value":0,"unit":""}},{"id":"a-50-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeIn","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_heading-wrapper","selectorGuids":["a11dfe58-9e14-7a84-d511-8b6e5593c092"]},"value":1,"unit":""}},{"id":"a-50-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":1000,"target":{"selector":".guestbook_month-year","selectorGuids":["1f9cb317-b6af-0acc-34ef-7423da8921cf"]},"xValue":-35,"yValue":130,"xUnit":"px","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-50-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":1500,"target":{"selector":".guestbook_month-year","selectorGuids":["1f9cb317-b6af-0acc-34ef-7423da8921cf"]},"zValue":-90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764768046901}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function GuestbookComponent(
    {
        as: _Component = _Builtin.Block,
        subHeadlineText = "For those who wish to honor her memory, signing her guestbook is a meaningful way to contribute. You can share a heartfelt message, recount a cherished memory, or simply acknowledge your visit. Each entry enriches her legacy, weaving together the stories and sentiments of all who knew her.",
        headline = "",
        signHeadline = <>{"ign the "}<br />{"GuestBook"}</>,
        signSubHeading = "Share a message, memory, or simply let us know you visited. Every note adds to her story.",
        guestbookCount = "7",
        guestbookCard1ColorVariant = null,
        guestbookCard1GuestbookSIgnedDate = <br />,
        guestbookCard1FullName = "first name last name",
        guestbookCard1LocationText = <>{"Boulder, CO"}<br /></>,
        guestbookCard1FirstMetText = "work event",
        guestbookCard1RelationshipText = "",
        guestbookCard2ColorVariant = null,
        guestbookCard2GuestbookSIgnedDate = <br />,
        guestbookCard2FullName = "first name last name",
        guestbookCard2LocationText = <>{"Boulder, CO"}<br /></>,
        guestbookCard2FirstMetText = "work event",
        guestbookCard2RelationshipText = "",
        text = "Sign the Guestbook",
        loading = "Please wait...",
        guestbookCard6ColorVariant = null,
        guestbookCard6GuestbookSIgnedDate = <br />,
        guestbookCard6FullName = "first name last name",
        guestbookCard6LocationText = <>{"Boulder, CO"}<br /></>,
        guestbookCard5ColorVariant = null,
        guestbookCard5GuestbookSIgnedDate = <br />,
        guestbookCard5FullName = "first name last name",
        guestbookCard5FirstMetText = "work event",
        guestbookCard5LocationText = <>{"Boulder, CO"}<br /></>,
        guestbookCard5RelationshipText = "",
        guestbookCard6FirstMetText = "work event",
        guestbookCard6RelationshipText = "",
        guestbookCard4ColorVariant = null,
        guestbookCard4GuestbookSIgnedDate = <br />,
        guestbookCard4FullName = "first name last name",
        guestbookCard4FirstMetText = "work event",
        guestbookCard4LocationText = <>{"Boulder, CO"}<br /></>,
        guestbookCard4RelationshipText = "",
        guestbookFormComponentVisibility = true,
        guestbookFormComponentId,
        guestbookFormFormComponentRuntimeProps = {},
        guestbookFormFullNameFormFieldVisibility = true,
        guestbookFormFullNameFormFieldLabel = "Your Name *",
        guestbookFormFullNameFormIconVisibility = true,
        guestbookFormLocationFieldFormFieldVisibility = true,
        guestbookFormFullNameFormFieldId = "Boulder, CO "
    }
) {
    _interactions.useInteractions(_interactionsData);

    return (
        <_Component className="div-block-59" tag="div"><GuestbookMainHeading headline={headline} subHeadlineDescriptionText={subHeadlineText} /><_Builtin.Block className="guestbook_form-wrapper" tag="div"><_Builtin.Block
                    className="section_guestbook-content"
                    id="w-node-_0628f1ba-f8d1-09a1-2679-297b03b185f3-03b185e4"
                    tag="section"><GuestbookSubHeading /><GuestbookCount /></_Builtin.Block><_Builtin.Block
                    className="section_guestbook-form"
                    id="w-node-_0628f1ba-f8d1-09a1-2679-297b03b18603-03b185e4"
                    tag="section"><_Builtin.Block className="guestbook_form-container" tag="div"><GuestbookForm
                            componentVisibility={true}
                            componentId=""
                            formComponentRuntimeProps={{}}
                            fullNameFormFieldVisibility={true}
                            fullNameFormFieldId="Boulder, CO "
                            fullNameFormFieldLabel="work event"
                            fullNameFormIconVisibility={true}
                            locationFieldFormFieldVisibility={true}
                            locationFieldFormFieldId="" /></_Builtin.Block></_Builtin.Block></_Builtin.Block><_Builtin.Section
                className="guestbook-cards-section"
                grid={{
                    type: "section"
                }}
                tag="section"><_Builtin.BlockContainer
                    className="guestbook_card-container"
                    id="w-node-_0628f1ba-f8d1-09a1-2679-297b03b18653-03b185e4"
                    grid={{
                        type: "container"
                    }}
                    tag="div"><GuestbookCard
                        mainComponentColorVariant={guestbookCard1ColorVariant}
                        guestbookDateGuestbookDate={guestbookCard1GuestbookSIgnedDate}
                        nameFullName={guestbookCard1FullName}
                        locationLocationText={guestbookCard1LocationText}
                        tag1Text={guestbookCard1FirstMetText} /><GuestbookCard
                        mainComponentColorVariant={guestbookCard2ColorVariant}
                        guestbookDateGuestbookDate={guestbookCard2GuestbookSIgnedDate}
                        nameFullName={guestbookCard2FullName}
                        locationLocationText={guestbookCard2LocationText}
                        tag1Text={guestbookCard2FirstMetText} /><GuestbookCard mainComponentColorVariant="Ocean Teal" /><GuestbookCard
                        mainComponentColorVariant={guestbookCard4ColorVariant}
                        guestbookDateGuestbookDate={guestbookCard4GuestbookSIgnedDate}
                        nameFullName={guestbookCard4FullName}
                        tag1Text={guestbookCard4FirstMetText}
                        locationLocationText={guestbookCard4LocationText} /><GuestbookCard
                        mainComponentColorVariant={guestbookCard5ColorVariant}
                        guestbookDateGuestbookDate={guestbookCard5GuestbookSIgnedDate}
                        nameFullName={guestbookCard5FullName}
                        tag1Text={guestbookCard5FirstMetText}
                        locationLocationText={guestbookCard5LocationText} /><GuestbookCard
                        mainComponentColorVariant={guestbookCard6ColorVariant}
                        guestbookDateGuestbookDate={guestbookCard6GuestbookSIgnedDate}
                        nameFullName={guestbookCard6FullName}
                        locationLocationText={guestbookCard6LocationText}
                        tag1Text={guestbookCard6FirstMetText} /><_Builtin.Block
                        className="component-guestbook-card tertiary-accent tertiary"
                        id="w-node-_0628f1ba-f8d1-09a1-2679-297b03b1865a-03b185e4"
                        tag="div"><_Builtin.Block className="bg_color-block tertiary-2" tag="header" /><_Builtin.Block className="background_color-variant tertiary-3" tag="div"><_Builtin.Block className="guestbook_top-section tertiary-4" tag="div"><_Builtin.Block className="guestbook_card-wrapper tertiary-5" tag="div"><_Builtin.Block className="guestbook_date_wrapper tertiary-6" tag="div"><_Builtin.Block className="guestbook_date-label tertiary-7" tag="div">{"Signed on"}</_Builtin.Block><_Builtin.Block className="guestbook_date tertiary-8" tag="div"><_Builtin.Span className="guestbook_month-year">{"November 1978"}</_Builtin.Span><br /></_Builtin.Block></_Builtin.Block><_Builtin.Block className="guestbook_name-wrapper tertiary-9" tag="div"><_Builtin.Heading className="guestbook_name tertiary-10" tag="h2">{"first name last name"}</_Builtin.Heading><_Builtin.Block className="guestbook_location tertiary-11" tag="div"><_Builtin.HtmlEmbed
                                                className="icon-4 tertiary-accent-12 tertiary-12"
                                                value="%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2224px%22%20height%3D%2224px%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20color%3D%22currentColor%22%3E%3Cpath%20d%3D%22M20%2010C20%2014.4183%2012%2022%2012%2022C12%2022%204%2014.4183%204%2010C4%205.58172%207.58172%202%2012%202C16.4183%202%2020%205.58172%2020%2010Z%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M12%2011C12.5523%2011%2013%2010.5523%2013%2010C13%209.44772%2012.5523%209%2012%209C11.4477%209%2011%209.44772%2011%2010C11%2010.5523%2011.4477%2011%2012%2011Z%22%20fill%3D%22currentColor%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" /><_Builtin.Block className="guestbook_location-item tertiary-13" tag="div"><_Builtin.Block className="location tertiary-accent-14 tertiary-14" tag="div">{"Boulder, CO"}<br /></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block><_Builtin.Block className="guestroom_tags-wrapper tertiary-15" tag="div"><_Builtin.Block className="relationship-wrapper tertiary-16" tag="div"><_Builtin.Block className="guestbook_first-meeting tertiary-17" tag="div">{"How You Knew Eachother"}</_Builtin.Block><_Builtin.Block className="guestbook_buton-group-wrapper tertiary-18" tag="div"><_Builtin.Block className="bg-color-compoent tertiary-21" tag="div"><_Builtin.Block className="guestbook_relationship-tag tertiary-22" tag="div">{"work event"}</_Builtin.Block></_Builtin.Block><_Builtin.Block className="bg-color-compoent tertiary-21" tag="div"><_Builtin.Block className="guestbook_relationship-tag tertiary-22" tag="div">{"co-worker"}</_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block><GuestbookCard mainComponentColorVariant="Slate Blue" /><GuestbookCard mainComponentColorVariant="Slate Blue" /></_Builtin.BlockContainer></_Builtin.Section></_Component>
    );
}