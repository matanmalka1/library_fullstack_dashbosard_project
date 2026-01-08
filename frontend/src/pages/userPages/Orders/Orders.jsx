import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { ordersService } from "../../../services/OrdersService";
import { useAuth } from "../../../context/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { OrderCard } from "./OrderCard";
import { useCart } from "../../../context/cart/CartContext";
import { EmptyState } from "../../../components/ui/EmptyState";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
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
      <h1 className="font-serif text-4xl text-slate-900 mb-10">
        Purchase History
      </h1>

      <div className="grid gap-8">
        {orders.map((order) => (
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
