import { Link } from "react-router-dom";

export function SignUpSent() {
  return (
    <div>
      <div className="bg-orange-mist flex h-screen w-full flex-col items-center justify-center p-0 sm:p-20">
        <div className="border-orange-light h-fit w-full flex-1 rounded-lg border bg-white p-4 shadow-lg sm:w-[400px] sm:p-10">
          <div className="mb-10 flex justify-center">
            <Link aria-label="ES" to="/">
              <img
                alt="ES Logo"
                loading="lazy"
                width="150"
                height="150"
                decoding="async"
                src="/img/logo.png"
              />
            </Link>
          </div>
          <h1 className="mb-8 text-center	text-2xl font-medium text-primary">
            Verification email sent!
          </h1>
          <p className="mb-8 text-center text-sm text-gray-600">
            Check your inbox for a link verify your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpSent;
