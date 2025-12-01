"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog@1.1.6";
import { cn } from "./utils";
import { buttonVariants } from "./button";
function AlertDialog({
  ...props
}) {
  return /*#__PURE__*/React.createElement(AlertDialogPrimitive.Root, _extends({
    "data-slot": "alert-dialog"
  }, props));
}
function AlertDialogTrigger({
  ...props
}) {
  return /*#__PURE__*/React.createElement(AlertDialogPrimitive.Trigger, _extends({
    "data-slot": "alert-dialog-trigger"
  }, props));
}
function AlertDialogPortal({
  ...props
}) {
  return /*#__PURE__*/React.createElement(AlertDialogPrimitive.Portal, _extends({
    "data-slot": "alert-dialog-portal"
  }, props));
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AlertDialogPrimitive.Overlay, _extends({
    "data-slot": "alert-dialog-overlay",
    className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
  }, props));
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AlertDialogPortal, null, /*#__PURE__*/React.createElement(AlertDialogOverlay, null), /*#__PURE__*/React.createElement(AlertDialogPrimitive.Content, _extends({
    "data-slot": "alert-dialog-content",
    className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className)
  }, props)));
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "alert-dialog-header",
    className: cn("flex flex-col gap-2 text-center sm:text-left", className)
  }, props));
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "alert-dialog-footer",
    className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)
  }, props));
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AlertDialogPrimitive.Title, _extends({
    "data-slot": "alert-dialog-title",
    className: cn("text-lg font-semibold", className)
  }, props));
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AlertDialogPrimitive.Description, _extends({
    "data-slot": "alert-dialog-description",
    className: cn("text-muted-foreground text-sm", className)
  }, props));
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AlertDialogPrimitive.Action, _extends({
    className: cn(buttonVariants(), className)
  }, props));
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(AlertDialogPrimitive.Cancel, _extends({
    className: cn(buttonVariants({
      variant: "outline"
    }), className)
  }, props));
}
export { AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel };