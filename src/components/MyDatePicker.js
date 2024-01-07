import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <h2 className="text-base text-black mt-2 font-semibold">Depart</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Select departure date"
        className="text-base cursor-pointer outline-none text-black border border-green-600 rounded flex pl-2"
      />
      {selectedDate && (
        <p className="text-base text-gray-600">{selectedDate.toDateString()}</p>
      )}
    </div>
  );
};

export default MyDatePicker;
