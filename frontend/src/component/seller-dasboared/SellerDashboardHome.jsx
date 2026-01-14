import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
	DollarSign,
	Droplets,
	Package,
	AlertCircle,
	Filter,
	Download,
	User,
	TicketPercent,
	Minus,
	Plus,
} from "lucide-react";
import {
	ResponsiveContainer,
	AreaChart,
	Area,
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";
import toast from "react-hot-toast";
import OfferDashboard from "./OfferDashBoard";

const StatusBadge = ({ status }) => {
  const config = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/10",
    Processing: "bg-sky-50 text-sky-700 border-sky-100 ring-sky-500/10",
    Pending: "bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/10",
  };

  const style = config[status] || "bg-gray-50 text-gray-600 border-gray-100 ring-gray-500/10";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ring-1 ${style} tracking-wide uppercase`}>
      <span className={`w-1 h-1 rounded-full mr-1.5 animate-pulse ${status === 'Completed' ? 'bg-emerald-500' : 'bg-current'}`} />
      {status}
    </span>
  );
};

const SellerStatShimmer = () => (
	<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
		<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
		<div className="flex items-center justify-between">
			<div className="space-y-2">
				<div className="h-4 w-24 bg-gray-200 rounded"></div>
				<div className="h-7 w-20 bg-gray-300 rounded"></div>
				<div className="h-3 w-16 bg-gray-200 rounded"></div>
			</div>
			<div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
		</div>
	</div>
);

const SellerChartShimmer = () => (
	<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-80 relative overflow-hidden">
		<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />
		<div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>
		<div className="h-full bg-gray-100 rounded-lg"></div>
	</div>
);

const SellerTableRowShimmer = () => (
	<tr className="animate-pulse">
		<td className="px-6 py-4">
			<div className="h-3 w-24 bg-gray-200 rounded"></div>
		</td>
		<td className="px-6 py-4">
			<div className="h-3 w-32 bg-gray-200 rounded"></div>
		</td>
		<td className="px-6 py-4">
			<div className="h-3 w-28 bg-gray-200 rounded"></div>
		</td>
		<td className="px-6 py-4">
			<div className="h-5 w-20 bg-gray-200 rounded-full"></div>
		</td>
		<td className="px-6 py-4 text-right">
			<div className="h-3 w-20 bg-gray-200 rounded ml-auto"></div>
		</td>
	</tr>
);

const SellerDashboardHome = ({ setActiveTab }) => {
	const { seller, token } = useSelector((state) => state.auth);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const getOrders = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/order/seller/${seller._id}`
			);
			setOrders(response.data);
		} catch (err) {
			// console.log("Error fetching orders, using mock data", err);
			toast.error("Server error.Please try after sometime.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (seller?._id) {
			getOrders();
		}
	}, [seller]);

	// Calculate statistics from real orders data
	const stats = {
		totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
		litersSold: orders.reduce((sum, order) => {
			const liquidItems = order.items.filter(
				(item) =>
					item.productId?.unit === "liter" || item.productId?.unit === "liters"
			);
			return sum + liquidItems.reduce((itemSum, item) => itemSum + item.qty, 0);
		}, 0),
		activeOrders: orders.filter((order) => order.status === "pending").length,
		qualityAlerts: orders.filter((order) =>
			order.items.some((item) => item.productId?.stock < 10)
		).length,
	};

	// Generate chart data from orders
	const SALES_DATA = orders.map((order) => ({
		time: new Date(order.createdAt).toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		}),
		sales: order.totalAmount,
		orders: order.totalQty,
	}));
	// console.log("orders data", orders);

	const INVENTORY_DATA = Array.from(
		new Set(
			orders.flatMap((order) =>
				order.items.map((item) => item.productId).filter(Boolean)
			)
		)
	)
		.map((product) => ({
			name:
				product?.name?.length > 12
					? product.name.substring(0, 12) + "..."
					: product?.name,
			value: product?.stock,
		}))
		.slice(0, 5);

	// Recent transactions data
	const RECENT_ORDERS = orders.map((order) => ({
		id: order._id.slice(-8).toUpperCase(),
		customer: `Customer ${order._id.slice(-4)}`,
		product: order.items[0]?.productId?.name || "Multiple Products",
		status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
		amount: `₹${order.totalAmount.toLocaleString()}`,
	}));

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5; // You can change this number

	// Calculate pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentOrders = RECENT_ORDERS.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(RECENT_ORDERS.length / itemsPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// StatCard Component (same as before)
	const StatCard = ({
		title,
		value,
		trend,
		trendUp,
		icon: Icon,
		color,
		tab,
	}) => (
		<div
			className="bg-white border border-gray-100 md:border-gray-200 rounded-xl p-3 md:p-6 shadow-sm hover:shadow-md transition-shadow "
			onClick={() => setActiveTab(tab)}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					{" "}
					{/* min-w-0 allows truncation of children */}
					<p className="text-[11px] md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 truncate">
						{title}
					</p>
					<p className="text-lg md:text-2xl font-bold text-gray-900 truncate">
						{value}
					</p>
					{trend && (
						<div
							className={`mt-1 flex items-center gap-1 text-[10px] md:text-xs font-bold ${
								trendUp && "text-gray-500"
							}`}
						>
							{/* Optional: Add a small arrow icon for trend */}
							{/* <span>{trendUp ? "↑" : "↓"}</span> */}
							<span>{trend}</span>
						</div>
					)}
				</div>

				{/* Icon: Smaller on mobile, hidden on ultra-small if needed */}
				<div
					className={`shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gray-50 flex items-center justify-center ${color}`}
				>
					<Icon className="w-4 h-4 md:w-6 md:h-6" />
				</div>
			</div>
		</div>
	);

	// ChartCard Component (same as before)
	const ChartCard = ({ title, children }) => (
		<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-80">
			<h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
			{children}
		</div>
	);

	// if (loading) {
	//   return (
	//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
	//       <div className="flex flex-col items-center gap-4">
	//         <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
	//         <p className="text-gray-600 font-medium">Loading dashboard...</p>
	//       </div>
	//     </div>
	//   )
	// }

	return (
		<div className="space-y-6">
			{/* Top Stats Row */}
			<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{loading ? (
					Array.from({ length: 4 }).map((_, i) => <SellerStatShimmer key={i} />)
				) : (
					<>
						<StatCard
							title="My Order"
							value={`₹${stats.totalRevenue.toLocaleString()}`}
							trend="view all orders"
							trendUp={true}
							icon={DollarSign}
							color="text-blue-600"
							tab="orders"
						/>
						<StatCard
							title="Offers"
							// value={`${stats.litersSold.toLocaleString()} L`}
							value={"My offer"}
							trend="check latest offer"
							trendUp={true}
							icon={TicketPercent}
							color="text-blue-500"
							tab="offers"
						/>
						<StatCard
							title="Winner"
							value={"Winners"}
							trend="Check Winner List"
							trendUp={true}
							icon={Package}
							color="text-indigo-600"
							tab="winner"
						/>
						<StatCard
							title="Profile"
							// value={stats.qualityAlerts.toString()}
							value={"My Profile"}
							trend="manage profile"
							trendUp={true}
							icon={User}
							color="text-indigo-600"
							tab="profile"
						/>
					</>
				)}
			</div>

			{/* Main Charts Row */}
			{/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{loading ? (
					<>
						<div className="lg:col-span-2">
							<SellerChartShimmer />
						</div>
						<div className="lg:col-span-1">
							<SellerChartShimmer />
						</div>
					</>
				) : (
					<>
						<div className="lg:col-span-2">
							<ChartCard title="Sales Velocity (24h)">
								<ResponsiveContainer width="100%" height="100%">
									<AreaChart data={SALES_DATA}>
										<defs>
											<linearGradient
												id="colorSales"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#2563eb"
													stopOpacity={0.2}
												/>
												<stop
													offset="95%"
													stopColor="#2563eb"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
										<CartesianGrid
											strokeDasharray="3 3"
											stroke="#e5e7eb"
											vertical={false}
										/>
										<XAxis
											dataKey="time"
											stroke="#9ca3af"
											fontSize={12}
											tickLine={false}
											axisLine={false}
										/>
										<YAxis
											stroke="#9ca3af"
											fontSize={12}
											tickLine={false}
											axisLine={false}
											tickFormatter={(value) => `₹${value}`}
										/>
										<Tooltip
											contentStyle={{
												backgroundColor: "#ffffff",
												borderColor: "#e5e7eb",
												color: "#111827",
												boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
											}}
											itemStyle={{ color: "#111827" }}
										/>
										<Area
											type="monotone"
											dataKey="sales"
											stroke="#2563eb"
											strokeWidth={2}
											fillOpacity={1}
											fill="url(#colorSales)"
										/>
										<Area
											type="monotone"
											dataKey="orders"
											stroke="#ef4444"
											strokeWidth={2}
											fill="transparent"
											strokeDasharray="5 5"
										/>
									</AreaChart>
								</ResponsiveContainer>
							</ChartCard>
						</div>

						<div className="lg:col-span-1">
							<ChartCard title="Inventory Levels">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={INVENTORY_DATA}
										layout="vertical"
										margin={{ left: 0 }}
									>
										<CartesianGrid
											strokeDasharray="3 3"
											stroke="#e5e7eb"
											horizontal={true}
											vertical={false}
										/>
										<XAxis type="number" hide />
										<YAxis
											dataKey="name"
											type="category"
											stroke="#6b7280"
											fontSize={12}
											tickLine={false}
											axisLine={false}
											width={60}
										/>
										<Tooltip
											cursor={{ fill: "#f3f4f6" }}
											contentStyle={{
												backgroundColor: "#ffffff",
												borderColor: "#e5e7eb",
												color: "#111827",
												boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
											}}
										/>
										<Bar
											dataKey="value"
											fill="#3b82f6"
											radius={[0, 4, 4, 0]}
											barSize={20}
										/>
									</BarChart>
								</ResponsiveContainer>
							</ChartCard>
						</div>
					</>
				)}
			</div> */}
			<OfferDashboard />

			{/* Recent Orders Table Container */}
			{/* Professional Recent Transactions Section */}
<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
  {/* Header Section */}
  <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50">
    <div>
      <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Transactions</h3>
      <p className="text-xs text-gray-500 mt-0.5">Overview of your latest sales activity</p>
    </div>
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all active:scale-95">
        <Filter size={14} /> Filter
      </button>
      <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all active:scale-95">
        <Download size={14} /> Export
      </button>
    </div>
  </div>

  {/* Table / Mobile View Wrapper */}
  <div className="relative">
    {/* Desktop View: Clean & Spacious */}
    <div className="hidden md:block">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Product Details</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {!loading && currentOrders.map((order) => (
            <tr key={order.id} className="group hover:bg-blue-50/30 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-500 font-mono">#{order.id}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 border border-white shadow-sm">
                    {order.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{order.customer}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
              <td className="px-6 py-4 text-center">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-bold text-gray-900">{order.amount}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile View: Modern Cards */}
    <div className="md:hidden divide-y divide-gray-50">
      {!loading && currentOrders.map((order) => (
        <div key={order.id} className="p-5 hover:bg-gray-50 active:bg-gray-100 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-700">
                {order.customer.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="font-bold text-gray-900 text-sm">{order.customer}</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{order.amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-mono">ID: {order.id}</span>
            <StatusBadge status={order.status} />
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Professional Pagination Section */}
  <div className="px-6 py-4 bg-white border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
    <p className="text-xs font-medium text-gray-400">
      Displaying <span className="text-gray-900">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, RECENT_ORDERS.length)}</span> of <span className="text-gray-900">{RECENT_ORDERS.length}</span>
    </p>
    
    <nav className="flex items-center gap-1 bg-gray-100/50 p-1 rounded-xl">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-all"
      >
        <Minus size={16} strokeWidth={2.5} />
      </button>
      
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => paginate(i + 1)}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
            currentPage === i + 1 
            ? "bg-white text-blue-600 shadow-sm scale-110" 
            : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-all"
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </nav>
  </div>
</div>
		</div>
	);
};

export default SellerDashboardHome;
