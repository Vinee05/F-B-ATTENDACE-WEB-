import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
export function CalendarPicker({
  onSelectDate,
  onClose,
  title,
  selectedDate
}) {
  const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const [selectedDates, setSelectedDates] = useState(selectedDate ? [selectedDate] : []);
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
  const isSelected = day => {
    return selectedDates.includes(formatDate(day));
  };
  const handleDateClick = day => {
    if (isWeekend(day)) return; // Don't select weekends

    const dateStr = formatDate(day);
    setSelectedDates([dateStr]);
    onSelectDate(dateStr);
  };
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
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
  }, title), /*#__PURE__*/React.createElement("button", {
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
    className: `text-center text-sm font-semibold py-2 ${day === 'Sun' || day === 'Sat' ? 'text-red-500' : 'text-gray-700'}`
  }, day))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-1 mb-6"
  }, Array.from({
    length: firstDay
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: `empty-${i}`,
    className: "aspect-square"
  })), days.map(day => {
    const weekend = isWeekend(day);
    const selected = isSelected(day);
    return /*#__PURE__*/React.createElement("button", {
      key: day,
      onClick: () => handleDateClick(day),
      disabled: weekend,
      className: `
                  aspect-square rounded-lg text-sm font-medium transition-all
                  ${selected ? 'bg-blue-600 text-white shadow-lg' : weekend ? 'bg-red-50 text-red-400 cursor-not-allowed opacity-50' : 'bg-gray-100 text-gray-900 hover:bg-blue-100 cursor-pointer'}
                `
    }, day);
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-3 h-3 bg-red-50 rounded mr-2"
  }), "Saturdays and Sundays are disabled"), selectedDates.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, "Selected Date:"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-blue-600"
  }, new Date(selectedDates[0]).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
  }, "Done"))));
}