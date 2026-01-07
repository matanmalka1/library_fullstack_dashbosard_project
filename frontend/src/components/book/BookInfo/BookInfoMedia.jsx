import { Truck, Shield, RotateCcw } from "lucide-react";
import { BookInfoFeature } from "./BookInfoFeature";

export const BookInfoMedia = ({ coverImage, safeTitle }) => (
  <div className="w-full lg:w-1/2">
    <div className="aspect-[3/4] bg-white rounded-[32px] border border-slate-200 shadow-[0_24px_50px_rgba(15,23,42,0.12)] p-12 flex items-center justify-center">
      <img
        src={coverImage}
        alt={`Cover of ${safeTitle}`}
        className="max-h-full object-contain"
        loading="lazy"
      />
    </div>

    <div className="grid grid-cols-3 gap-4 mt-6">
      <BookInfoFeature icon={Truck} label="Delivery" value="Express" />
      <BookInfoFeature icon={RotateCcw} label="Returns" value="30 Days" />
      <BookInfoFeature icon={Shield} label="Safe" value="Verified" />
    </div>
  </div>
);
