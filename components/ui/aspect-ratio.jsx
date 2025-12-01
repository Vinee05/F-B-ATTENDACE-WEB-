"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio@1.1.2";
function AspectRatio({
  ...props
}) {
  return /*#__PURE__*/React.createElement(AspectRatioPrimitive.Root, _extends({
    "data-slot": "aspect-ratio"
  }, props));
}
export { AspectRatio };