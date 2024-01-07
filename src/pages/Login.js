import { encode } from "base-64";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [isOtpShown, setIsOtpShown] = useState(false);

  const [updateUser, setUpdateUser] = useState();

  useEffect(() => {
    // Update isMobileValid whenever mobileNumber changes
    setIsMobileValid(mobileNumber.length === 10);
  }, [mobileNumber]);

  useEffect(() => {
    // Update isMobileValid whenever mobileNumber changes
    setIsOtpShown(otp.length === 6);
  }, [otp]);

  const handleMobileNumberChange = (text) => {
    console.log("Input Text:", text);

    if (typeof text === "string") {
      const numericText = text.replace(/[^0-9]/g, "");
      console.log("Numeric Text:", numericText);

      if (numericText.length <= 10) {
        setMobileNumber(numericText);
      }
    }
  };

  // Send OTP to users

  const sendOTP = async (to, otp, from) => {
    try {
      // Send the OTP using Twilio's REST API
      const authorizationHeader = `Basic ${encode(
        "ACc5978fad8627c82a3d68370ab6675926:3ef71e923308d1036b61557d22269110"
      )}`;

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/ACc5978fad8627c82a3d68370ab6675926/Messages.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: authorizationHeader,
          },
          body: `To=${encodeURIComponent(
            to
          )}&From=${from}&Body=Your OTP is: ${otp}`,
        }
      );

      if (response.ok) {
        // Implement OTP verification logic here
        // You can prompt the user to enter the OTP and verify it with your server or Twilio Verify service

        // If verification is successful, navigate to the home screen
        return true;
      } else {
        console.error(
          "Error sending OTP:",
          response.status,
          response.statusText
        );
        const responseBody = await response.text();
        console.error("Response Body:", responseBody);
        // Display an error message to the user
        return false;
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Display an error message to the user
      return false;
    }
  };

  const handleLogin = async () => {
    // Generate a random OTP (you can customize this)
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otpValue);
    setOtpValue(otpValue);
    const userPhoneNumber = "+91" + mobileNumber; // Replace with the user's phone number

    const fromPhoneNumber = "+15124026795";

    const success = await sendOTP(userPhoneNumber, otpValue, fromPhoneNumber);

    if (success) {
      // If verification is successful, navigate to the home screen
      // navigation.navigate("EnterOtp", { otpValue, mobileNumber });
      console.log("Success");
      setIsMobileValid(false);
      setIsOtpShown(true);
      setOtp(otpValue);
    } else {
      // Display an error message to the user
      console.error("Login failed", `+91${mobileNumber}`);
    }
  };

  function verifyOTP() {
    if (otp === otpValue) {
      setUpdateUser(mobileNumber);
      // navigation.navigate("Home", { mobileNumber });
      console.log("Navigation required!", " Update User value: ", updateUser);
    }
  }

  return (
    <>
      <div
        className={`bg-cyan-700 h-full w-full flex-row justify-center items-center`}
      >
        <div>
          <h2 className={[`h2-3xl  font-bold`, { fontFamily: "Lato" }]}>
            ECO PARK
          </h2>
          {/* <img
            className={`h-40 mb-10`}
            source={require("../assets/imgs/travel-buddy-logo-light.png")}
          /> */}
        </div>

        <div
          className={`flex flex-row justify-center items-center border border-white bg-white rounded-md mb-5`}
        >
          <div className={`bg-white border-r border-gray-600 pr-4 pl-2`}>
            <h2 className={`h2-lg h2-gray-600`}>+91</h2>
          </div>
          <input
            className={`px-4 py-2 h2-lg text-gray-600`}
            placeholder="Enter your 10-digit mobile number"
            value={mobileNumber}
            onChange={(e) => handleMobileNumberChange(e.target.value)}
            maxLength={10}
          />
        </div>

        {isMobileValid && (
          <button className={`bg-yellow-600 px-4 py-2 rounded-md mb-5`}>
            <h2
              className={`h2-lg font-bold h2-white h2-center`}
              onClick={handleLogin}
            >
              Get OTP
            </h2>
          </button>
        )}

        {isOtpShown && (
          <>
            <input
              className={`bg-white text-gray-700 px-7 py-2 h2-lg h2-gray-700 rounded-md`}
              placeholder="Enter OTP"
              // value={otp}
              // onChange={handleOtpChange}
              maxLength={6}
            />
            <button className={`bg-green-600 px-11.5 py-2 rounded-md my-5`}>
              <h2
                className={`h2-lg font-bold h2-white h2-center`}
                onClick={verifyOTP}
              >
                Login
              </h2>
            </button>
          </>
        )}
      </div>
      <div
        className={`flex flex-row items-center absolute justify-center w-full bottom-2`}
      >
        <h2 className={`h2-sm h2-white`}>Made in </h2>
        <h2 className={`font-bold uppercase h2-sm h2-white`}>India </h2>
        {/* <img
          className={`w-9 h-5 mt-0.5`}
          src={"../assets/imgs/indian-flag.png"}
        /> */}
      </div>
    </>
  );
};

export default Login;
