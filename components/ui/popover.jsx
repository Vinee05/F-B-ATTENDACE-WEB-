"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "./utils";
function Popover({
  ...props
}) {
  return /*#__PURE__*/React.createElement(PopoverPrimitive.Root, _extends({
    "data-slot": "popover"
  }, props));
}
function PopoverTrigger({
  ...props
}) {
  return /*#__PURE__*/React.createElement(PopoverPrimitive.Trigger, _extends({
    "data-slot": "popover-trigger"
  }, props));
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /*#__PURE__*/React.createElement(PopoverPrimitive.Portal, null, /*#__PURE__*/React.createElement(PopoverPrimitive.Content, _extends({
    "data-slot": "popover-content",
    align: align,
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className)
  }, props)));
}
function PopoverAnchor({
  ...props
}) {
  return /*#__PURE__*/React.createElement(PopoverPrimitive.Anchor, _extends({
    "data-slot": "popover-anchor"
  }, props));
}
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };