"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import { GripVerticalIcon } from "lucide-react@0.487.0";
import * as ResizablePrimitive from "react-resizable-panels@2.1.7";
import { cn } from "./utils";
function ResizablePanelGroup({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(ResizablePrimitive.PanelGroup, _extends({
    "data-slot": "resizable-panel-group",
    className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)
  }, props));
}
function ResizablePanel({
  ...props
}) {
  return /*#__PURE__*/React.createElement(ResizablePrimitive.Panel, _extends({
    "data-slot": "resizable-panel"
  }, props));
}
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(ResizablePrimitive.PanelResizeHandle, _extends({
    "data-slot": "resizable-handle",
    className: cn("bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90", className)
  }, props), withHandle && /*#__PURE__*/React.createElement("div", {
    className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border"
  }, /*#__PURE__*/React.createElement(GripVerticalIcon, {
    className: "size-2.5"
  })));
}
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };