import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { DollarSign, Droplets, Package, AlertCircle, Filter, Download } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

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
    <td className="px-6 py-4"><div className="h-3 w-24 bg-gray-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-3 w-32 bg-gray-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-3 w-28 bg-gray-200 rounded"></div></td>
    <td className="px-6 py-4"><div className="h-5 w-20 bg-gray-200 rounded-full"></div></td>
    <td className="px-6 py-4 text-right"><div className="h-3 w-20 bg-gray-200 rounded ml-auto"></div></td>
  </tr>
);


const SellerDashboardHome = () => {
  const { seller, token } = useSelector((state) => state.auth)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const getOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/order/seller/${seller._id}`)
      setOrders(response.data)
    } catch (err) {
      console.log("Error fetching orders, using mock data", err)
      // Use mock data as fallback
      setOrders([
        {
          _id: "6921fc4febe1d1f217384409",
          sellerId: "691b6cdb54bbb4dcecdb01e3",
          items: [
            {
              productId: {
                _id: "691cadaf1d00cc1b51a5a881",
                name: "Detergent Powder",
                description: "High quality washing powder",
                price: 450,
                unit: "kg",
                stock: 100,
                category: "Detergent",
                imageUrl: "https://example.com/detergent.jpg",
                isActive: true,
                createdAt: "2025-11-18T17:32:31.614Z",
                updatedAt: "2025-11-18T17:32:31.614Z",
                __v: 0,
              },
              qty: 10,
              price: 450,
              _id: "6921fc4febe1d1f21738440a",
            },
            {
              productId: {
                _id: "691cc937414db57fb18eb0c4",
                name: "Organic Basmati Rice",
                description: "Premium long-grain organic basmati rice.",
                price: 120,
                unit: "kg",
                stock: 200,
                category: "Groceries",
                imageUrl: "https://example.com/images/rice.jpg",
                isActive: true,
                createdAt: "2025-11-18T19:29:59.235Z",
                updatedAt: "2025-11-18T19:29:59.235Z",
                __v: 0,
              },
              qty: 50,
              price: 120,
              _id: "6921fc4febe1d1f21738440b",
            },
            {
              productId: {
                _id: "691cc95e414db57fb18eb0c6",
                name: "Fresh Cow Milk",
                description: "Farm-fresh full-cream milk.",
                price: 60,
                unit: "liter",
                stock: 150,
                category: "Dairy",
                imageUrl: "https://example.com/images/milk.jpg",
                isActive: true,
                createdAt: "2025-11-18T19:30:38.784Z",
                updatedAt: "2025-11-18T19:30:38.784Z",
                __v: 0,
              },
              qty: 30,
              price: 60,
              _id: "6921fc4febe1d1f21738440c",
            },
          ],
          totalQty: 90,
          totalAmount: 12300,
          status: "pending",
          offerId: {
            _id: "691ccba7414db57fb18eb0d1",
            title: "Festival Bulk Purchase Offer",
            description: "Buy in bulk and get special festive discounts!",
            products: [
              {
                productId: "691cadaf1d00cc1b51a5a881",
                minQty: 10,
                _id: "691ccba7414db57fb18eb0d2",
              },
              {
                productId: "691cc937414db57fb18eb0c4",
                minQty: 50,
                _id: "691ccba7414db57fb18eb0d3",
              },
              {
                productId: "691cc95e414db57fb18eb0c6",
                minQty: 30,
                _id: "691ccba7414db57fb18eb0d4",
              },
            ],
            startDate: "2025-11-20T00:00:00.000Z",
            endDate: "2025-12-05T23:59:59.999Z",
            status: "active",
            sellerPurchases: [
              {
                sellerId: "691b6cdb54bbb4dcecdb01e3",
                totalQty: 90,
                orders: [
                  {
                    orderId: "6921fc4febe1d1f217384409",
                    qty: 90,
                    _id: "6921fc4febe1d1f217384413",
                    date: "2025-11-22T18:09:19.822Z",
                  },
                ],
                _id: "6921fc4febe1d1f217384412",
              },
            ],
            winner: null,
            createdAt: "2025-11-18T19:40:23.511Z",
            updatedAt: "2025-11-22T18:09:19.824Z",
            __v: 1,
          },
          createdAt: "2025-11-22T18:09:19.792Z",
          updatedAt: "2025-11-22T18:09:19.792Z",
          __v: 0,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (seller?._id) {
      getOrders()
    }
  }, [seller])

  // Calculate statistics from real orders data
  const stats = {
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    litersSold: orders.reduce((sum, order) => {
      const liquidItems = order.items.filter(item => 
        item.productId?.unit === 'liter' || item.productId?.unit === 'liters'
      )
      return sum + liquidItems.reduce((itemSum, item) => itemSum + item.qty, 0)
    }, 0),
    activeOrders: orders.filter((order) => order.status === "pending").length,
    qualityAlerts: orders.filter((order) => 
      order.items.some(item => item.productId?.stock < 10)
    ).length,
  }

  // Generate chart data from orders
  const SALES_DATA = orders.map(order => ({
    time: new Date(order.createdAt).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    sales: order.totalAmount,
    orders: order.totalQty
  }))
  console.log("orders data", orders)
  // Generate inventory data from products in orders
  // const INVENTORY_DATA = Array.from(new Set(
  //   orders.flatMap(order => order.items.map(item => item.productId))
  // )).map(product => ({
  //   name: product.name?.length > 12  ? product?.name?.substring(0, 12) + '...' : product?.name,
  //   value: product?.stock
  // })).slice(0, 5) // Take top 5 products

  const INVENTORY_DATA = Array.from(
    new Set(
      orders.flatMap(order =>
        order.items
          .map(item => item.productId)
          .filter(Boolean) // ✅ removes null / undefined
      )
    )
  )
  .map(product => ({
    name:
      product?.name?.length > 12
        ? product.name.substring(0, 12) + "..."
        : product?.name,
    value: product?.stock
  }))
  .slice(0, 5);


  // Recent transactions data
  const RECENT_ORDERS = orders.slice(0, 5).map(order => ({
    id: order._id.slice(-8).toUpperCase(),
    customer: `Customer ${order._id.slice(-4)}`,
    product: order.items[0]?.productId?.name || 'Multiple Products',
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
    amount: `₹${order.totalAmount.toLocaleString()}`
  }))

  // StatCard Component (same as before)
  const StatCard = ({ title, value, trend, trendUp, icon: Icon, color }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )

  // ChartCard Component (same as before)
  const ChartCard = ({ title, children }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-80">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  )

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading?(
          Array.from({ length: 4 }).map((_, i) => (
            <SellerStatShimmer key={i} />
          ))
        ):(
        <>
          <StatCard
            title="My Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            trend="+20.1%"
            trendUp={true}
            icon={DollarSign}
            color="text-blue-600"
          />
          <StatCard
            title="Liters Sold"
            value={`${stats.litersSold.toLocaleString()} L`}
            trend="+12.5%"
            trendUp={true}
            icon={Droplets}
            color="text-blue-500"
          />
          <StatCard
            title="Active Orders"
            value={stats.activeOrders.toString()}
            trend="-2.4%"
            trendUp={false}
            icon={Package}
            color="text-indigo-600"
          />
          <StatCard
            title="Quality Alerts"
            value={stats.qualityAlerts.toString()}
            trend="Action Req"
            trendUp={false}
            icon={AlertCircle}
            color="text-red-600"
          />
        </>)
        }
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {loading?
        (
          <>
            <div className="lg:col-span-2">
              <SellerChartShimmer />
            </div>
            <div className="lg:col-span-1">
              <SellerChartShimmer />
            </div>
          </>
        ) :(<>
            <div className="lg:col-span-2">
            <ChartCard title="Sales Velocity (24h)">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
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
                <BarChart data={INVENTORY_DATA} layout="vertical" margin={{ left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
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
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </>)
        }
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-900 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading?(
                Array.from({ length: 5 }).map((_, i) => (
                  <SellerTableRowShimmer key={i} />
                ))
              ) :
              RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-600">{order.id}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.product}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${
                        order.status === "Completed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : order.status === "Processing"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : order.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {order.status === "Completed" && <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />}
                      {order.status === "Processing" && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />}
                      {order.status === "Pending" && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-900">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboardHome