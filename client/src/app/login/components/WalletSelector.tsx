import {
  Box,
  ChevronRight,
  Smartphone,
} from "lucide-react";

import {
  Button,
  Variant,
} from "@/components/ui/Button";

interface WalletSelectorProps {
  onMetaMask: () => void;
  onCancel: () => void;
}

const WalletSelector = ({
  onMetaMask,
  onCancel,
}: WalletSelectorProps) => {
  return (
    <div className="space-y-4">

      <h3 className="text-lg font-medium text-slate-900 text-center mb-6">
        Select Wallet Provider
      </h3>

      {/* MetaMask */}
      <button
        onClick={onMetaMask}
        className="
          w-full
          flex
          items-center
          justify-between
          p-4
          border
          border-slate-200
          rounded-xl
          hover:border-blue-500
          hover:bg-blue-50
          transition-all
          group
        "
      >
        <div className="flex items-center">

          <div
            className="
              w-8
              h-8
              bg-orange-100
              text-orange-500
              rounded-full
              flex
              items-center
              justify-center
              mr-4
              group-hover:bg-orange-200
            "
          >
            <Box className="w-5 h-5" />
          </div>

          <span className="font-medium text-slate-900">
            MetaMask
          </span>

        </div>

        <ChevronRight className="w-5 h-5 text-slate-400" />
      </button>

      {/* WalletConnect */}
      <button
        disabled
        className="
          w-full
          flex
          items-center
          justify-between
          p-4
          border
          border-slate-200
          rounded-xl
          opacity-50
          cursor-not-allowed
        "
      >
        <div className="flex items-center">

          <div
            className="
              w-8
              h-8
              bg-blue-100
              text-blue-500
              rounded-full
              flex
              items-center
              justify-center
              mr-4
            "
          >
            <Smartphone className="w-5 h-5" />
          </div>

          <span className="font-medium text-slate-900">
            WalletConnect
          </span>

        </div>
      </button>

      {/* Cancel */}
      <Button
        variant={Variant.Ghost}
        className="w-full mt-4"
        onClick={onCancel}
      >
        Cancel
      </Button>

    </div>
  );
};

export default WalletSelector;