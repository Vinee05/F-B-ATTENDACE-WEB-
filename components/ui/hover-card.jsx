"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "./utils";
function HoverCard({
  ...props
}) {
  return /*#__PURE__*/React.createElement(HoverCardPrimitive.Root, _extends({
    "data-slot": "hover-card"
  }, props));
}
function HoverCardTrigger({
  ...props
}) {
  return /*#__PURE__*/React.createElement(HoverCardPrimitive.Trigger, _extends({
    "data-slot": "hover-card-trigger"
  }, props));
}
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /*#__PURE__*/React.createElement(HoverCardPrimitive.Portal, {
    "data-slot": "hover-card-portal"
  }, /*#__PURE__*/React.createElement(HoverCardPrimitive.Content, _extends({
    "data-slot": "hover-card-content",
    align: align,
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className)
  }, props)));
}
export { HoverCard, HoverCardTrigger, HoverCardContent };