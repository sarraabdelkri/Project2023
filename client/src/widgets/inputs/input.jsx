export function Input({ label, ...props }) {
  const name = label.toLowerCase().replace(" ", "-");
  return (
    <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
      <label
        htmlFor={name}
        className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
      >
        {label}
      </label>
      <input
        ref={inputRef}
        name={name}
        id={name}
        className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
        type="text"
        {...props}
      ></input>
    </div>
  );
}

export default Input;
