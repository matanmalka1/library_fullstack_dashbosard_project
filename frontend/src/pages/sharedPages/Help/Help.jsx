import { Mail, MessageCircle, BookOpen } from "lucide-react";

export const Help = () => (
  <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-16">
    <div className="flex flex-col gap-4 max-w-[680px]">
      <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
        Help Center
      </p>
      <h1 className="font-serif text-4xl lg:text-5xl text-slate-900">
        How can we help?
      </h1>
      <p className="text-slate-600 text-lg leading-7">
        Find quick answers or reach the team. We are here to help you get back
        to reading.
      </p>
    </div>

    <div className="grid gap-6 mt-12 md:grid-cols-3">
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <BookOpen className="w-6 h-6 text-indigo-500 mb-4" />
        <h3 className="text-lg font-bold text-slate-900 mb-2">FAQs</h3>
        <p className="text-slate-500 m-0">
          Shipping times, returns, and account settings.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <MessageCircle className="w-6 h-6 text-indigo-500 mb-4" />
        <h3 className="text-lg font-bold text-slate-900 mb-2">Live Chat</h3>
        <p className="text-slate-500 m-0">
          Available Mon–Fri, 9am–5pm.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <Mail className="w-6 h-6 text-indigo-500 mb-4" />
        <h3 className="text-lg font-bold text-slate-900 mb-2">Email Us</h3>
        <p className="text-slate-500 m-0">support@bookstore.example</p>
      </div>
    </div>

    <div className="mt-12 bg-slate-50 border border-slate-200 rounded-[24px] p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Top questions</h2>
      <div className="grid gap-5 text-slate-600">
        <div>
          <p className="font-semibold text-slate-900 m-0">
            How do I update my shipping address?
          </p>
          <p className="m-0 mt-1">
            Go to Profile, open Default Shipping Address, update the fields, and
            save.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900 m-0">
            Where can I view my order history?
          </p>
          <p className="m-0 mt-1">
            Visit Orders from the navbar to see all past purchases and order
            statuses.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900 m-0">
            How do I reset my password?
          </p>
          <p className="m-0 mt-1">
            In Profile, open Security and submit the password change form.
          </p>
        </div>
      </div>
    </div>
  </div>
);
