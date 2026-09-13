"use client"
import { Badge } from "@/components/ui/Badge";
import { Button, Variant } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/hooks/app.hook";
import { NoticeType } from "@/types/notice";
import { User } from "@/types/user";
import {
  AlertCircle,
  BadgeCheck,
  Box,
  CheckCircle2,
  Copy,
  Database,
  Fingerprint,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";


export default function MyIdentityView() {
  const {currentUser,notify} = useApp();

  if(!currentUser) return <h1>Loading</h1>;
  
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    notify(`${label} copied to clipboard`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Identity</h1>
        <p className="text-slate-500 mt-1">
          View and manage your decentralized organizational identity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 col-span-1 flex flex-col items-center text-center bg-gradient-to-b from-white to-slate-50 border-t-4 border-t-blue-500">
          <div className="w-full flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold mb-4 shadow-inner border-4 border-white">
            {currentUser.name.charAt(0)}
          </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {currentUser.name}
          </h2>
          <p className="text-slate-500 text-sm mb-4">{currentUser.email}</p>
          <Badge
            variant={currentUser.status === "Verified" ? "success" : "warning"}
            className="mb-6"
          >
            {currentUser.status === "Verified" ? (
              <CheckCircle2 className="w-3 h-3 mr-1" />
            ) : (
              <AlertCircle className="w-3 h-3 mr-1" />
            )}
            {currentUser.status} Identity
          </Badge>

          <div className="w-full text-left space-y-4 border-t border-slate-200 pt-6 mt-auto">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                Employee ID
              </div>
              <div className="font-medium text-slate-900">{currentUser.id}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                Department
              </div>
              <div className="font-medium text-slate-900">
                {currentUser.dept}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                Role
              </div>
              <div className="font-medium text-slate-900">
                {currentUser.role}
              </div>
            </div>
          </div>
        </Card>

        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center">
              <Fingerprint className="w-5 h-5 mr-2 text-blue-600" />{" "}
              Cryptographic Details
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Decentralized Identifier (DID)
                </label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 break-all shadow-sm">
                    {currentUser.did || "Not generated - Requires Verification"}
                  </code>
                  <Button
                    variant={Variant.Outline}
                    onClick={() => handleCopy(currentUser?.did ?? "", "DID")}
                    disabled={!currentUser.did}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Registered Wallet Address
                </label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 break-all shadow-sm">
                    {currentUser.wallet || "No wallet connected"}
                  </code>
                  <Button
                    variant={Variant.Outline}
                    onClick={() =>
                      handleCopy(currentUser?.wallet ?? "", "Wallet address")
                    }
                    disabled={!currentUser.wallet}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="pt-3 text-sm text-slate-600 flex items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
                <ShieldCheck className="w-5 h-5 mr-2 mt-0.5 text-blue-600 shrink-0" />
                <p>
                  Your identity is secured by smart contracts on the Sepolia
                  network. Only you control the private keys to your wallet,
                  ensuring true digital ownership.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <BadgeCheck className="w-5 h-5 mr-2 text-purple-600" />{" "}
              Permissions & Access Controls
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center">
                  <Database className="w-4 h-4 text-slate-500 mr-3" />{" "}
                  <span className="text-sm font-medium text-slate-700">
                    Platform Login
                  </span>
                </div>
                <Badge
                  variant={
                    currentUser.status === "Verified" ? "success" : "warning"
                  }
                >
                  {currentUser.status === "Verified" ? "Active" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center">
                  <Box className="w-4 h-4 text-slate-500 mr-3" />{" "}
                  <span className="text-sm font-medium text-slate-700">
                    Asset Ownership
                  </span>
                </div>
                <Badge
                  variant={
                    currentUser.status === "Verified" ? "success" : "warning"
                  }
                >
                  {currentUser.status === "Verified" ? "Granted" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-slate-500 mr-3" />{" "}
                  <span className="text-sm font-medium text-slate-700">
                    Identity Provisioning
                  </span>
                </div>
                <Badge
                  variant={
                    ["Admin", "Manager"].includes(currentUser.role)
                      ? "success"
                      : "danger"
                  }
                >
                  {["Admin", "Manager"].includes(currentUser.role)
                    ? "Granted"
                    : "Denied"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-slate-500 mr-3" />{" "}
                  <span className="text-sm font-medium text-slate-700">
                    RBAC Management
                  </span>
                </div>
                <Badge
                  variant={currentUser.role === "Admin" ? "success" : "danger"}
                >
                  {currentUser.role === "Admin" ? "Granted" : "Denied"}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
