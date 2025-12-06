import * as React from "react";
import * as Types from "./types";

declare function RelationshipField(props: {
  as?: React.ElementType;
  /** Select Field Options*/
  runtimePropsList?: Types.Devlink.RuntimeProps;
  slot?: Types.Devlink.Slot;
  runtimePropsLink?: Types.Devlink.RuntimeProps;
  placeholderText?: React.ReactNode;
}): React.JSX.Element;
