import * as React from "react";
import * as Types from "./types";

declare function ComponentIcon(props: {
  as?: React.ElementType;
  variant?: "Flower" | "Book" | "Heart" | "Pie" | "No Icon";
  iconsFlowerIconVisibility?: Types.Visibility.VisibilityConditions;
  iconsBookIconVisibility?: Types.Visibility.VisibilityConditions;
  iconsHeartIconVisibility?: Types.Visibility.VisibilityConditions;
  iconsPieIconVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
