import React, { useId } from 'react';

type TextareaProps = {
  label?: string;
  error?: string;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ label, error, className = '', ...props } : TextareaProps) {
  const id = useId(); // ユニークなIDを生成

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
      <textarea 
        id={id} 
        className={`
          px-3 py-2 bg-white border shadow-sm border-gray-300 
          placeholder-gray-400 focus:outline-none focus:border-blue-500 
          focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `} 
        {...props} 
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}