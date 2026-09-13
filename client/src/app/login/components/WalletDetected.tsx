import {
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

interface WalletDetectedProps {
  wallet: string;
  onConnect: () => void;
}

const WalletDetected = ({
  wallet,
  onConnect,
}: WalletDetectedProps) => {

  const shortWallet = `${wallet.substring(
    0,
    6
  )}...${wallet.substring(wallet.length - 4)}`;

  return (
    <div className="space-y-6">

      <div className="text-center">

        <div
          className="
            inline-flex
            items-center
            justify-center
            w-16
            h-16
            rounded-full
            bg-green-100
            text-green-600
            mb-4
          "
        >
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-medium text-slate-900">
          MetaMask Detected
        </h3>

      </div>

      {/* Wallet information */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">

        <div className="flex justify-between text-slate-500 mb-1">
          <span>Account</span>
          <span>Network</span>
        </div>

        <div className="flex justify-between font-medium text-slate-900">

          <span className="font-mono">
            {shortWallet}
          </span>

          <span>
            Sepolia
          </span>

        </div>

      </div>

      <Button
        className="w-full"
        onClick={onConnect}
      >
        Connect to TrustMesh
      </Button>

    </div>
  );
};

export default WalletDetected;