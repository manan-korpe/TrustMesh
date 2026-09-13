import {
  Fingerprint,
  CheckCircle2,
} from "lucide-react";

import {
  Button,
  Variant,
} from "@/components/ui/Button";

interface SignatureRequestProps {
  wallet: string;
  onReject: () => void;
  onSign: () => void;
}

const SignatureRequest = ({
  wallet,
  onReject,
  onSign,
}: SignatureRequestProps) => {

  const nonce = Math.floor(
    Math.random() * 1000000
  );

  const timestamp = new Date().toISOString();

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="text-center">

        <div
          className="
            inline-flex
            items-center
            justify-center
            w-16
            h-16
            rounded-full
            bg-blue-100
            text-blue-600
            mb-4
          "
        >
          <Fingerprint className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-medium text-slate-900">
          Security Verification
        </h3>

        <p className="text-sm text-slate-500 mt-2">
          Sign a one-time message to prove wallet ownership.
        </p>

      </div>

      {/* Message */}
      <div
        className="
          bg-slate-50
          p-4
          rounded-xl
          border
          border-slate-200
          font-mono
          text-xs
          text-slate-600
          break-all
          h-24
          overflow-y-auto
        "
      >
        TrustMesh Login Verification
        <br />

        Nonce: {nonce}
        <br />

        Timestamp: {timestamp}
        <br />

        Wallet: {wallet}
      </div>

      {/* Buttons */}
      <div className="flex space-x-3">

        <Button
          variant={Variant.Secondary}
          className="w-1/3"
          onClick={onReject}
        >
          Reject
        </Button>

        <Button
          className="w-2/3"
          onClick={onSign}
        >
          Sign Message
        </Button>

      </div>

    </div>
  );
};

export default SignatureRequest;