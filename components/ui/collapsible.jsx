"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible@1.1.3";
function Collapsible({
  ...props
}) {
  return /*#__PURE__*/React.createElement(CollapsiblePrimitive.Root, _extends({
    "data-slot": "collapsible"
  }, props));
}
function CollapsibleTrigger({
  ...props
}) {
  return /*#__PURE__*/React.createElement(CollapsiblePrimitive.CollapsibleTrigger, _extends({
    "data-slot": "collapsible-trigger"
  }, props));
}
function CollapsibleContent({
  ...props
}) {
  return /*#__PURE__*/React.createElement(CollapsiblePrimitive.CollapsibleContent, _extends({
    "data-slot": "collapsible-content"
  }, props));
}
export { Collapsible, CollapsibleTrigger, CollapsibleContent };