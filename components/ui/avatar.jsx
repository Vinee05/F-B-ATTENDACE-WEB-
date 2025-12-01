"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar@1.1.3";
import { cn } from "./utils";
function Avatar({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AvatarPrimitive.Root, _extends({
    "data-slot": "avatar",
    className: cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", className)
  }, props));
}
function AvatarImage({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AvatarPrimitive.Image, _extends({
    "data-slot": "avatar-image",
    className: cn("aspect-square size-full", className)
  }, props));
}
function AvatarFallback({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AvatarPrimitive.Fallback, _extends({
    "data-slot": "avatar-fallback",
    className: cn("bg-muted flex size-full items-center justify-center rounded-full", className)
  }, props));
}
export { Avatar, AvatarImage, AvatarFallback };