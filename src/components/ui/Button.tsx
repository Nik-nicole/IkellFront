interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ children, variant = 'primary' }: ButtonProps) => {
  return (
    <button
      className={`px-6 py-3 rounded-full text-sm font-medium transition ${
        variant === 'primary'
          ? 'bg-black text-white hover:bg-gray-800'
          : 'bg-white border text-gray-900 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
};
