export function SecondaryButton({ children, ...props }) {
  return (
    <button
      className="flex h-8 cursor-pointer items-center rounded border-2 border-btn-secondary-dark bg-btn-secondary px-4 text-sm tracking-wide text-white  duration-200 ease-in hover:bg-btn-secondary-dark"
      {...props}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
