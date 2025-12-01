"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp@1.4.2";
import { MinusIcon } from "lucide-react@0.487.0";
import { cn } from "./utils";
function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return /*#__PURE__*/React.createElement(OTPInput, _extends({
    "data-slot": "input-otp",
    containerClassName: cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName),
    className: cn("disabled:cursor-not-allowed", className)
  }, props));
}
function InputOTPGroup({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "input-otp-group",
    className: cn("flex items-center gap-1", className)
  }, props));
}
function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const {
    char,
    hasFakeCaret,
    isActive
  } = inputOTPContext?.slots[index] ?? {};
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "input-otp-slot",
    "data-active": isActive,
    className: cn("data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]", className)
  }, props), char, hasFakeCaret && /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-caret-blink bg-foreground h-4 w-px duration-1000"
  })));
}
function InputOTPSeparator({
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "input-otp-separator",
    role: "separator"
  }, props), /*#__PURE__*/React.createElement(MinusIcon, null));
}
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };