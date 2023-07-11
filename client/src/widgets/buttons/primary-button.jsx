export function PrimaryButton({ children, ...props }) {
  return (
    <button
      className="flex h-8 cursor-pointer items-center rounded border-2 border-btn-primary-dark bg-btn-primary px-4 text-sm tracking-wide text-white duration-200  ease-in hover:bg-btn-primary-dark"
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
