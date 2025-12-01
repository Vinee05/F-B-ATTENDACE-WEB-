function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState } from 'react';
const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
export function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const handleError = () => {
    setDidError(true);
  };
  const {
    src,
    alt,
    style,
    className,
    ...rest
  } = props;
  return didError ? /*#__PURE__*/React.createElement("div", {
    className: `inline-block bg-gray-100 text-center align-middle ${className ?? ''}`,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center w-full h-full"
  }, /*#__PURE__*/React.createElement("img", _extends({
    src: ERROR_IMG_SRC,
    alt: "Error loading image"
  }, rest, {
    "data-original-url": src
  })))) : /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt,
    className: className,
    style: style
  }, rest, {
    onError: handleError
  }));
}