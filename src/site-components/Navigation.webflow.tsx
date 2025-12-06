import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import { Navigation } from "./Navigation";

export default declareComponent(Navigation, {
  name: "Navigation",
  group: "Memorial UI",
  props: {
    memoriesText: props.Text({
      name: "Memories Text",
      defaultValue: "Share a Memory",
    }),
    timelineText: props.Text({
      name: "Timeline Text",
      defaultValue: "Life Events",
    }),
    recipesText: props.Text({
      name: "Recipes Text",
      defaultValue: "Recipes",
    }),
    homeLink: props.Link({
      name: "Home Link",
      defaultValue: { href: "#" },
    }),
    memoriesLink: props.Link({
      name: "Memories Link",
      defaultValue: { href: "/memory-journal" },
    }),
    guestbookLink: props.Link({
      name: "Guestbook Link",
      defaultValue: { href: "/memory-journal/guestbook" },
    }),
    recipesLink: props.Link({
      name: "Recipes Link",
      defaultValue: { href: "#" },
    }),
    timelineLink: props.Link({
      name: "Timeline Link",
      defaultValue: { href: "#" },
    }),
  },
});
