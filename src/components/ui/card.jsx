export function Card({ children, className = '', ...props }) {
  return (
    <div className={`p-4 bg-white rounded-xl shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
}
