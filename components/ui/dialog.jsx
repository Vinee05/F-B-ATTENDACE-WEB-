"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog@1.1.6";
import { XIcon } from "lucide-react@0.487.0";
import { cn } from "./utils";
function Dialog({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DialogPrimitive.Root, _extends({
    "data-slot": "dialog"
  }, props));
}
function DialogTrigger({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DialogPrimitive.Trigger, _extends({
    "data-slot": "dialog-trigger"
  }, props));
}
function DialogPortal({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DialogPrimitive.Portal, _extends({
    "data-slot": "dialog-portal"
  }, props));
}
function DialogClose({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DialogPrimitive.Close, _extends({
    "data-slot": "dialog-close"
  }, props));
}
function DialogOverlay({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DialogPrimitive.Overlay, _extends({
    "data-slot": "dialog-overlay",
    className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
  }, props));
}
function DialogContent({
  className,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DialogPortal, {
    "data-slot": "dialog-portal"
  }, /*#__PURE__*/React.createElement(DialogOverlay, null), /*#__PURE__*/React.createElement(DialogPrimitive.Content, _extends({
    "data-slot": "dialog-content",
    className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className)
  }, props), children, /*#__PURE__*/React.createElement(DialogPrimitive.Close, {
    className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  }, /*#__PURE__*/React.createElement(XIcon, null), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Close"))));
}
function DialogHeader({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-header",
    className: cn("flex flex-col gap-2 text-center sm:text-left", className)
  }, props));
}
function DialogFooter({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-footer",
    className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)
  }, props));
}
function DialogTitle({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DialogPrimitive.Title, _extends({
    "data-slot": "dialog-title",
    className: cn("text-lg leading-none font-semibold", className)
  }, props));
}
function DialogDescription({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DialogPrimitive.Description, _extends({
    "data-slot": "dialog-description",
    className: cn("text-muted-foreground text-sm", className)
  }, props));
}
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };