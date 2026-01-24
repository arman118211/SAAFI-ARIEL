import React, { useState } from "react";
import {
	User,
	Mail,
	Phone,
	Building2,
	MapPin,
	Lock,
	Edit2,
	Save,
	X,
	Check,
	ShieldCheck,
	Key,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateSellerProfile } from "../redux/slices/authSlice";
import ScrollToTop from "./ScrollToTop";
import toast from "react-hot-toast";

export default function SellerProfile() {
	const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'security'
	const [isEditing, setIsEditing] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const seller = useSelector((state) => state.auth.seller);
	console.log("seller", seller);
	const dispatch = useDispatch();

	const { loading } = useSelector((state) => state.auth);

	const [formData, setFormData] = useState({
		name: seller?.name || "",
		email: seller?.email || "",
		phone: seller?.phone || "",
		companyName: seller?.companyName || "",
		address: seller?.address || "",
		role: seller?.role || "seller",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	if (!seller)
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-400 font-medium">
				Loading profile...
			</div>
		);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// const handleSave = () => {
	//   dispatch(updateSellerProfile({
	//     name: formData.name,
	//     address: formData.address,
	//     currentPassword: formData.currentPassword,
	//     newPassword: formData.newPassword,
	//     id: seller._id
	//   }));
	//   setIsEditing(false);
	//   setShowSuccess(true);
	//   // Reset password fields
	//   setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
	//   setTimeout(() => setShowSuccess(false), 3000);
	// };
	const handleSave = async () => {
		// 🔐 Password validation
		if (activeTab === "security") {
			if (!formData.currentPassword) {
				toast.error("Current password is required");
				return;
			}

			if (formData.newPassword.length < 4) {
				toast.error("Password must be at least 4 characters");
				return;
			}

			if (formData.newPassword !== formData.confirmPassword) {
				toast.error("Passwords do not match");
				return;
			}
		}

		try {
			await dispatch(
				updateSellerProfile({
					name: formData.name,
					address: formData.address,
					currentPassword: formData.currentPassword,
					newPassword: formData.newPassword,
					id: seller._id,
				})
			).unwrap(); // 🔥 IMPORTANT

			setIsEditing(false);
			setShowSuccess(true);

			setFormData((prev) => ({
				...prev,
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			}));

			setTimeout(() => setShowSuccess(false), 3000);
		} catch (err) {
			toast.error(err || "Update failed");
		}
	};

	return (
		<div className="min-h-screen bg-[#F9FAFB] py-7 px-0 sm:px-6">
			<ScrollToTop />

			{/* Success Notification */}
			{showSuccess && (
				<div className="fixed top-8 right-8 z-50 flex items-center gap-3 bg-white border border-green-100 shadow-xl px-6 py-4 rounded-2xl animate-in slide-in-from-right-10 border-l-4 border-l-green-500">
					<div className="bg-green-100 p-1.5 rounded-full">
						<Check size={18} className="text-green-600" />
					</div>
					<span className="text-gray-800 font-semibold text-sm">
						Settings updated successfully
					</span>
				</div>
			)}

			<div className=" mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-gray-900 tracking-tight">
						Account Settings
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						Manage your business profile and security preferences
					</p>
				</div>

				{/* Tab Navigation */}
				<div className="flex gap-1 mb-6 bg-gray-200/50 p-1 rounded-2xl w-fit">
					<button
						onClick={() => {
							setActiveTab("profile");
							setIsEditing(false);
						}}
						className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
							activeTab === "profile"
								? "bg-white text-gray-900 shadow-sm"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						<User size={16} /> Profile
					</button>
					<button
						onClick={() => {
							setActiveTab("security");
							setIsEditing(false);
						}}
						className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
							activeTab === "security"
								? "bg-white text-gray-900 shadow-sm"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						<Lock size={16} /> Security
					</button>
				</div>

				{/* Main Content Card */}
				<div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
					<div className="p-8 md:p-12">
						{/* Header within Card */}
						<div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-50">
							<h2 className="text-lg font-bold text-gray-900">
								{activeTab === "profile"
									? "Profile Information"
									: "Password & Security"}
							</h2>
							{!isEditing && (
								<button
									onClick={() => setIsEditing(true)}
									className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
								>
									<Edit2 size={14} /> Edit Details
								</button>
							)}
						</div>

						{/* TAB 1: PROFILE INFORMATION */}
						{activeTab === "profile" && (
							<div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
								<div className="flex flex-col md:flex-row gap-12">
									<div className="flex flex-col items-center w-full md:w-1/4">
										<div className="w-28 h-28 bg-indigo-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm mb-4">
											<span className="text-3xl font-bold text-indigo-600 uppercase">
												{formData.name.charAt(0)}
											</span>
										</div>
										<div className="text-center space-y-2">
											{/* Company Name */}
											<p className="font-semibold text-gray-700 text-sm tracking-wide">
												{formData.companyName}
											</p>

											{/* Name + Role */}
											<div className="flex items-center justify-center gap-2">
												<span className="text-xl text-gray-900 font-bold uppercase tracking-wider">
													{formData.name}
												</span>

												{/* Role Badge */}
												<span className="text-xs px-2 rounded-full bg-blue-100 text-blue-700 font-semibold uppercase ">
													{formData.role}
												</span>
											</div>

											{/* Verified Badge */}
											<span className="inline-block text-[11px] px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold uppercase tracking-wide">
												Verified
											</span>
										</div>
									</div>

									<div className="flex-1 space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<ProfileField
												label="Full Name"
												name="name"
												value={formData.name}
												isEditing={isEditing}
												onChange={handleInputChange}
											/>
											<ProfileField
												label="Email Address"
												value={formData.email}
												disabled={true}
											/>
											<ProfileField
												label="Phone Number"
												value={formData.phone}
												disabled={true}
											/>
											<ProfileField
												label="Company Name"
												value={formData.companyName}
												disabled={true}
											/>
										</div>
										<div className="space-y-1">
											<label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
												Business Address
											</label>
											<textarea
												name="address"
												value={formData.address}
												onChange={handleInputChange}
												disabled={!isEditing}
												rows={3}
												className={`w-full px-4 py-3 rounded-xl border transition-all resize-none text-sm font-medium outline-none ${
													isEditing
														? "border-indigo-500 ring-4 ring-indigo-50"
														: "border-gray-50 bg-gray-50 text-gray-600"
												}`}
											/>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* TAB 2: CHANGE PASSWORD */}
						{activeTab === "security" && (
							<div className=" mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300 pt-4">
								<div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-2xl">
									<div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
										<Key size={20} />
									</div>
									<div>
										<p className="text-sm font-bold text-gray-900">
											Security Requirement
										</p>
										<p className="text-xs text-gray-500">
											Ensure your new password is at least 8 characters long.
										</p>
									</div>
								</div>

								<div className="space-y-6">
									<ProfileField
										label="Current Password"
										type="password"
										name="currentPassword"
										value={formData.currentPassword}
										isEditing={isEditing}
										onChange={handleInputChange}
										placeholder="••••••••"
									/>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<ProfileField
											label="New Password"
											type="password"
											name="newPassword"
											value={formData.newPassword}
											isEditing={isEditing}
											onChange={handleInputChange}
											placeholder="New password"
										/>
										<ProfileField
											label="Confirm Password"
											type="password"
											name="confirmPassword"
											value={formData.confirmPassword}
											isEditing={isEditing}
											onChange={handleInputChange}
											placeholder="Repeat password"
										/>
									</div>
								</div>
							</div>
						)}

						{/* Action Footer */}
						{isEditing && (
							<div className="mt-12 pt-8 border-t border-gray-50 flex justify-end gap-3 animate-in fade-in">
								<button
									onClick={() => setIsEditing(false)}
									className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
								>
									Discard
								</button>
								<button
									onClick={handleSave}
									disabled={loading}
									className="px-8 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 flex items-center gap-2"
								>
									<Save size={16} /> Save Changes
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

function ProfileField({
	label,
	value,
	isEditing,
	disabled,
	name,
	onChange,
	type = "text",
	placeholder,
}) {
	return (
		<div className="space-y-1">
			<label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
				{label}
			</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				disabled={disabled || !isEditing}
				className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
					isEditing && !disabled
						? "border-indigo-500 ring-4 ring-indigo-50 text-gray-900 shadow-sm bg-white"
						: "border-gray-50 bg-gray-50 text-gray-500"
				}`}
			/>
		</div>
	);
}
