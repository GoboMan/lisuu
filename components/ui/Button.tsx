type props = {
  children : React.ReactNode;
  onClick? : () => void;
  variant? : "primary" | "secondary" | "custom";
  className? : string;
  disabled? : boolean;
};

export default function Button({ children, onClick, variant = "primary", className = "", disabled = false } : props){
  const baseStyle = "px-3 py-1 hover:opacity-80 cursor-pointer transition-colors duration-200";
  const variantStyle = {
    primary : "bg-blue-500 text-white rounded-2xl",
    secondary : "bg-gray-200 text-gray-700 rounded-2xl",
    custom : "",
  };

  return (
    <button 
      className={`${baseStyle} ${variantStyle[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}