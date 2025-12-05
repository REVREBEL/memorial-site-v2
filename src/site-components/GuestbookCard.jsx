"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function GuestbookCard(
    {
        as: _Component = _Builtin.Block,
        mainComponentId,
        mainComponentVisibility = true,
        mainComponentColorVariant = "Warm Sandston",
        guestbookDateId,
        guestbookDateRuntimeProps = {},
        guestbookDateDateLabel = "Added On",
        guestbookDateGuestbookDate = <br />,
        nameFullName = "first name last name",
        locationVisibility = true,
        locationIconVisibility = true,
        locationId,
        locationRuntimeProps = {},
        tag1Visibility = true,
        tag1Id,
        tag1RuntimeProps = {},
        tag1Text = "work event",
        tag2Visibility = true,
        tag2Id,
        tag2RuntimeProps = {},
        tag2Text = "co-worker",
        locationLocationText = <>{"Boulder, CO"}<br /></>
    }
) {
    const _styleVariantMap = {
        "Warm Sandston": "",
        "Slate Navy": "w-variant-db85ccea-8578-785e-3cac-50eea47c37cb",
        "Slate Blue": "w-variant-acd405c7-f8cf-c479-8d20-4182289c84fc",
        "Ocean Teal": "w-variant-3d29cd7f-708c-35e7-f839-44ba41e87c40",
        "Rustwood Red": "w-variant-1382dac3-79bd-15c9-48bb-2fad64084561",
        "Rose Clay": "w-variant-f870ba70-a76c-b3e4-5bee-5dfd8572c825"
    };

    const _activeStyleVariant = _styleVariantMap[mainComponentColorVariant];

    return mainComponentVisibility ? <_Component
        className={`component-guestbook-card component_guesbook-card ${_activeStyleVariant}`}
        id="w-node-_72a65641-083c-d3d7-a5f1-54689110319e-9110319e"
        tag="div"><_Builtin.Block className={`background_color-variant ${_activeStyleVariant}`} tag="div"><_Builtin.Block className={`guestbook_top-section ${_activeStyleVariant}`} tag="div"><_Builtin.Block className={`guestbook_card-wrapper ${_activeStyleVariant}`} tag="div"><_Builtin.Block
                        className={`guestbook_date_wrapper ${_activeStyleVariant}`}
                        tag="div"
                        id={guestbookDateId}><_Builtin.Block className={`guestbook_date-label ${_activeStyleVariant}`} tag="div">{guestbookDateDateLabel}</_Builtin.Block><_Builtin.Block
                            className={`guestbook_date ${_activeStyleVariant}`}
                            tag="div"
                            {...guestbookDateRuntimeProps}>{guestbookDateGuestbookDate}</_Builtin.Block></_Builtin.Block><_Builtin.Block className={`guestbook_name-wrapper ${_activeStyleVariant}`} tag="div"><_Builtin.Heading className={`guestbook_name ${_activeStyleVariant}`} tag="h3">{nameFullName}</_Builtin.Heading>{locationVisibility ? <_Builtin.Block
                            className={`guestbook_location ${_activeStyleVariant}`}
                            tag="div"
                            id={locationId}>{locationIconVisibility ? <_Builtin.HtmlEmbed
                                className={`icon tertiary-accent-12 ${_activeStyleVariant}`}
                                value="%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2224px%22%20height%3D%2224px%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20color%3D%22currentColor%22%3E%3Cpath%20d%3D%22M20%2010C20%2014.4183%2012%2022%2012%2022C12%2022%204%2014.4183%204%2010C4%205.58172%207.58172%202%2012%202C16.4183%202%2020%205.58172%2020%2010Z%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M12%2011C12.5523%2011%2013%2010.5523%2013%2010C13%209.44772%2012.5523%209%2012%209C11.4477%209%2011%209.44772%2011%2010C11%2010.5523%2011.4477%2011%2012%2011Z%22%20fill%3D%22currentColor%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" /> : null}<_Builtin.Block className={`guestbook_location-item ${_activeStyleVariant}`} tag="div"><_Builtin.Block
                                    className={`guesbook_location component_color ${_activeStyleVariant}`}
                                    tag="div"
                                    {...locationRuntimeProps}>{locationLocationText}</_Builtin.Block></_Builtin.Block></_Builtin.Block> : null}</_Builtin.Block><_Builtin.Block className={`guestroom_tags-wrapper ${_activeStyleVariant}`} tag="div"><_Builtin.Block className={`relationship-wrapper ${_activeStyleVariant}`} tag="div"><_Builtin.Block className={`guestbook_first-meeting ${_activeStyleVariant}`} tag="div">{"How You Knew Eachother"}</_Builtin.Block><_Builtin.Block
                                className={`guestbook_buton-group-wrapper ${_activeStyleVariant}`}
                                tag="div"><_Builtin.Block className={`bg-color-compoent ${_activeStyleVariant}`} tag="div">{tag1Visibility ? <_Builtin.Block
                                        className={`guestbook_relationship-tag ${_activeStyleVariant}`}
                                        tag="div"
                                        id={tag1Id}
                                        {...tag1RuntimeProps}>{tag1Text}</_Builtin.Block> : null}</_Builtin.Block><_Builtin.Block className={`bg-color-compoent ${_activeStyleVariant}`} tag="div">{tag2Visibility ? <_Builtin.Block
                                        className={`guestbook_relationship-tag ${_activeStyleVariant}`}
                                        tag="div"
                                        id={tag2Id}
                                        {...tag2RuntimeProps}>{tag2Text}</_Builtin.Block> : null}</_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Builtin.Block></_Component> : null;
}