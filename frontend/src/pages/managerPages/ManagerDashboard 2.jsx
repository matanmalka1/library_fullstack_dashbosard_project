import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { OrderStatus } from "../../types";
import { bookService } from "../../services/BookService";
import { categoryService } from "../../services/CategoryService";
import { ordersService } from "../../services/OrdersService";
import { InventoryStats } from "../../components/manager/InventoryStats/InventoryStats";
import { InventoryTable } from "../../components/manager/InventoryTable/InventoryTable";
import { BookFormModal } from "../../components/manager/BookFormModal/BookFormModal";
import { AlertBanner } from "../../components/ui/AlertBanner";
import { PageContainer } from "../../components/layout/PageContainer/PageContainer";

export const ManagerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(books.length / pageSize));
  const pagedBooks = books.slice((page - 1) * pageSize, page * pageSize);

  const fetchData = async () => {
    setError("");
    setLoading(true);
    try {
      const [b, o] = await Promise.all([
        bookService.getBooks(),
        ordersService.getOrders(),
      ]);
      setBooks(b);
      setOrders(o);
    } catch (err) {
      setError(err.message || "Unable to load inventory data.");
    }
    try {
      const nextCategories = await categoryService.getCategories();
      setCategories(nextCategories);
    } catch {
      setCategories([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this book? This action cannot be undone.")) {
      try {
        await bookService.deleteBook(id);
        fetchData();
      } catch (err) {
        setError(err.message || "Unable to delete book.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <PageContainer className="py-12">
      <AlertBanner message={error} className="mb-6" />
      <div className="flex items-center justify-between gap-6 mb-10 flex-wrap">
        <div>
          <h1 className="font-serif text-4xl text-slate-900 mb-2">Inventory</h1>
          <p className="text-slate-500 m-0">Track stock and fulfill orders.</p>
        </div>
        <button
          onClick={() => {
            setEditingBook(null);
            setIsModalOpen(true);
          }}
          className="border-0 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold inline-flex items-center gap-2 cursor-pointer shadow-[0_12px_20px_rgba(79,70,229,0.2)]"
          type="button"
        >
          <Plus className="w-5 h-5" /> New Book
        </button>
      </div>

      <InventoryStats books={books} orders={orders} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <InventoryTable
            books={pagedBooks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            page={page}
            totalPages={totalPages}
            totalItems={books.length}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
        <div className="bg-slate-900 text-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(15,23,42,0.3)] h-fit">
          <h2 className="text-xl font-bold mb-6">Order Status</h2>
          <div className="grid gap-6">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between gap-4 mb-2 text-xs">
                  <span className="text-indigo-300 font-bold">#{o.id}</span>
                  <select
                    value={o.status}
                    onChange={async (e) => {
                      try {
                        await ordersService.updateOrderStatus(
                          o.id,
                          e.target.value
                        );
                        fetchData();
                      } catch (err) {
                        setError(
                          err.message || "Unable to update order status."
                        );
                      }
                    }}
                    className="bg-transparent border-0 text-white text-[10px] uppercase font-bold cursor-pointer outline-none"
                  >
                    {Object.values(OrderStatus).map((s) => (
                      <option key={s} value={s} className="bg-slate-900">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[10px] text-slate-400 max-w-[140px] truncate">
                    {o.shippingAddress}
                  </span>
                  <span className="font-bold text-sm">
                    ${o.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BookFormModal
          editingBook={editingBook}
          categories={categories}
          onClose={() => setIsModalOpen(false)}
          onSaved={fetchData}
        />
      )}
    </PageContainer>
  );
};
