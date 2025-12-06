"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ComponentSizeVariant.module.css";

const _interactionsData = JSON.parse(
    '{"events":{"e-159":{"id":"e-159","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-39","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-178"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"42559019-68e5-39f0-820b-942110e60484","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"42559019-68e5-39f0-820b-942110e60484","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764767973748},"e-160":{"id":"e-160","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-40","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-177"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"42559019-68e5-39f0-820b-942110e60484","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"42559019-68e5-39f0-820b-942110e60484","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764767973748},"e-161":{"id":"e-161","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-162"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".on-click_show","originalId":"6922263caf3f8676a995b64f|97fa6ebd-a714-35af-19e4-9e414fc7f178","appliesTo":"CLASS"},"targets":[{"selector":".on-click_show","originalId":"6922263caf3f8676a995b64f|97fa6ebd-a714-35af-19e4-9e414fc7f178","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764768029167},"e-162":{"id":"e-162","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-161"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".on-click_show","originalId":"6922263caf3f8676a995b64f|97fa6ebd-a714-35af-19e4-9e414fc7f178","appliesTo":"CLASS"},"targets":[{"selector":".on-click_show","originalId":"6922263caf3f8676a995b64f|97fa6ebd-a714-35af-19e4-9e414fc7f178","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764768029167},"e-163":{"id":"e-163","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-164"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"42559019-68e5-39f0-820b-942110e60485","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"42559019-68e5-39f0-820b-942110e60485","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764768705219},"e-164":{"id":"e-164","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-163"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"42559019-68e5-39f0-820b-942110e60485","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"42559019-68e5-39f0-820b-942110e60485","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764768705220},"e-167":{"id":"e-167","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-168"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".memory-wall_move-rotate","originalId":"692f7cd9818359e904b9f167|ec37340d-8dcb-089d-d9e3-14fd58250420","appliesTo":"CLASS"},"targets":[{"selector":".memory-wall_move-rotate","originalId":"692f7cd9818359e904b9f167|ec37340d-8dcb-089d-d9e3-14fd58250420","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764772390272},"e-168":{"id":"e-168","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-167"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".memory-wall_move-rotate","originalId":"692f7cd9818359e904b9f167|ec37340d-8dcb-089d-d9e3-14fd58250420","appliesTo":"CLASS"},"targets":[{"selector":".memory-wall_move-rotate","originalId":"692f7cd9818359e904b9f167|ec37340d-8dcb-089d-d9e3-14fd58250420","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764772390273},"e-195":{"id":"e-195","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-49","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-196"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"5dfec0d9-8b9b-bb30-cc8e-6ceb358f312a","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"5dfec0d9-8b9b-bb30-cc8e-6ceb358f312a","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764785782879},"e-196":{"id":"e-196","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-50","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-195"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"5dfec0d9-8b9b-bb30-cc8e-6ceb358f312a","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"5dfec0d9-8b9b-bb30-cc8e-6ceb358f312a","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764785782879},"e-203":{"id":"e-203","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-36","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-204"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6930921aaa3df371b6c0a733|5cc069fb-8c56-60ee-d04f-f97f30631912","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6930921aaa3df371b6c0a733|5cc069fb-8c56-60ee-d04f-f97f30631912","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764791108186},"e-205":{"id":"e-205","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-36","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-172"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"551718f1-d240-dffd-aed8-1650c9729974","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"551718f1-d240-dffd-aed8-1650c9729974","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764767934203},"e-211":{"id":"e-211","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-53","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-212"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"6930921aaa3df371b6c0a733|5f0970dd-9635-c226-22e9-d11f7f95d4df","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"6930921aaa3df371b6c0a733|5f0970dd-9635-c226-22e9-d11f7f95d4df","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764802385538},"e-212":{"id":"e-212","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-54","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-211"}},"mediaQueries":["medium","small","tiny"],"target":{"selector":".memories_posted-by","originalId":"6930921aaa3df371b6c0a733|5f0970dd-9635-c226-22e9-d11f7f95d4df","appliesTo":"CLASS"},"targets":[{"selector":".memories_posted-by","originalId":"6930921aaa3df371b6c0a733|5f0970dd-9635-c226-22e9-d11f7f95d4df","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764802385538},"e-223":{"id":"e-223","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-224"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"72a65641-083c-d3d7-a5f1-54689110319e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"72a65641-083c-d3d7-a5f1-54689110319e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1764956763749}},"actionLists":{"a-39":{"id":"a-39","title":"Show Card [ON CLICK]","actionItemGroups":[{"actionItems":[{"id":"a-39-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"42559019-68e5-39f0-820b-942110e60484"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-39-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":10,"target":{"useEventTarget":true,"id":"42559019-68e5-39f0-820b-942110e60484"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1764774729585},"a-40":{"id":"a-40","title":"Hide Card [ON CLICK]","actionItemGroups":[{"actionItems":[{"id":"a-40-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":10,"target":{"useEventTarget":true,"id":"42559019-68e5-39f0-820b-942110e60484"},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764774815444},"a-37":{"id":"a-37","title":"Show Message [ON_CLICK]","actionItemGroups":[{"actionItems":[{"id":"a-37-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"selector":".memory-wall_heading-wrapper","selectorGuids":["a11dfe58-9e14-7a84-d511-8b6e5593c092"]},"value":0,"unit":""}},{"id":"a-37-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeIn","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_bottom-paragraph","selectorGuids":["1881fdc8-69bb-9b99-b797-06a4260f0d8e"]},"value":1,"unit":""}},{"id":"a-37-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_botom-content","selectorGuids":["f302f035-1b12-87ab-fa79-ab1aa4fa0949"]},"globalSwatchId":"--_apps---colors--background-dark","rValue":41,"bValue":141,"gValue":112,"aValue":1}},{"id":"a-37-n-9","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inQuad","duration":1000,"target":{"selector":".memory-wall_top-date.memory-wall_move-rotate","selectorGuids":["b68885af-7deb-a21b-266c-2480b1c4c597","bba5e08f-da7e-a2fc-9219-e553b3e3daf5"]},"xValue":35,"yValue":130,"zValue":null,"xUnit":"px","yUnit":"px","zUnit":"px"}}]},{"actionItems":[{"id":"a-37-n-8","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inQuad","duration":1500,"target":{"selector":".memory-wall_top-date.memory-wall_move-rotate","selectorGuids":["b68885af-7deb-a21b-266c-2480b1c4c597","bba5e08f-da7e-a2fc-9219-e553b3e3daf5"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764768046901},"a-38":{"id":"a-38","title":"Show Message [OFF CLICK]","actionItemGroups":[{"actionItems":[{"id":"a-38-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"selector":".memory-wall_botom-content","selectorGuids":["f302f035-1b12-87ab-fa79-ab1aa4fa0949"]},"globalSwatchId":"","rValue":0,"bValue":0,"gValue":0,"aValue":0}},{"id":"a-38-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_bottom-paragraph","selectorGuids":["1881fdc8-69bb-9b99-b797-06a4260f0d8e"]},"value":0,"unit":""}},{"id":"a-38-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeIn","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_heading-wrapper","selectorGuids":["a11dfe58-9e14-7a84-d511-8b6e5593c092"]},"value":1,"unit":""}},{"id":"a-38-n-7","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":1000,"target":{"selector":".guestbook_month-year","selectorGuids":["1f9cb317-b6af-0acc-34ef-7423da8921cf"]},"xValue":-35,"yValue":130,"xUnit":"px","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-38-n-8","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":1500,"target":{"selector":".guestbook_month-year","selectorGuids":["1f9cb317-b6af-0acc-34ef-7423da8921cf"]},"zValue":-90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764768046901},"a-49":{"id":"a-49","title":"Show Message [ON_CLICK] 2","actionItemGroups":[{"actionItems":[{"id":"a-49-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"selector":".memory-wall_heading-wrapper","selectorGuids":["a11dfe58-9e14-7a84-d511-8b6e5593c092"]},"value":0,"unit":""}},{"id":"a-49-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeIn","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_bottom-paragraph","selectorGuids":["1881fdc8-69bb-9b99-b797-06a4260f0d8e"]},"value":1,"unit":""}},{"id":"a-49-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_botom-content","selectorGuids":["f302f035-1b12-87ab-fa79-ab1aa4fa0949"]},"globalSwatchId":"--_apps---colors--background-dark","rValue":41,"bValue":141,"gValue":112,"aValue":1}},{"id":"a-49-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inQuad","duration":1000,"target":{"selector":".memory-wall_top-date.memory-wall_move-rotate","selectorGuids":["b68885af-7deb-a21b-266c-2480b1c4c597","bba5e08f-da7e-a2fc-9219-e553b3e3daf5"]},"xValue":35,"yValue":130,"zValue":null,"xUnit":"px","yUnit":"px","zUnit":"px"}}]},{"actionItems":[{"id":"a-49-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inQuad","duration":1500,"target":{"selector":".memory-wall_top-date.memory-wall_move-rotate","selectorGuids":["b68885af-7deb-a21b-266c-2480b1c4c597","bba5e08f-da7e-a2fc-9219-e553b3e3daf5"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764768046901},"a-50":{"id":"a-50","title":"Show Message [OFF CLICK] 2","actionItemGroups":[{"actionItems":[{"id":"a-50-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"selector":".memory-wall_botom-content","selectorGuids":["f302f035-1b12-87ab-fa79-ab1aa4fa0949"]},"globalSwatchId":"","rValue":0,"bValue":0,"gValue":0,"aValue":0}},{"id":"a-50-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_bottom-paragraph","selectorGuids":["1881fdc8-69bb-9b99-b797-06a4260f0d8e"]},"value":0,"unit":""}},{"id":"a-50-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeIn","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".memory-wall_heading-wrapper","selectorGuids":["a11dfe58-9e14-7a84-d511-8b6e5593c092"]},"value":1,"unit":""}},{"id":"a-50-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":1000,"target":{"selector":".guestbook_month-year","selectorGuids":["1f9cb317-b6af-0acc-34ef-7423da8921cf"]},"xValue":-35,"yValue":130,"xUnit":"px","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-50-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":1500,"target":{"selector":".guestbook_month-year","selectorGuids":["1f9cb317-b6af-0acc-34ef-7423da8921cf"]},"zValue":-90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764768046901},"a-36":{"id":"a-36","title":"New Timed Animation","actionItemGroups":[],"useFirstGroupAsInitialState":false,"createdOn":1764767940175},"a-53":{"id":"a-53","title":"Show Message [ON_CLICK]","actionItemGroups":[{"actionItems":[{"id":"a-53-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":1000,"target":{"useEventTarget":"CHILDREN","selector":".guestbook_message-wrapper","selectorGuids":["cd68b341-d8d2-6f1f-a8dc-73b76df0959b"]},"value":0,"unit":""}},{"id":"a-53-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":1500,"target":{"useEventTarget":true,"id":"3689d08e-4566-5cce-acd7-70fe0543160f"},"value":0,"unit":""}},{"id":"a-53-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":1000,"target":{"useEventTarget":"CHILDREN","selector":".guesttbook_button-view-detail","selectorGuids":["6eb2702d-f4ab-1073-047b-4e42e6a6798c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-53-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeIn","duration":500,"target":{"useEventTarget":true,"id":"3689d08e-4566-5cce-acd7-70fe0543160f"},"value":1,"unit":""}},{"id":"a-53-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":500,"easing":"","duration":1000,"target":{"useEventTarget":"CHILDREN","selector":".guestbook_message-wrapper","selectorGuids":["cd68b341-d8d2-6f1f-a8dc-73b76df0959b"]},"value":1,"unit":""}},{"id":"a-53-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":750,"easing":"","duration":1000,"target":{"useEventTarget":"CHILDREN","selector":".guesttbook_button-view-detail","selectorGuids":["6eb2702d-f4ab-1073-047b-4e42e6a6798c"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1764768046901},"a-54":{"id":"a-54","title":"Show Message [OFF CLICK]","actionItemGroups":[{"actionItems":[{"id":"a-54-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"3689d08e-4566-5cce-acd7-70fe0543160f"},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1764768046901}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ComponentSizeVariant({
  as: _Component = _Builtin.Block,
  variant = "1x1",
  imageImage = "https://cdn.prod.website-files.com/69219eaa23d0fd8b7effe1fe/69297c6ba716fc21cbfb0b96_IMG_1549-Edit.avif",
  imageAltText = "__wf_reserved_inherit",
  imageVisibility = true,
  metaMemoryData = <br />,
  previewMemoryHeadlineTag = "h1",
  previewMemoryHeadline = "Becoming a Licensed Beautician",
  metaLocation = "Posted by: Gary Stringham",
  detailMemoryDetail = "Patricia went on to complete cosmetology training at Boulder High School. This early chapter of her life reflected her creative spirit and her love of helping others feel their best, leading her to become a licensed beautician in Colorado.",
  detailLikeIconVisibility = true,
  metaLocationText = "Baseline Lake",
  metaTimeIndicator = "5 days ago",
  metaSharedBy = "Shared by:Gary Stringham",
  linkText = "READ MORE",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  const _styleVariantMap = {
    "1x1": "",
    "2x3": "w-variant-30ff9ae0-7c8b-618e-a322-9d9459225b19",
    "3x2": "w-variant-dc71c3f1-e658-221f-ae1d-139a6bfb15d8",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={_utils.cx(_styles, "component_card-size", _activeStyleVariant)}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "color-card-2", _activeStyleVariant)}
        data-w-id="551718f1-d240-dffd-aed8-1650c9729974"
        tag="div"
      />
      {imageVisibility ? (
        <_Builtin.Image
          className={_utils.cx(
            _styles,
            "memory-wall_image",
            "colorize_on-hover",
            _activeStyleVariant
          )}
          data-w-id="42559019-68e5-39f0-820b-942110e6047e"
          width="auto"
          height="auto"
          loading="lazy"
          src={imageImage}
        />
      ) : null}
      {imageVisibility ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "image-overlay", _activeStyleVariant)}
          data-w-id="5cc069fb-8c56-60ee-d04f-f97f30631912"
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "memory-wall_top-content",
          _activeStyleVariant
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "memory-wall_heading-wrapper",
            _activeStyleVariant
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "memory-wall_top-date",
              "date-tag",
              _activeStyleVariant
            )}
            tag="div"
          >
            {metaMemoryData}
          </_Builtin.Block>
          <_Builtin.Heading
            className={_utils.cx(
              _styles,
              "memory-wall_card-heading",
              _activeStyleVariant
            )}
            tag={previewMemoryHeadlineTag}
          >
            {previewMemoryHeadline}
          </_Builtin.Heading>
          <_Builtin.Block
            className={_utils.cx(_styles, "posted-by", _activeStyleVariant)}
            tag="div"
          >
            {metaSharedBy}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "location-wrapper",
              _activeStyleVariant
            )}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon", _activeStyleVariant)}
              value="%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2224px%22%20height%3D%2224px%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20color%3D%22currentColor%22%3E%3Cpath%20d%3D%22M20%2010C20%2014.4183%2012%2022%2012%2022C12%2022%204%2014.4183%204%2010C4%205.58172%207.58172%202%2012%202C16.4183%202%2020%205.58172%2020%2010Z%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M12%2011C12.5523%2011%2013%2010.5523%2013%2010C13%209.44772%2012.5523%209%2012%209C11.4477%209%2011%209.44772%2011%2010C11%2010.5523%2011.4477%2011%2012%2011Z%22%20fill%3D%22currentColor%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "location-item",
                _activeStyleVariant
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "location", _activeStyleVariant)}
                tag="div"
              >
                {metaLocationText}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "memories_posted-by",
                _activeStyleVariant
              )}
              tag="div"
            >
              {metaTimeIndicator}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "read-more_link", _activeStyleVariant)}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "details-link",
              "tag",
              _activeStyleVariant
            )}
            tag="div"
          >
            {linkText}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "memory-wall_botom-content",
          "is-primary",
          _activeStyleVariant
        )}
        data-w-id="42559019-68e5-39f0-820b-942110e60484"
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "memory-wall_bottom-paragraph",
            _activeStyleVariant
          )}
          tag="div"
        >
          {detailMemoryDetail}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "memory_meta-wrapper",
            _activeStyleVariant
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "memory-wall_bottom-date",
              "date-tag",
              _activeStyleVariant
            )}
            tag="div"
          >
            {metaMemoryData}
          </_Builtin.Block>
          {detailLikeIconVisibility ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "like-icon", _activeStyleVariant)}
              value="%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2230px%22%20height%3D%2230px%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20color%3D%22currentColor%22%3E%3Cpath%20d%3D%22M22%208.86222C22%2010.4087%2021.4062%2011.8941%2020.3458%2012.9929C17.9049%2015.523%2015.5374%2018.1613%2013.0053%2020.5997C12.4249%2021.1505%2011.5042%2021.1304%2010.9488%2020.5547L3.65376%2012.9929C1.44875%2010.7072%201.44875%207.01723%203.65376%204.73157C5.88044%202.42345%209.50794%202.42345%2011.7346%204.73157L11.9998%205.00642L12.2648%204.73173C13.3324%203.6245%2014.7864%203%2016.3053%203C17.8242%203%2019.2781%203.62444%2020.3458%204.73157C21.4063%205.83045%2022%207.31577%2022%208.86222Z%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
