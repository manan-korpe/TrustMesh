"use client";

import { useState } from "react";

import LoginStart from "./LoginStart";
import WalletSelector from "./WalletSelector";
import LoginLoading from "./LoginLoading";
import WalletDetected from "./WalletDetected";
import SignatureRequest from "./SignatureRequest";
import LoginSuccess from "./LoginSuccess";
import { User } from "@/types/user";
import { useApp } from "@/hooks/app.hook";

type LoginStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const LoginPage = () => {
  const {onLogin,users}=useApp();

  const [step, setStep] = useState<LoginStep>(0);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const demoUser =
    users.find((user) => user.role === "Admin" && user.status === "Verified") ||
    users[0];

  const handleConnect = () => {
    setStep(1);
  };

  const selectMetaMask = () => {
    setStep(2);

    setTimeout(() => {
      if (!demoUser) return;

      setSelectedWallet(demoUser.wallet);
      setStep(3);
    }, 1500);
  };

  const confirmConnection = () => {
    setStep(4);

    setTimeout(() => {
      setStep(5);
    }, 2000);
  };

  const signMessage = () => {
    setStep(6);

    setTimeout(() => {
      setStep(7);

      setTimeout(() => {
        if (demoUser) {
          onLogin(demoUser.id);
        }
      }, 1500);
    }, 2000);
  };

  return (
    <div className="p-8">
      {/* STEP 0 */}
      {step === 0 && <LoginStart onConnect={handleConnect} />}

      {/* STEP 1 */}
      {step === 1 && (
        <WalletSelector
          onMetaMask={selectMetaMask}
          onCancel={() => setStep(0)}
        />
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <LoginLoading type="connecting" message="Connecting to MetaMask..." />
      )}

      {/* STEP 3 */}
      {step === 3 && selectedWallet && (
        <WalletDetected wallet={selectedWallet} onConnect={confirmConnection} />
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <LoginLoading
          type="checking"
          message="Checking registered identity..."
          wallet={selectedWallet}
        />
      )}

      {/* STEP 5 */}
      {step === 5 && selectedWallet && (
        <SignatureRequest
          wallet={selectedWallet}
          onReject={() => setStep(0)}
          onSign={signMessage}
        />
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <LoginLoading
          type="verifying"
          message="Verifying cryptographic signature..."
        />
      )}

      {/* STEP 7 */}
      {step === 7 && demoUser && <LoginSuccess role={demoUser.role} />}
    </div>
  );
};

export default LoginPage;
