function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { ChevronRight, MoreHorizontal } from "lucide-react@0.487.0";
import { cn } from "./utils";
function Breadcrumb({
  ...props
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "breadcrumb",
    "data-slot": "breadcrumb"
  }, props));
}
function BreadcrumbList({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("ol", _extends({
    "data-slot": "breadcrumb-list",
    className: cn("text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5", className)
  }, props));
}
function BreadcrumbItem({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("li", _extends({
    "data-slot": "breadcrumb-item",
    className: cn("inline-flex items-center gap-1.5", className)
  }, props));
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a";
  return /*#__PURE__*/React.createElement(Comp, _extends({
    "data-slot": "breadcrumb-link",
    className: cn("hover:text-foreground transition-colors", className)
  }, props));
}
function BreadcrumbPage({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    "data-slot": "breadcrumb-page",
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("text-foreground font-normal", className)
  }, props));
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("li", _extends({
    "data-slot": "breadcrumb-separator",
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5", className)
  }, props), children ?? /*#__PURE__*/React.createElement(ChevronRight, null));
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    "data-slot": "breadcrumb-ellipsis",
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex size-9 items-center justify-center", className)
  }, props), /*#__PURE__*/React.createElement(MoreHorizontal, {
    className: "size-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "More"));
}
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };