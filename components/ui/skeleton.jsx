function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { cn } from "./utils";
function Skeleton({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "skeleton",
    className: cn("bg-accent animate-pulse rounded-md", className)
  }, props));
}
export { Skeleton };