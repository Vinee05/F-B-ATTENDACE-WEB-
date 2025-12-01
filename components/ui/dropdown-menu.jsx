"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";
import { cn } from "./utils";
function DropdownMenu({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Root, _extends({
    "data-slot": "dropdown-menu"
  }, props));
}
function DropdownMenuPortal({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Portal, _extends({
    "data-slot": "dropdown-menu-portal"
  }, props));
}
function DropdownMenuTrigger({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Trigger, _extends({
    "data-slot": "dropdown-menu-trigger"
  }, props));
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Portal, null, /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Content, _extends({
    "data-slot": "dropdown-menu-content",
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", className)
  }, props)));
}
function DropdownMenuGroup({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Group, _extends({
    "data-slot": "dropdown-menu-group"
  }, props));
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Item, _extends({
    "data-slot": "dropdown-menu-item",
    "data-inset": inset,
    "data-variant": variant,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props));
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.CheckboxItem, _extends({
    "data-slot": "dropdown-menu-checkbox-item",
    className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
    checked: checked
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React.createElement(DropdownMenuPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(CheckIcon, {
    className: "size-4"
  }))), children);
}
function DropdownMenuRadioGroup({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.RadioGroup, _extends({
    "data-slot": "dropdown-menu-radio-group"
  }, props));
}
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.RadioItem, _extends({
    "data-slot": "dropdown-menu-radio-item",
    className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React.createElement(DropdownMenuPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(CircleIcon, {
    className: "size-2 fill-current"
  }))), children);
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Label, _extends({
    "data-slot": "dropdown-menu-label",
    "data-inset": inset,
    className: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)
  }, props));
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Separator, _extends({
    "data-slot": "dropdown-menu-separator",
    className: cn("bg-border -mx-1 my-1 h-px", className)
  }, props));
}
function DropdownMenuShortcut({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    "data-slot": "dropdown-menu-shortcut",
    className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className)
  }, props));
}
function DropdownMenuSub({
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.Sub, _extends({
    "data-slot": "dropdown-menu-sub"
  }, props));
}
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.SubTrigger, _extends({
    "data-slot": "dropdown-menu-sub-trigger",
    "data-inset": inset,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8", className)
  }, props), children, /*#__PURE__*/React.createElement(ChevronRightIcon, {
    className: "ml-auto size-4"
  }));
}
function DropdownMenuSubContent({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(DropdownMenuPrimitive.SubContent, _extends({
    "data-slot": "dropdown-menu-sub-content",
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", className)
  }, props));
}
export { DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent };