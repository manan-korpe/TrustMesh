import {
  Key,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

interface LoginStartProps {
  onConnect: () => void;
}

const LoginStart = ({ onConnect }: LoginStartProps) => {
  return (
    <div className="text-center space-y-6">

      <h3 className="text-lg font-medium text-slate-900">
        Sign in securely
      </h3>

      <p className="text-sm text-slate-500">
        Use your registered organizational wallet to verify your identity.
      </p>

      <div className="pt-4">
        <Button
          className="w-full py-3 text-base shadow-md"
          onClick={onConnect}
        >
          <Wallet className="w-5 h-5 mr-2" />
          Connect Wallet
        </Button>
      </div>

      <div
        className="
          flex
          items-center
          justify-center
          space-x-2
          text-xs
          text-slate-400
          mt-6
          bg-slate-50
          p-3
          rounded-lg
          border
          border-slate-100
        "
      >
        <Key className="w-4 h-4" />

        <span>
          Your wallet acts as your cryptographic key.
          We never request your private key.
        </span>
      </div>

    </div>
  );
};

export default LoginStart;