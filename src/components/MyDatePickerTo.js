import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePickerTo = () => {
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());

  return (
    <div>
      <h2 className="text-base text-black mt-2 font-semibold">Return</h2>
      <DatePicker
        selected={selectedDateTo}
        onChange={(date) => setSelectedDateTo(date)}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Select return date"
        className="text-base cursor-pointer outline-none text-black border border-green-600 rounded flex pl-2"
      />
      {selectedDateTo && (
        <p className="text-base text-gray-600">
          {selectedDateTo.toDateString()}
        </p>
      )}
    </div>
  );
};

export default MyDatePickerTo;
