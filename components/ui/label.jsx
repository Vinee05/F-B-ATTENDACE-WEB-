"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "./utils";
function Label({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(LabelPrimitive.Root, _extends({
    "data-slot": "label",
    className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className)
  }, props));
}
export { Label };