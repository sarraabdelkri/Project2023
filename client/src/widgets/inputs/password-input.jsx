import { useRef } from "react";

export function PasswordInput({ label, ...props }) {
  const inputRef = useRef(null);
  const togglePassword = (e) => {
    const input = inputRef.current;
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

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
        type="password"
        {...props}
      ></input>

      <button
        type="button"
        aria-label="view-password"
        className="text-light absolute right-0 cursor-pointer px-2 hover:text-primary"
        onClick={(e) => {
          togglePassword(e);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-eye-off"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          title="show"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="3" y1="3" x2="21" y2="21"></line>
          <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83"></path>
          <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"></path>
        </svg>
      </button>
    </div>
  );
}

export default PasswordInput;
