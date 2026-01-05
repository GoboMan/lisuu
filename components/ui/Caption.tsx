type props = {
  children : React.ReactNode;
  className? : string;
};

export default function Caption({ children, className = "" } : props) {
  return (
    <div className={`h-4 flex flex-row items-center mb-2 ${className}`}>
      <span className="h-full border border-blue-300 mr-2"></span>
      {children}
    </div>
  );
}