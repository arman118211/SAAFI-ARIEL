import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Plus, Edit2, Trash2, Gift, CheckCircle, XCircle, 
  Loader2, AlertCircle, Calendar, IndianRupee, Layers 
} from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  minPurchaseQty: "",
  rewardMinAmount: "",
  rewardMaxAmount: "",
  rewardType: "cash",
  validFrom: "",
  validTill: "",
  isActive: true,
};

const AdminRewardManager = () => {
  const [form, setForm] = useState(emptyForm);
  const [rewards, setRewards] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Global loading for fetch
  const [isSubmitting, setIsSubmitting] = useState(false); // Action loading
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const BASE = import.meta.env.VITE_BASE_URL;

  const fetchRewards = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE}/reward/admin/all`);
      setRewards(res.data.data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await axios.put(`${BASE}/reward/admin/${editingId}`, form);
      } else {
        await axios.post(`${BASE}/reward/admin`, form);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchRewards();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (reward) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditingId(reward._id);
    setForm({
      ...reward,
      validFrom: reward.validFrom?.slice(0, 10),
      validTill: reward.validTill?.slice(0, 10),
    });
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await axios.delete(`${BASE}/reward/admin/${deleteModal.id}`);
      setDeleteModal({ isOpen: false, id: null });
      fetchRewards();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle size={28} />
              <h3 className="text-xl font-bold">Delete Reward?</h3>
            </div>
            <p className="text-gray-600 mb-6">This action cannot be undone. This campaign will be permanently removed.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteModal({ isOpen: false, id: null })}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium flex items-center justify-center"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Reward Campaigns</h1>
          <p className="text-gray-500 mt-1">Design and oversee customer growth incentives.</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 px-5 py-3 rounded-2xl flex items-center gap-3">
          <Layers className="text-indigo-600" size={20} />
          <div>
            <p className="text-[10px] uppercase font-bold text-indigo-400">Total Active</p>
            <p className="font-bold text-indigo-700 leading-none">{rewards.length} Campaigns</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* FORM PANEL */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden sticky top-8">
            <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2">
                {editingId ? <Edit2 size={18} /> : <Plus size={18} />}
                {editingId ? "Update Campaign" : "New Campaign"}
              </h2>
              {editingId && (
                <button onClick={() => { setEditingId(null); setForm(emptyForm); }} className="text-gray-400 hover:text-white">
                  <XCircle size={20} />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Input Group: Title */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Campaign Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-100 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm transition-all outline-none"
                  placeholder="e.g. Diwali Special"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Description</label>
                <textarea
                  name="description"
                  rows="2"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-100 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm transition-all outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Min Qty</label>
                  <input
                    type="number"
                    name="minPurchaseQty"
                    value={form.minPurchaseQty}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Type</label>
                  <select
                    name="rewardType"
                    value={form.rewardType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm outline-none appearance-none"
                  >
                    <option value="cash">Cashback</option>
                    <option value="gift">Physical Gift</option>
                    <option value="discount">Discount Code</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Min Value (₹)</label>
                  <input
                    type="number"
                    name="rewardMinAmount"
                    value={form.rewardMinAmount}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Max Value (₹)</label>
                  <input
                    type="number"
                    name="rewardMaxAmount"
                    value={form.rewardMaxAmount}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Starts</label>
                  <input
                    type="date"
                    name="validFrom"
                    value={form.validFrom}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Ends</label>
                  <input
                    type="date"
                    name="validTill"
                    value={form.validTill}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm outline-none"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-xl py-4 text-sm transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : editingId ? "Save Changes" : "Launch Campaign"}
              </button>
            </form>
          </div>
        </div>

        {/* LIST PANEL */}
        <div className="lg:col-span-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
              <p className="text-gray-500 font-medium">Loading your campaigns...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewards.map((reward) => (
                <div
                  key={reward._id}
                  className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all group border-b-4 border-b-transparent hover:border-b-indigo-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      reward.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {reward.isActive ? <CheckCircle size={12}/> : <XCircle size={12}/>}
                      {reward.isActive ? "ACTIVE" : "PAUSED"}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(reward)}
                        className="p-2 bg-gray-50 hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 rounded-xl transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, id: reward._id })}
                        className="p-2 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-2">{reward.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">{reward.description}</p>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-1"><Gift size={14}/> Min Qty</span>
                      <span className="font-bold text-gray-700">{reward.minPurchaseQty} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-1"><IndianRupee size={14}/> Reward</span>
                      <span className="font-bold text-indigo-600">₹{reward.rewardMinAmount} - ₹{reward.rewardMaxAmount}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                      <Calendar size={14} />
                      {new Date(reward.validTill).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                      {reward.rewardType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && rewards.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No campaigns yet</h3>
              <p className="text-gray-500 mt-1">Start by filling out the form on the left.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRewardManager;