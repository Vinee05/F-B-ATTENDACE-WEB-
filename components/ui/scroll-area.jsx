"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "./utils";
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(ScrollAreaPrimitive.Root, _extends({
    "data-slot": "scroll-area",
    className: cn("relative", className)
  }, props), /*#__PURE__*/React.createElement(ScrollAreaPrimitive.Viewport, {
    "data-slot": "scroll-area-viewport",
    className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
  }, children), /*#__PURE__*/React.createElement(ScrollBar, null), /*#__PURE__*/React.createElement(ScrollAreaPrimitive.Corner, null));
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /*#__PURE__*/React.createElement(ScrollAreaPrimitive.ScrollAreaScrollbar, _extends({
    "data-slot": "scroll-area-scrollbar",
    orientation: orientation,
    className: cn("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className)
  }, props), /*#__PURE__*/React.createElement(ScrollAreaPrimitive.ScrollAreaThumb, {
    "data-slot": "scroll-area-thumb",
    className: "bg-border relative flex-1 rounded-full"
  }));
}
export { ScrollArea, ScrollBar };