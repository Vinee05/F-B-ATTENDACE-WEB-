"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";
import { cn } from "./utils";
function Menubar({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.Root, _extends({
    "data-slot": "menubar",
    className: cn("bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs", className)
  }, props));
}
function MenubarMenu({
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.Menu, _extends({
    "data-slot": "menubar-menu"
  }, props));
}
function MenubarGroup({
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.Group, _extends({
    "data-slot": "menubar-group"
  }, props));
}
function MenubarPortal({
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.Portal, _extends({
    "data-slot": "menubar-portal"
  }, props));
}
function MenubarRadioGroup({
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.RadioGroup, _extends({
    "data-slot": "menubar-radio-group"
  }, props));
}
function MenubarTrigger({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.Trigger, _extends({
    "data-slot": "menubar-trigger",
    className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none", className)
  }, props));
}
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPortal, null, /*#__PURE__*/React.createElement(MenubarPrimitive.Content, _extends({
    "data-slot": "menubar-content",
    align: align,
    alignOffset: alignOffset,
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md", className)
  }, props)));
}
function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.Item, _extends({
    "data-slot": "menubar-item",
    "data-inset": inset,
    "data-variant": variant,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props));
}
function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.CheckboxItem, _extends({
    "data-slot": "menubar-checkbox-item",
    className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
    checked: checked
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React.createElement(MenubarPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(CheckIcon, {
    className: "size-4"
  }))), children);
}
function MenubarRadioItem({
  className,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.RadioItem, _extends({
    "data-slot": "menubar-radio-item",
    className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React.createElement(MenubarPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(CircleIcon, {
    className: "size-2 fill-current"
  }))), children);
}
function MenubarLabel({
  className,
  inset,
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.Label, _extends({
    "data-slot": "menubar-label",
    "data-inset": inset,
    className: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)
  }, props));
}
function MenubarSeparator({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.Separator, _extends({
    "data-slot": "menubar-separator",
    className: cn("bg-border -mx-1 my-1 h-px", className)
  }, props));
}
function MenubarShortcut({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    "data-slot": "menubar-shortcut",
    className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className)
  }, props));
}
function MenubarSub({
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.Sub, _extends({
    "data-slot": "menubar-sub"
  }, props));
}
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.SubTrigger, _extends({
    "data-slot": "menubar-sub-trigger",
    "data-inset": inset,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8", className)
  }, props), children, /*#__PURE__*/React.createElement(ChevronRightIcon, {
    className: "ml-auto h-4 w-4"
  }));
}
function MenubarSubContent({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(MenubarPrimitive.SubContent, _extends({
    "data-slot": "menubar-sub-content",
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", className)
  }, props));
}
export { Menubar, MenubarPortal, MenubarMenu, MenubarTrigger, MenubarContent, MenubarGroup, MenubarSeparator, MenubarLabel, MenubarItem, MenubarShortcut, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubTrigger, MenubarSubContent };