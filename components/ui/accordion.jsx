"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion@1.2.3";
import { ChevronDownIcon } from "lucide-react@0.487.0";
import { cn } from "./utils";
function Accordion({
  ...props
}) {
  return /*#__PURE__*/React.createElement(AccordionPrimitive.Root, _extends({
    "data-slot": "accordion"
  }, props));
}
function AccordionItem({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AccordionPrimitive.Item, _extends({
    "data-slot": "accordion-item",
    className: cn("border-b last:border-b-0", className)
  }, props));
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AccordionPrimitive.Header, {
    className: "flex"
  }, /*#__PURE__*/React.createElement(AccordionPrimitive.Trigger, _extends({
    "data-slot": "accordion-trigger",
    className: cn("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className)
  }, props), children, /*#__PURE__*/React.createElement(ChevronDownIcon, {
    className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
  })));
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AccordionPrimitive.Content, _extends({
    "data-slot": "accordion-content",
    className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
  }, props), /*#__PURE__*/React.createElement("div", {
    className: cn("pt-0 pb-4", className)
  }, children));
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };