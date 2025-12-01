import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
export function MultiDayPicker({
  onSelectDays,
  onClose,
  selectedDays = [],
  holidays = [],
  excludeWeekends: excludeWeekendsProp = false,
  onToggleExcludeWeekends
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [chosenDays, setChosenDays] = useState(new Set(selectedDays));
  const [excludeWeekends, setExcludeWeekends] = useState(excludeWeekendsProp);
  const getDaysInMonth = date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const getFirstDayOfMonth = date => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  const formatDate = day => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toISOString().split('T')[0];
  };
  const isWeekend = day => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  };
  const isHoliday = day => {
    return holidays.includes(formatDate(day));
  };
  const isSelected = day => {
    return chosenDays.has(formatDate(day));
  };
  const handleDateClick = day => {
    if (excludeWeekends && isWeekend(day) || isHoliday(day)) return;
    const dateStr = formatDate(day);
    const newDays = new Set(chosenDays);
    if (newDays.has(dateStr)) {
      newDays.delete(dateStr);
    } else {
      newDays.add(dateStr);
    }
    setChosenDays(newDays);
  };
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };
  const handleConfirm = () => {
    onSelectDays(Array.from(chosenDays).sort());
  };
  const monthName = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({
    length: daysInMonth
  }, (_, i) => i + 1);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold text-gray-900"
  }, "Select Course Duration Days"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-gray-400 hover:text-gray-600 transition-colors"
  }, /*#__PURE__*/React.createElement(X, {
    size: 24
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrevMonth,
    className: "p-2 hover:bg-gray-100 rounded-lg transition-colors"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 20,
    className: "text-gray-600"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "text-base font-semibold text-gray-900 min-w-[150px] text-center"
  }, monthName), /*#__PURE__*/React.createElement("button", {
    onClick: handleNextMonth,
    className: "p-2 hover:bg-gray-100 rounded-lg transition-colors"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 20,
    className: "text-gray-600"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-1 mb-2"
  }, dayNames.map(day => /*#__PURE__*/React.createElement("div", {
    key: day,
    className: `text-center text-xs font-semibold py-2 ${day === 'Sun' || day === 'Sat' ? 'text-red-500' : 'text-gray-700'}`
  }, day))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-1 mb-6"
  }, Array.from({
    length: firstDay
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: `empty-${i}`,
    className: "aspect-square"
  })), days.map(day => {
    const weekend = isWeekend(day);
    const holiday = isHoliday(day);
    const selected = isSelected(day);
    return /*#__PURE__*/React.createElement("button", {
      key: day,
      onClick: () => handleDateClick(day),
      disabled: excludeWeekends && weekend || holiday,
      title: holiday ? 'Holiday' : excludeWeekends && weekend ? 'Weekend' : '',
      className: `
                  aspect-square rounded-lg text-xs font-semibold transition-all
                  ${selected ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-700' : excludeWeekends && weekend ? 'bg-red-50 text-red-400 cursor-not-allowed opacity-40' : holiday ? 'bg-orange-50 text-orange-400 cursor-not-allowed opacity-40' : 'bg-gray-100 text-gray-900 hover:bg-blue-100 cursor-pointer'}
                `
    }, day);
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-red-50 rounded border border-red-200"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Weekends")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: excludeWeekends,
    onChange: e => {
      setExcludeWeekends(e.target.checked);
      if (onToggleExcludeWeekends) onToggleExcludeWeekends(e.target.checked);
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Exclude weekends"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-orange-50 rounded border border-orange-200"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Holidays (disabled)")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-blue-600 rounded border border-blue-700"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Selected days"))), chosenDays.size > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-600 mb-2"
  }, "Selected Days: ", chosenDays.size), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1"
  }, Array.from(chosenDays).sort().slice(0, 5).map(day => /*#__PURE__*/React.createElement("span", {
    key: day,
    className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
  }, new Date(day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }))), chosenDays.size > 5 && /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
  }, "+", chosenDays.size - 5, " more"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleConfirm,
    className: "flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed",
    disabled: chosenDays.size === 0
  }, "Confirm (", chosenDays.size, " days)"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
  }, "Cancel"))));
}