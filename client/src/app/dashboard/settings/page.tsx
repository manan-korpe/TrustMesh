"use client";

import { Button, Size, Variant } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useApp } from "@/hooks/app.hook";
import { NoticeType } from "@/types/notice";
import { User } from "@/types/user";
import { AlertCircle, Bell, LogOut, Settings, Shield } from "lucide-react";
import { useState } from "react";

export default function SettingsView(){
  const { currentUser, onLogout, notify } = useApp();
  const [notifications, setNotifications] = useState<boolean>(true);
  const [twoFactor, setTwoFactor] = useState<boolean>(false);

  const handleSave = () => {
    notify("Settings saved successfully");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your account preferences and security options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-100 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2.5" /> General Preferences
          </button>
          <button className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg border border-transparent transition-colors flex items-center">
            <Shield className="w-4 h-4 mr-2.5" /> Security{" "}
          </button>
          <button className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg border border-transparent transition-colors flex items-center">
            <Bell className="w-4 h-4 mr-2.5" /> Notifications
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 border-b border-slate-100 pb-3">
              Profile Information
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  defaultValue={currentUser.name}
                  disabled
                  className="opacity-80"
                />
                <Input
                  label="Email Address"
                  defaultValue={currentUser.email}
                  disabled
                  className="opacity-80"
                />
              </div>
              <Input
                label="Department"
                defaultValue={currentUser?.dept ?? "None"}
                disabled
                className="opacity-80 w-full sm:w-1/2 pr-2"
              />
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
                <p className="text-xs text-slate-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1.5 text-slate-400" />{" "}
                  Profile information is locked by organizational identity
                  policies. Contact HR for changes.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 border-b border-slate-100 pb-3">
              Security & Access
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">
                    Two-Factor Authentication (2FA)
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5">
                    Require wallet signature for sensitive actions like asset
                    transfer.
                  </div>
                </div>
                <button
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactor ? "bg-blue-600" : "bg-slate-300"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactor ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <div>
                  <div className="font-medium text-slate-900">
                    Wallet Session
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5">
                    End current session and disconnect cryptographic keys.
                  </div>
                </div>
                <Button
                  variant={Variant.Danger}
                  size={Size.SM}
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Disconnect
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5 border-b border-slate-100 pb-3">
              Notification Preferences
            </h3>
            <div className="space-y-5">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                    Email Activity Summaries
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5">
                    Receive daily summaries and critical security alerts.
                  </div>
                </div>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                    Asset Assignment Alerts
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5">
                    Get notified immediately when a new digital asset is minted
                    to your identity.
                  </div>
                </div>
              </label>
            </div>
          </Card>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="shadow-sm">
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
