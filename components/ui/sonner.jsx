"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner } from "sonner@2.0.3";
const Toaster = ({
  ...props
}) => {
  const {
    theme = "system"
  } = useTheme();
  return /*#__PURE__*/React.createElement(Sonner, _extends({
    theme: theme,
    className: "toaster group",
    style: {
      "--normal-bg": "var(--popover)",
      "--normal-text": "var(--popover-foreground)",
      "--normal-border": "var(--border)"
    }
  }, props));
};
export { Toaster };