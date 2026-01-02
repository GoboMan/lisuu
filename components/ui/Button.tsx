type props = {
  children : React.ReactNode;
  onClick? : () => void;
  variant? : "primary" | "secondary" | "custom";
  className? : string;
};

export default function Button({ children, onClick, variant = "primary", className = "" } : props){
  const baseStyle = "px-3 py-1 rounded-2xl hover:opacity-80 cursor-pointer transition-colors duration-200";
  const variantStyle = {
    primary : "bg-blue-500 text-white",
    secondary : "bg-gray-200 text-gray-700",
    custom : "",
  };

  return (
    <button className={`${baseStyle} ${variantStyle[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}