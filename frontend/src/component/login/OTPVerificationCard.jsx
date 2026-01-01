import { useState, useRef, useEffect } from "react"
import { Shield, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export const OTPVerificationCard = ({ 
  phoneNumber, 
  onVerify, 
  onResend, 
  otp,
  setOtp,
  onBack,
  isLoading = false 
}) => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    // if (newOtp.every(digit => digit !== "") && index === 5) {
    //   handleVerify(newOtp.join(""))
    // }
  }

  useEffect(() => {
  if (otp.every(d => d !== "")) {
    onVerify(otp.join(""))
  }
}, [otp])

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char
    })
    setOtp(newOtp)

    if (pastedData.length === 6) {
      handleVerify(pastedData)
    }
  }

  const handleVerify = (otpValue) => {
    if (otpValue.length === 6) {
      onVerify(otpValue)
    }
  }

  const handleResend = () => {
    if (canResend) {
      setTimer(60)
      setCanResend(false)
      setOtp(["", "", "", "", "", ""])
      onResend()
      inputRefs.current[0]?.focus()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header with Icon */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#2979FF] to-[#1565C0] rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <div>
          <h3 className="text-xl font-bold text-gray-800">Verify Your Phone</h3>
          <p className="text-sm text-gray-600 mt-1">
            We've sent a 6-digit code to
          </p>
          <p className="text-sm font-semibold text-[#2979FF]">{phoneNumber}</p>
        </div>
      </div>

      {/* OTP Input Fields */}
      <div className="space-y-4">
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 rounded-lg
                transition-all duration-200 focus:outline-none
                ${
                  digit
                    ? "border-[#2979FF] bg-blue-50 text-[#2979FF]"
                    : "border-gray-300 bg-gray-50 text-gray-800"
                }
                focus:border-[#2979FF] focus:ring-2 focus:ring-[#2979FF]/20 focus:bg-white
                hover:border-[#2979FF]/50`}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Timer and Resend */}
        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-gray-600">
              Resend code in{" "}
              <span className="font-semibold text-[#2979FF]">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm font-semibold text-[#2979FF] hover:text-[#1565C0] 
                flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Resend Code
            </button>
          )}
        </div>
      </div>

      {/* Verify Button */}
      <button
        onClick={() => handleVerify(otp.join(""))}
        disabled={isLoading || otp.some(digit => !digit)}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300
          ${
            isLoading || otp.some(digit => !digit)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-[#2979FF] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0D47A1] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Verifying...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Verify & Continue</span>
          </div>
        )}
      </button>

      {/* Back Button */}
      <button
        onClick={onBack}
        disabled={isLoading}
        className="w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-800 
          flex items-center justify-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Signup
      </button>

      {/* Security Note */}
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          🔒 Your information is secure and encrypted
        </p>
      </div>
    </motion.div>
  )
}

// Demo wrapper to show the component
export default function App() {
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = (otp) => {
    setIsLoading(true)
    console.log("Verifying OTP:", otp)
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false)
      alert("OTP Verified Successfully!")
    }, 2000)
  }

  const handleResend = () => {
    console.log("Resending OTP...")
    alert("New OTP sent!")
  }

  const handleBack = () => {
    console.log("Going back to signup...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <OTPVerificationCard
          phoneNumber="+91 98765 43210"
          onVerify={handleVerify}
          onResend={handleResend}
          onBack={handleBack}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}