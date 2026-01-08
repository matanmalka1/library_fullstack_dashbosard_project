export const PageContainer = ({ className = "", children }) => (
  <div className={`max-w-[1120px] mx-auto px-4 lg:px-8 ${className}`}>
    {children}
  </div>
);
