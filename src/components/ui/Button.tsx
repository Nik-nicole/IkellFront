interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, variant = 'primary', className = '', onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-sm font-medium transition ${
        variant === 'primary'
          ? 'bg-black text-white hover:bg-gray-800'
          : 'bg-white border text-gray-900 hover:bg-gray-100'
      } ${className}`}
    >
      {children}
    </button>
  );
};
