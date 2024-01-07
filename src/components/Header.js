import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import MyDatePicker from "./MyDatePicker";
import MyDatePickerTo from "./MyDatePickerTo";

function Header() {
  const [travelClass, setTravelClass] = useState("Economy");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [passengerCount, setPassengerCount] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handleClassChange = (e) => {
    setTravelClass(e.target.value);
  };

  const handlePassengerChange = (type, value) => {
    setPassengerCount((prevCounts) => ({
      ...prevCounts,
      [type]: value,
    }));
  };

  const incrementPassenger = (type) => {
    handlePassengerChange(type, passengerCount[type] + 1);
  };

  const decrementPassenger = (type) => {
    if (passengerCount[type] > 0) {
      handlePassengerChange(type, passengerCount[type] - 1);
    }
  };

  const handleDropdownToggle = () => {
    const dropdown = document.getElementById("passengerDropdown");
    dropdown.classList.toggle("hidden"); // Toggle visibility class
  };

  return (
    <>
      <div className="lg:flex hidden justify-between items-center px-6 py-3 btn-bg text-white">
        <div>
          <h2 className="uppercase text-2xl font-bold">Travelfaredesk</h2>
        </div>
        <div className="flex gap-3 justify-normal items-center uppercase text-sm">
          <h2>Flights</h2>
          <h2>Hotels</h2>
          <h2>Travel by destination</h2>
          <h2>Travel by theme</h2>
          <h2>Sign Up</h2>
        </div>
      </div>
      <div className="bg-img-header lg:flex justify-center items-center w-1/2">
        <div className="lg:flex justify-between items-center max-w-lg p-3 lg:p-0 ">
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-lg p-4 flex flex-col justify-between leading-normal">
            <div className="my-3">
              <div className="flex justify-normal items-center">
                <button className="font-bold text-white text-3xl bg-gradient-primary px-6 py-3 rounded-l-md uppercase">
                  Flights
                </button>
                <button className="font-bold text-white text-3xl btn-bg px-6 py-3 rounded-r-md uppercase">
                  Hotels
                </button>
              </div>
              <div className="text-gray-400 text-3xl font-semibold mb-2 flex justify-between gap-3 items-center leading-10 mt-3">
                <div>
                  <h2 className="text-sm text-black">Origin</h2>
                  <input
                    type="text"
                    placeholder="FROM"
                    className="text-3xl font-semibold text-black outline-none"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                  <h2 className="text-lg font-semibold text-black border-b pr-3">
                    Airport/City Name
                  </h2>
                  <MyDatePicker />
                </div>
                <div>
                  <h2 className="text-sm text-black">Destination</h2>
                  <input
                    type="text"
                    placeholder="TO"
                    className="text-3xl font-semibold text-black outline-none"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <h2 className="text-lg font-semibold text-black border-b pr-3">
                    Airport/City Name
                  </h2>
                  <MyDatePickerTo />
                </div>
              </div>
              <div className="flex gap-3 justify-between items-center w-full">
                <div className="flex-1">
                  <label
                    className="text-sm text-black font-semibold"
                    htmlFor="class"
                  >
                    Class
                  </label>
                  <select
                    id="class"
                    className="block appearance-none w-full bg-white border text-sm border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                    value={travelClass}
                    onChange={handleClassChange}
                  >
                    <option value="Economy">Economy</option>
                    <option value="PremiumEconomy">Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    className="text-sm text-black font-semibold"
                    htmlFor="passengers"
                  >
                    Passengers
                  </label>
                  <div className="relative">
                    <button
                      className="block appearance-none text-sm w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      onClick={handleDropdownToggle}
                    >
                      {`${passengerCount.adults} Adult${
                        passengerCount.adults !== 1 ? "s" : ""
                      }, ${passengerCount.children} Child${
                        passengerCount.children !== 1 ? "ren" : ""
                      }, ${passengerCount.infants} Infant${
                        passengerCount.infants !== 1 ? "s" : ""
                      }`}
                    </button>
                    <div
                      id="passengerDropdown"
                      className="hidden absolute z-50 bg-white border border-gray-400 mt-1 w-48 rounded-md shadow-lg"
                    >
                      <div className="flex flex-col gap-2 p-2">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            className="text-sm text-gray-700 hover:text-gray-900 bg-green-300 px-3 py-2 rounded"
                            onClick={() => incrementPassenger("adults")}
                          >
                            + Adult
                          </button>
                          <button
                            className="text-sm text-gray-700 hover:text-gray-900 bg-red-300 px-3 py-2 rounded"
                            onClick={() => decrementPassenger("adults")}
                          >
                            - Adult
                          </button>
                        </div>
                        <div className="flex justify-center items-center gap-3">
                          <button
                            className="text-sm text-gray-700 hover:text-gray-900 bg-green-300 px-3 py-2 rounded"
                            onClick={() => incrementPassenger("children")}
                          >
                            + Child
                          </button>
                          <button
                            className="text-sm text-gray-700 hover:text-gray-900 bg-red-300 px-3 py-2 rounded"
                            onClick={() => decrementPassenger("children")}
                          >
                            - Child
                          </button>
                        </div>
                        <div className="flex justify-center items-center gap-3">
                          <button
                            className="text-sm text-gray-700 hover:text-gray-900 bg-green-300 px-3 py-2 rounded"
                            onClick={() => incrementPassenger("infants")}
                          >
                            + Infant
                          </button>
                          <button
                            className="text-sm text-gray-700 hover:text-gray-900 bg-red-300 px-3 py-2 rounded"
                            onClick={() => decrementPassenger("infants")}
                          >
                            - Infant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button className="uppercase font-bold text-white w-full mt-3 rounded-xl py-3 text-xl bg-green-700 transition duration-300 ease-in-out hover:bg-blue-700">
                  Search Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-6xl lg:w-1/2 text-bold text-right text-white">
          Experiences <br></br> Above & Beyond!
        </h2>
      </div>
    </>
  );
}

export default Header;
