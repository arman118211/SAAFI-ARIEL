import { useEffect, useState } from "react";
import ScratchQRModal from "../../utils/ScratchQRModal";
import axios from "axios";
// Optional: install lucide-react for icons
import { PlusCircle, Edit3, QrCode, Layers, Info, IndianRupee } from "lucide-react";

const initialForm = {
    title: "",
    minAmount: "",
    maxAmount: "",
    winningAmount: "",
};

const AdminScratchCampaign = () => {
    const [form, setForm] = useState(initialForm);
    const [campaigns, setCampaigns] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [qrCampaignId, setQrCampaignId] = useState(null);

    const fetchCampaigns = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/sth/live`);
            setCampaigns(res.data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                await axios.put(`${import.meta.env.VITE_BASE_URL}/sth/update/${editId}`, form);
            } else {
                await axios.post(`${import.meta.env.VITE_BASE_URL}/sth/create`, form);
            }
            setForm(initialForm);
            setEditId(null);
            fetchCampaigns();
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (campaign) => {
        setForm({
            title: campaign.title,
            minAmount: campaign.minAmount,
            maxAmount: campaign.maxAmount,
            winningAmount: campaign.winningAmount,
        });
        setEditId(campaign._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-800">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Scratch Campaigns
                        </h1>
                        <p className="text-slate-500 mt-1">Manage and monitor your digital reward distributions.</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
                        <Layers className="text-blue-500 w-5 h-5" />
                        <span className="font-semibold text-slate-700">{campaigns.length} Active</span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* FORM SECTION */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-8">
                            <div className="flex items-center gap-2 mb-6">
                                <PlusCircle className="text-blue-600 w-5 h-5" />
                                <h2 className="text-xl font-bold">{editId ? "Update" : "Create"} Campaign</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Campaign Title</label>
                                    <input
                                        name="title"
                                        placeholder="e.g. Summer Bonanza"
                                        value={form.title}
                                        onChange={handleChange}
                                        className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        required
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">Min Amount</label>
                                        <input
                                            type="number"
                                            name="minAmount"
                                            value={form.minAmount}
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">Max Amount</label>
                                        <input
                                            type="number"
                                            name="maxAmount"
                                            value={form.maxAmount}
                                            onChange={handleChange}
                                            className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Winning Amount</label>
                                    <input
                                        type="number"
                                        name="winningAmount"
                                        value={form.winningAmount}
                                        onChange={handleChange}
                                        className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-blue-200 ${
                                        editId ? "bg-indigo-600 hover:bg-indigo-700" : "bg-blue-600 hover:bg-blue-700"
                                    } disabled:opacity-50 mt-4`}
                                >
                                    {loading ? "Processing..." : editId ? "Update Details" : "Launch Campaign"}
                                </button>
                                {editId && (
                                    <button 
                                        type="button" 
                                        onClick={() => {setEditId(null); setForm(initialForm);}}
                                        className="w-full text-slate-400 text-sm hover:text-slate-600 transition-colors"
                                    >
                                        Cancel Editing
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* LIST SECTION */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-slate-800">Live Campaigns</h2>
                            </div>

                            <div className="overflow-x-auto">
                                {campaigns.length === 0 ? (
                                    <div className="p-20 text-center">
                                        <Info className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                        <p className="text-slate-400 font-medium">No campaigns found. Create your first one!</p>
                                    </div>
                                ) : (
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                                <th className="px-6 py-4">Campaign Info</th>
                                                <th className="px-6 py-4">Reward Range</th>
                                                <th className="px-6 py-4">Winning</th>
                                                <th className="px-6 py-4 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {campaigns.map((c) => (
                                                <tr key={c._id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <p className="font-bold text-slate-800 capitalize">{c.title}</p>
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                                                            c.isLive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                                                        }`}>
                                                            {c.isLive ? "● Live" : "Used"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                                        <div className="flex items-center text-sm">
                                                            ₹{c.minAmount} <span className="mx-2 text-slate-300">—</span> ₹{c.maxAmount}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-blue-700 font-bold flex items-center">
                                                            <IndianRupee className="w-3 h-3" /> {c.winningAmount}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-center items-center gap-3">
                                                            <button
                                                                onClick={() => handleEdit(c)}
                                                                className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Edit3 className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => setQrCampaignId(c._id)}
                                                                className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all shadow-md"
                                                            >
                                                                <QrCode className="w-4 h-4" /> QR
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <ScratchQRModal
                open={!!qrCampaignId}
                scratchId={qrCampaignId}
                onClose={() => setQrCampaignId(null)}
            />
        </div>
    );
};

export default AdminScratchCampaign;