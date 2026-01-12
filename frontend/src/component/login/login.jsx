"use client";

import { useState, useCallback, useMemo } from "react";
import {
	User,
	Lock,
	Eye,
	EyeOff,
	UserCheck,
	Activity,
	Heart,
	Stethoscope,
	Users,
	AlertCircle,
	CheckCircle,
	Shield,
	Phone,
	Mail,
	Building2,
	MapPin,
	UserPlus,
	Store,
} from "lucide-react";

import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSeller } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [selectedRole, setSelectedRole] = useState(null);

	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const [isSignup, setIsSignup] = useState(false);

	// const [otpSent, setOtpSent] = useState(false)
	// const [otp, setOtp] = useState(["", "", "", "", "", ""])
	// const [confirmationResult, setConfirmationResult] = useState(null)
	const [country, setCountry] = useState("NP");
	const countryCodes = {
		IN: "+91",
		NP: "+977",
	};

	const [signupData, setSignupData] = useState({
		name: "",
		email: "",
		phone: "",
		companyName: "",
		address: "",
		password: "",
		role: "",
	});

	const handleSignupChange = (e) => {
		const { name, value } = e.target;
		setSignupData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	//  const handleSignupSubmit = async (e) => {
	//   e.preventDefault()

	//   try {
	//     setIsLoading(true)

	//     if (!window.recaptchaVerifier) {
	//       window.recaptchaVerifier = new RecaptchaVerifier(
	//         auth,
	//         "recaptcha-container",
	//         {
	//           size: "invisible",
	//         }
	//       )
	//     }

	//     // const confirmation = await signInWithPhoneNumber(
	//     //   auth,
	//     //   `+91${signupData.phone}`,
	//     //   window.recaptchaVerifier
	//     // )

	//     const phoneNumber = `${countryCodes[country]}${signupData.phone}`

	//     const confirmation = await signInWithPhoneNumber(
	//       auth,
	//       phoneNumber,
	//       window.recaptchaVerifier
	//     )

	//     setConfirmationResult(confirmation)
	//     setOtpSent(true)
	//     toast.success("OTP sent successfully")
	//     setIsLoading(false)

	//   } catch (err) {
	//     if (err.code === "auth/too-many-requests") {
	//       toast.error("Too many attempts. Please try later.")
	//     } else if (err.code === "auth/invalid-phone-number") {
	//       toast.error("Invalid phone number.")
	//     } else {
	//       toast.error(err.message || "Failed to send OTP")
	//     }
	//     setIsLoading(false);
	//   }
	// }

	const handleSignupSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			await axios.post(
				`${import.meta.env.VITE_BASE_URL}/seller/auth/register`,
				signupData
			);

			toast.success("Account created successfully");
			setIsSignup(false);
			setSelectedRole(null);

			setSignupData({
				name: "",
				email: "",
				phone: "",
				companyName: "",
				address: "",
				password: "",
				role: "",
			});
		} catch (err) {
			toast.error(err.response?.data?.message || "Failed to create account");
		} finally {
			setIsLoading(false);
		}
	};

	// const verifyOtpAndRegister = async () => {
	//   try {
	//     if (otp.join("").length !== 6) {
	//       toast.error("Please enter the 6-digit OTP")
	//       return
	//     }

	//     setIsLoading(true)

	//     if (!confirmationResult) {
	//       toast.error("OTP session expired. Please resend OTP.")
	//       setIsLoading(false)
	//       return
	//     }

	//     const result = await confirmationResult.confirm(otp.join(""))
	//     const idToken = await result.user.getIdToken()

	//     await axios.post(
	//       `${import.meta.env.VITE_BASE_URL}/seller/auth/register`,
	//       signupData,
	//       {
	//         headers: {
	//           Authorization: `Bearer ${idToken}`,
	//         },
	//       }
	//     )

	//     toast.success("Account created successfully")
	//     setIsSignup(false)
	//     setOtpSent(false)
	//     setIsLoading(false)
	//     setSelectedRole(null)
	//     setOtp(["", "", "", "", "", ""])

	//   } catch (err) {
	//     // toast.error(err.data.response.message)
	//     console.log("err",err)
	//     // setIsLoading(false)
	//     if (err.code === "auth/invalid-verification-code") {
	//       toast.error("Invalid OTP. Please try again.")
	//     } else if (err.code === "auth/code-expired") {
	//       toast.error("OTP expired. Please resend OTP.")
	//     } else {
	//       toast.error(err.response.data.message)
	//     }
	//   }finally {
	//     setIsLoading(false)
	//   }
	// }

	const handleInputChange = useCallback(
		(e) => {
			const { name, value } = e.target;
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
			// Clear messages when user starts typing
			if (message && value.length === 1) {
				setMessage("");
				setMessageType("");
			}
		},
		[message]
	);

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			setMessage("");
			setMessageType("");

			if (!formData.username || !formData.password) {
				setMessage("Please fill in all fields");
				setMessageType("error");
				setIsLoading(false);
				return;
			}

			const result = await dispatch(
				loginSeller({
					email: formData.username,
					password: formData.password,
				})
			);

			if (result.meta.requestStatus === "fulfilled") {
				setMessage("Login Success: " + result.payload.seller.name);
				toast.success("Login Successfully");

				const authToken = result.payload.token;

				// ASK PERMISSION FIRST (USER CONTEXT STILL ACTIVE)
				const { requestNotificationPermission } = await import(
					"../../utils/requestNotificationPermission"
				);

				const granted = await requestNotificationPermission();

				if (granted) {
					const { registerFcmToken } = await import(
						"../../utils/registerFcmToken"
					);
					await registerFcmToken(authToken);
				}

				setMessageType("success");
				setIsLoading(false);
				navigate(localStorage.getItem("current") || "/dashboard");
			} else {
				setMessage("Invalid credentials");
				setMessageType("error");
				setIsLoading(false);
			}
		} catch (err) {
			setMessage("Invalid credentials");
			setMessageType("error");
			console.log("something went wrong", err);
			setIsLoading(false);
		}
	};

	const handleKeyPress = useCallback((e) => {
		if (e.key === "Enter") {
			handleSubmit(e);
		}
	}, []);

	// Memoized Login Form Component
	const LoginForm = useMemo(
		() => (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className="space-y-3 sm:space-y-4"
			>
				{/* Message Display */}
				{message && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className={`p-2 sm:p-3 rounded-lg flex items-center gap-2 text-xs sm:text-sm ${
							messageType === "success"
								? "bg-green-50 text-green-700 border border-green-200"
								: "bg-red-50 text-red-700 border border-red-200"
						}`}
					>
						{messageType === "success" ? (
							<CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
						) : (
							<AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
						)}
						<span className="font-medium">{message}</span>
					</motion.div>
				)}

				{/* Username Field */}
				<div className="space-y-1 sm:space-y-2">
					<label className="block text-xs sm:text-sm font-semibold text-gray-700">
						Username
					</label>
					<div className="relative group">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<User className="w-4 h-4 text-gray-400 group-focus-within:text-[#2979FF] transition-colors" />
						</div>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							onKeyPress={handleKeyPress}
							className="w-full pl-10 pr-3 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500 text-sm"
							placeholder="Enter your username"
							required
							autoComplete="off"
						/>
					</div>
				</div>

				{/* Password Field */}
				<div className="space-y-1 sm:space-y-2">
					<label className="block text-xs sm:text-sm font-semibold text-gray-700">
						Password
					</label>
					<div className="relative group">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Lock className="w-4 h-4 text-gray-400 group-focus-within:text-[#2979FF] transition-colors" />
						</div>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							onKeyPress={handleKeyPress}
							className="w-full pl-10 pr-12 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500 text-sm"
							placeholder="Enter your password"
							required
							autoComplete="off"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#2979FF] transition-colors"
						>
							{showPassword ? (
								<EyeOff className="w-4 h-4" />
							) : (
								<Eye className="w-4 h-4" />
							)}
						</button>
					</div>
				</div>

				{/* Login Button */}
				<button
					onClick={handleSubmit}
					disabled={isLoading}
					className={`w-full py-2 sm:py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform text-sm ${
						isLoading
							? "bg-gray-400 cursor-not-allowed"
							: "bg-gradient-to-r from-[#2979FF] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0D47A1] shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
					}`}
				>
					{isLoading ? (
						<div className="flex items-center justify-center gap-2">
							<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
							<span>Signing In...</span>
						</div>
					) : (
						<div className="flex items-center justify-center gap-2">
							<UserCheck className="w-4 h-4" />
							<span>Sign In</span>
						</div>
					)}
				</button>
			</motion.div>
		),
		[
			message,
			messageType,
			formData,
			showPassword,
			isLoading,
			handleInputChange,
			handleKeyPress,
		]
	);

	const RoleSelectionCard = (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="space-y-4"
		>
			<h3 className="text-center text-lg font-bold">Choose Your Role</h3>

			<div className="grid grid-cols-2 gap-4">
				{/* Retailer */}
				<button
					onClick={() => {
						setSelectedRole("retailer");
						setSignupData((prev) => ({ ...prev, role: "retailer" }));
					}}
					className="p-4 border-2 rounded-xl hover:border-[#2979FF] hover:bg-blue-50 transition-all"
				>
					<Store className="mx-auto mb-2 text-[#2979FF]" />
					<p className="font-semibold text-center">Retailer</p>
				</button>

				{/* Dealer */}
				<button
					onClick={() => {
						setSelectedRole("dealer");
						setSignupData((prev) => ({ ...prev, role: "dealer" }));
					}}
					className="p-4 border-2 rounded-xl hover:border-[#2979FF] hover:bg-blue-50 transition-all"
				>
					<Users className="mx-auto mb-2 text-[#2979FF]" />
					<p className="font-semibold text-center">Dealer</p>
				</button>
			</div>

			<p className="text-xs text-center text-gray-500">
				Dealers require admin approval before login
			</p>
		</motion.div>
	);

	const SignupForm = (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="space-y-4"
		>
			{/* Full Name */}
			<div className="space-y-1">
				<label className="text-xs font-semibold text-gray-700">Full Name</label>
				<div className="relative">
					<User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
					<input
						type="text"
						name="name"
						value={signupData.name}
						onChange={handleSignupChange}
						placeholder="Enter full name"
						className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all"
						required
					/>
				</div>
			</div>

			{/* Email */}
			<div className="space-y-1">
				<label className="text-xs font-semibold text-gray-700">Email</label>
				<div className="relative">
					<Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
					<input
						type="email"
						name="email"
						value={signupData.email}
						onChange={handleSignupChange}
						placeholder="Enter email address"
						className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all"
						required
					/>
				</div>
			</div>

			{/* Phone */}
			<div className="space-y-1">
				<label className="text-xs font-semibold text-gray-700">Phone</label>

				<div className="flex gap-2">
					{/* Country Select */}
					<select
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						className="w-28 px-3 py-3 text-sm border-2 border-gray-200 rounded-lg bg-gray-50
                    focus:ring-2 focus:ring-[#2979FF] focus:border-transparent"
					>
						<option value="IN">🇮🇳 +91</option>
						<option value="NP">🇳🇵 +977</option>
					</select>

					{/* Phone Input */}
					<div className="relative flex-1">
						<Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
						<input
							type="tel"
							name="phone"
							value={signupData.phone}
							onChange={handleSignupChange}
							placeholder="Phone number"
							className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg bg-gray-50
                      focus:bg-white focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all"
							required
						/>
					</div>
				</div>
			</div>

			{/* Company Name */}
			<div className="space-y-1">
				<label className="text-xs font-semibold text-gray-700">
					Company Name
				</label>
				<div className="relative">
					<Building2 className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
					<input
						type="text"
						name="companyName"
						value={signupData.companyName}
						onChange={handleSignupChange}
						placeholder="Enter company name"
						className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all"
						required
					/>
				</div>
			</div>

			{/* Address */}
			<div className="space-y-1">
				<label className="text-xs font-semibold text-gray-700">Address</label>
				<div className="relative">
					<MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
					<input
						type="text"
						name="address"
						value={signupData.address}
						onChange={handleSignupChange}
						placeholder="Enter business address"
						className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all"
						required
					/>
				</div>
			</div>

			{/* Password */}
			<div className="space-y-1">
				<label className="text-xs font-semibold text-gray-700">Password</label>
				<div className="relative">
					<Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						value={signupData.password}
						onChange={handleSignupChange}
						placeholder="Create a password"
						className="w-full pl-10 pr-12 py-3 text-sm border-2 border-gray-200 rounded-lg bg-gray-50
                     focus:bg-white focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all"
						required
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#2979FF]"
					>
						{showPassword ? (
							<EyeOff className="w-4 h-4" />
						) : (
							<Eye className="w-4 h-4" />
						)}
					</button>
				</div>
			</div>
			<div id="recaptcha-container"></div>
			{/* Submit Button */}
			<button
				onClick={handleSignupSubmit}
				disabled={isLoading}
				className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
					isLoading
						? "bg-gray-400 cursor-not-allowed"
						: "bg-gradient-to-r from-[#2979FF] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0D47A1] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
				}`}
			>
				<div className="flex items-center justify-center gap-2">
					<UserPlus className="w-4 h-4" />
					<span>
						{isLoading ? "Creating Account..." : "Create Seller Account"}
					</span>
				</div>
			</button>

			{/* Switch to Login */}
			<p className="text-xs text-center text-gray-600">
				Already have an account?{" "}
				<button
					type="button"
					onClick={() => {
						setIsSignup(false);
						setSelectedRole(null);
					}}
					className="text-[#2979FF] font-semibold hover:underline"
				>
					Sign In
				</button>
			</p>

			{/* {otpSent && (
      <div className="space-y-3">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-3 border rounded-lg"
        />

        <button
          onClick={verifyOtpAndRegister}
          className="w-full py-3 bg-[#2979FF] text-white rounded-lg"
        >
          Verify OTP
        </button>
      </div>
    )} */}
		</motion.div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#2979FF] via-[#1565C0] to-[#0D47A1] flex items-center justify-center p-3 sm:p-4 lg:p-6 relative overflow-hidden ">
			{/* Animated Background Elements */}
			<div className="a inset-0 overflow-hidden">
				<div className="absolute top-10 left-10 sm:top-20 sm:left-20 text-white/10 animate-pulse">
					<Heart className="w-8 h-8 sm:w-12 sm:h-12" />
				</div>
				<div className="absolute top-20 right-16 sm:top-40 sm:right-32 text-white/10 animate-pulse delay-1000">
					<Stethoscope className="w-10 h-10 sm:w-16 sm:h-16" />
				</div>
				<div className="absolute bottom-20 left-8 sm:bottom-32 sm:left-16 text-white/10 animate-pulse delay-2000">
					<Activity className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
				</div>
				<div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 text-white/10 animate-pulse delay-500">
					<Users className="w-8 h-8 sm:w-14 sm:h-14" />
				</div>
				<div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full sm:rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full sm:rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 animate-pulse delay-1000"></div>
			</div>

			{/* Main Container */}
			<div className="relative w-full max-w-7xl mx-auto ">
				<div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
					{/* Left Side - Hero Section */}
					<div className="text-white space-y-6 lg:space-y-8 order-2 lg:order-1">
						{/* Logo and Brand */}
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="relative">
								<div
									className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 
                bg-white/20 rounded-xl sm:rounded-2xl overflow-hidden 
                backdrop-blur-sm border border-white/30 px-1"
								>
									<img
										src="/logo.jpg"
										alt="Gay Chap Logo"
										className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
									/>
								</div>

								<div
									className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 
                w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full flex items-center justify-center"
								>
									<div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
								</div>
							</div>

							<div>
								<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
									Saafi Ariel
								</h1>
								<p className="text-white/80 text-sm sm:text-base lg:text-lg">
									Discover the Future of Brilliant Clean
								</p>
							</div>
						</div>

						{/* Hero Content */}
						<div className="space-y-4 lg:space-y-6">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
								Welcome to the Future of
								<span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
									Hygiene & Freshness
								</span>
							</h2>
							<p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
								Simplify your detergent business operations with a secure and
								efficient management solution tailored for detergent
								manufacturers and distributors.
							</p>
						</div>

						{/* Feature Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
							<div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
										<Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
									</div>
									<div>
										<h3 className="font-semibold text-sm sm:text-base">
											Secure Access
										</h3>
										<p className="text-xs sm:text-sm text-white/70">
											End-to-end encryption
										</p>
									</div>
								</div>
							</div>
							<div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
										<Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
									</div>
									<div>
										<h3 className="font-semibold text-sm sm:text-base">
											Real-time Data
										</h3>
										<p className="text-xs sm:text-sm text-white/70">
											Live monitoring
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side - Login Form */}
					<div className="relative order-1 lg:order-2">
						<div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm max-w-md mx-auto lg:max-w-sm xl:max-w-md">
							{/* Login Form Header */}
							<div className="p-4 sm:p-5 lg:p-4 pb-0">
								<div className="text-center mb-3 sm:mb-4">
									<h3 className="text-lg font-bold">
										{isSignup ? "Create Seller Account" : "Seller Sign In"}
									</h3>
									<p className="text-xs sm:text-sm lg:text-sm text-gray-600">
										Access your dashboard
									</p>
								</div>
							</div>

							{/* Login Form Content */}
							<div className="px-4 sm:px-5 lg:px-4 pb-4 sm:pb-5 lg:pb-4">
								{isSignup
									? !selectedRole
										? RoleSelectionCard
										: SignupForm
									: LoginForm}

								{/* Additional Options */}
								<div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
									<div className="flex items-center justify-between text-xs">
										<button className="text-[#2979FF] hover:text-[#1565C0] font-medium hover:underline transition-colors">
											Forgot Password?
										</button>
										<button
											onClick={() => setIsSignup(true)}
											className="text-[#2979FF] hover:underline font-medium"
										>
											Create new account
										</button>
									</div>
									<div className="text-center pt-2 sm:pt-3 border-t border-gray-200">
										<p className="text-xs text-gray-600">
											IT Support:{" "}
											<span className="font-medium text-[#2979FF]">
												+1 (555) 123-4567
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white/60 text-xs sm:text-sm px-4">
				<p>© 2025 Saafi Ariel. All rights reserved.</p>
			</div>
		</div>
	);
};

export default Login;
