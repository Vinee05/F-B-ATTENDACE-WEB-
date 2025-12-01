"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon } from "lucide-react@0.487.0";
import { cn } from "./utils";
function Checkbox({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(CheckboxPrimitive.Root, _extends({
    "data-slot": "checkbox",
    className: cn("peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className)
  }, props), /*#__PURE__*/React.createElement(CheckboxPrimitive.Indicator, {
    "data-slot": "checkbox-indicator",
    className: "flex items-center justify-center text-current transition-none"
  }, /*#__PURE__*/React.createElement(CheckIcon, {
    className: "size-3.5"
  })));
}
export { Checkbox };