import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { ordersService } from "../../../services/OrdersService";
import { useAuth } from "../../../context/auth/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { OrderCard } from "./OrderCard";
import { useCart } from "../../../context/cart/CartContext";
import { EmptyState } from "../../../components/ui/EmptyState";
import { OrderStatus } from "../../../types";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (!user) return;
    const data = await ordersService.getOrders(user.id);
    setOrders(
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (!status) {
      setStatusFilter("ALL");
      return;
    }
    const allowed = new Set(Object.values(OrderStatus));
    setStatusFilter(allowed.has(status) ? status : "ALL");
  }, [location.search]);

  const handleCancelOrder = async (orderId) => {
    if (!confirm("Cancel this order and request a refund?")) return;
    await ordersService.cancelOrder(orderId);
    fetchOrders();
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      if (item?.book) {
        addToCart(item.book, item.quantity);
      }
    });
    navigate("/cart");
  };

  if (loading)
    return (
      <div className="max-w-[1120px] mx-auto px-4 py-20 flex justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );

  if (orders.length === 0) {
    return (
      <div className="max-w-[1120px] mx-auto px-4 py-32 text-center">
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="When you buy your first book, it will show up here."
          iconWrapperClassName="w-20 h-20 bg-slate-50 rounded-full"
          iconClassName="w-10 h-10 text-slate-300"
          titleClassName="text-slate-800"
          descriptionClassName="mb-8"
          action={
            <Link
              to="/books"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold no-underline"
            >
              Start Shopping
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 py-12">
      <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
        <h1 className="font-serif text-4xl text-slate-900 m-0">
          Purchase History
        </h1>
        <select
          value={statusFilter}
          onChange={(e) => {
            const value = e.target.value;
            setStatusFilter(value);
            if (value === "ALL") {
              navigate("/orders");
            } else {
              navigate(`/orders?status=${encodeURIComponent(value)}`);
            }
          }}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
        >
          <option value="ALL">All</option>
          <option value={OrderStatus.PENDING}>Pending</option>
          <option value={OrderStatus.SHIPPED}>Shipped</option>
          <option value={OrderStatus.DELIVERED}>Delivered</option>
          <option value={OrderStatus.CANCELLED}>Cancelled</option>
        </select>
      </div>

      <div className="grid gap-8">
        {orders
          .filter((order) =>
            statusFilter === "ALL" ? true : order.status === statusFilter
          )
          .map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              user={user}
              onCancel={handleCancelOrder}
              onReorder={handleReorder}
            />
          ))}
      </div>
    </div>
  );
};
