"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "./utils";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /*#__PURE__*/React.createElement(SeparatorPrimitive.Root, _extends({
    "data-slot": "separator-root",
    decorative: decorative,
    orientation: orientation,
    className: cn("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className)
  }, props));
}
export { Separator };