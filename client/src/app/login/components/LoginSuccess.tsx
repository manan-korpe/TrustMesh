import {
  CheckCircle2,
} from "lucide-react";

interface LoginSuccessProps {
  role: string;
}

const LoginSuccess = ({
  role,
}: LoginSuccessProps) => {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">

      {/* Success Icon */}
      <div
        className="
          w-20
          h-20
          bg-green-50
          rounded-full
          flex
          items-center
          justify-center
        "
      >
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </div>

      {/* Title */}
      <div>

        <h3 className="text-xl font-bold text-slate-900">
          Login Successful
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Identity verified successfully.
        </p>

      </div>

      {/* Verification details */}
      <div className="pt-4 flex flex-col space-y-2 text-sm text-left w-full">

        <div
          className="
            flex
            items-center
            text-green-700
            bg-green-50
            p-2
            rounded
            border
            border-green-100
          "
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />

          Wallet ownership confirmed
        </div>

        <div
          className="
            flex
            items-center
            text-green-700
            bg-green-50
            p-2
            rounded
            border
            border-green-100
          "
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />

          Role loaded: {role}
        </div>

      </div>

    </div>
  );
};

export default LoginSuccess;