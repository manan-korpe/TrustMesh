import {
  Loader2,
  Search,
} from "lucide-react";

interface LoginLoadingProps {
  type: "connecting" | "checking" | "verifying";
  message: string;
  wallet?: string | null;
}

const LoginLoading = ({
  type,
  message,
  wallet,
}: LoginLoadingProps) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">

      {type === "checking" ? (
        <Search className="w-10 h-10 text-blue-600 animate-bounce" />
      ) : (
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      )}

      <p className="text-slate-600 font-medium animate-pulse">
        {message}
      </p>

      {wallet && (
        <p className="text-xs text-slate-400 font-mono break-all">
          {wallet}
        </p>
      )}

    </div>
  );
};

export default LoginLoading;