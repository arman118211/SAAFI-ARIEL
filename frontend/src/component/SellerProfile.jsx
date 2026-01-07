import React, { useState } from 'react';
import { User, Mail, Phone, Building2, MapPin, Lock, Edit2, Save, X, Check } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { updateSellerProfile } from "../redux/slices/authSlice";
import ScrollToTop from './ScrollToTop';

export default function SellerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const seller = useSelector((state) => state.auth.seller);
  const dispatch = useDispatch();
  console.log("seller",seller)

  if (!seller) return <p>Not logged in</p>;

  const [formData, setFormData] = useState({
    name: seller.name,
    email: seller.email,
    phone: seller.phone,
    companyName: seller.companyName,
    address: seller.address,
    role: seller.role,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    try{
        console.log('Saving profile:', {
        name: formData.name,
        address: formData.address,
        ...(formData.newPassword && { password: formData.newPassword })
        });
        console.log("formData",formData)
        dispatch(
            updateSellerProfile({
            nmae:formData.name,
            address:formData.address,
            currentPassword: formData.currentPassword,
            newPassword:formData.newPassword,
            id:seller._id
            })
        );
        
        setIsEditing(false);
        setShowSuccess(true);
        setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setShowSuccess(false), 3000);

    }catch(err){
        console.log("something went wrong",err)
    }
    
    
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen md:p-3 ">
      <ScrollToTop/>
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-pulse">
          <Check size={20} />
          Profile updated successfully!
        </div>
      )}

      <div className=" mx-auto">
        {/* Header */}
        <div className=" mb-8 px-5 mt-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          
          {/* Avatar Section */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4">
                <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                  <User size={64} className="text-indigo-500" />
                </div>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                  <p className="text-gray-600 capitalize">{formData.role}</p>
                </div>
              </div>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 md:mt-0 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Form */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name - Editable */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User size={18} className="text-indigo-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isEditing 
                        ? 'border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200' 
                        : 'border-gray-200 bg-gray-50'
                    } transition-all outline-none`}
                  />
                </div>

                {/* Email - Read Only */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Mail size={18} className="text-indigo-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600"
                  />
                </div>

                {/* Phone - Read Only */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Phone size={18} className="text-indigo-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600"
                  />
                </div>

                {/* Company - Read Only */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Building2 size={18} className="text-indigo-500" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600"
                  />
                </div>

                {/* Address - Editable */}
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin size={18} className="text-indigo-500" />
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={2}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isEditing 
                        ? 'border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200' 
                        : 'border-gray-200 bg-gray-50'
                    } transition-all outline-none resize-none`}
                  />
                </div>

                {/* Password Section - Only visible when editing */}
                {isEditing && (
                  <>
                    <div className="md:col-span-2 pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password (Optional)</h3>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Lock size={18} className="text-indigo-500" />
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Lock size={18} className="text-indigo-500" />
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Lock size={18} className="text-indigo-500" />
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md font-semibold"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-semibold"
                  >
                    <X size={20} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail size={24} className="text-blue-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Verified Email</h3>
            <p className="text-sm text-gray-600">Your email is verified</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock size={24} className="text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Secure Account</h3>
            <p className="text-sm text-gray-600">Password protected</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User size={24} className="text-purple-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Active Seller</h3>
            <p className="text-sm text-gray-600">Account in good standing</p>
          </div>
        </div>
      </div>
    </div>
  );
}