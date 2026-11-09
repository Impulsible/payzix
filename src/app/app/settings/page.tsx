"use client";

import { useState } from "react";
import {
  User,
  ShieldCheck,
  KeyRound,
  Smartphone,
  Bell,
  CheckCircle2,
  Lock,
  ChevronRight,
  LogOut,
  Fingerprint,
  Building2,
} from "lucide-react";
import { Badge, Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input } from "@/components/ui";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

type SettingsTab = "profile" | "security" | "limits" | "notifications";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [biometrics, setBiometrics] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailReceipts, setEmailReceipts] = useState(true);
  const [pinForm, setPinForm] = useState({ oldPin: "", newPin: "", confirmPin: "" });
  const [pinLoading, setPinLoading] = useState(false);

  function handleUpdatePin(e: React.FormEvent) {
    e.preventDefault();
    if (pinForm.newPin !== pinForm.confirmPin) {
      toast({
        variant: "error",
        title: "PIN mismatch",
        description: "New transaction PIN and confirmation PIN do not match.",
      });
      return;
    }

    setPinLoading(true);
    setTimeout(() => {
      setPinLoading(false);
      setPinForm({ oldPin: "", newPin: "", confirmPin: "" });
      toast({
        variant: "success",
        title: "Transaction PIN updated",
        description: "Your 4 digit transfer PIN has been updated successfully.",
      });
    }, 1000);
  }

  return (
    <div className="max-w-4xl space-y-6">
      
      {/* Header */}
      <div>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-2xs font-semibold text-green-600 dark:text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span>Account Preferences</span>
        </div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
          Account Settings
        </h1>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
          Manage your personal profile, transaction security, transfer limits, and notification preferences.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex rounded-2xl border border-border/60 bg-surface-raised p-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "profile"
              ? "bg-surface text-text shadow-xs border border-border/40"
              : "text-muted hover:text-text"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "security"
              ? "bg-surface text-text shadow-xs border border-border/40"
              : "text-muted hover:text-text"
          }`}
        >
          <Lock className="h-4 w-4" />
          <span>Security &amp; PIN</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("limits")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "limits"
              ? "bg-surface text-text shadow-xs border border-border/40"
              : "text-muted hover:text-text"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Limits &amp; Verification</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "notifications"
              ? "bg-surface text-text shadow-xs border border-border/40"
              : "text-muted hover:text-text"
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </button>
      </div>

      {/* TAB 1: PROFILE */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <Card className="border-border/60 bg-surface shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Personal Identity</CardTitle>
              <CardDescription className="text-xs">Your verified account profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm">
              <Row label="Full Name" value={user?.fullName || "Adaeze Nwosu"} />
              <Row label="Email Address" value={user?.email || "adaeze@example.com"} />
              <Row
                label="Phone Number"
                value={<span className="font-mono text-text font-bold">+234 801 234 5678</span>}
              />
              <Row
                label="Account Status"
                value={
                  <Badge variant="success" className="inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Active Wallet</span>
                  </Badge>
                }
              />
              <Row
                label="Account Tier"
                value={
                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 font-bold">
                    Tier 3 Verified
                  </Badge>
                }
              />
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-surface shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Bank Details</CardTitle>
              <CardDescription className="text-xs">Direct deposit information for incoming transfers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs sm:text-sm">
              <Row label="Bank Name" value="Payzix Microfinance Bank" />
              <Row
                label="Account Number"
                value={<span className="font-mono font-bold text-text text-sm">9012345678</span>}
              />
              <Row label="Account Type" value="Personal Savings Wallet" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: SECURITY & PIN */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Transfer PIN */}
          <Card className="border-border/60 bg-surface shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Transaction PIN</CardTitle>
              <CardDescription className="text-xs">Used to authorize all bank transfers and bill payments.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePin} className="space-y-4 max-w-md">
                <Input
                  label="Current PIN"
                  type="password"
                  maxLength={4}
                  required
                  placeholder="••••"
                  value={pinForm.oldPin}
                  onChange={(e) => setPinForm((f) => ({ ...f, oldPin: e.target.value }))}
                  className="h-11 rounded-xl text-center text-lg tracking-widest"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="New 4 Digit PIN"
                    type="password"
                    maxLength={4}
                    required
                    placeholder="••••"
                    value={pinForm.newPin}
                    onChange={(e) => setPinForm((f) => ({ ...f, newPin: e.target.value }))}
                    className="h-11 rounded-xl text-center text-lg tracking-widest"
                  />

                  <Input
                    label="Confirm New PIN"
                    type="password"
                    maxLength={4}
                    required
                    placeholder="••••"
                    value={pinForm.confirmPin}
                    onChange={(e) => setPinForm((f) => ({ ...f, confirmPin: e.target.value }))}
                    className="h-11 rounded-xl text-center text-lg tracking-widest"
                  />
                </div>

                <Button
                  type="submit"
                  loading={pinLoading}
                  className="h-10 rounded-xl bg-green-500 font-bold text-navy hover:bg-green-400 cursor-pointer"
                >
                  Update Transaction PIN
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Biometrics & Devices */}
          <Card className="border-border/60 bg-surface shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Device Security</CardTitle>
              <CardDescription className="text-xs">Manage login biometric authorizations and active devices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4 py-2 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
                    <Fingerprint className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text">Biometric Login</p>
                    <p className="text-2xs text-muted">Use Face ID or fingerprint to sign in quickly</p>
                  </div>
                </div>

                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={biometrics}
                    onChange={(e) => setBiometrics(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-border/80 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full" />
                </label>
              </div>

              <div className="flex items-center justify-between gap-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text">Current Active Device</p>
                    <p className="text-2xs text-muted">iPhone 15 Pro • Lagos, Nigeria</p>
                  </div>
                </div>

                <Badge variant="success" className="text-2xs">Active Session</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 3: LIMITS & VERIFICATION */}
      {activeTab === "limits" && (
        <div className="space-y-6">
          <Card className="border-border/60 bg-surface shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">CBN Transfer Limits</CardTitle>
              <CardDescription className="text-xs">Based on Central Bank of Nigeria identity verification tiers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">Tier 3 Maximum Upgrade</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-2xs text-muted">Single Transfer Limit</p>
                    <p className="font-heading font-extrabold text-text text-base">₦5,000,000.00</p>
                  </div>
                  <div>
                    <p className="text-2xs text-muted">Daily Transfer Limit</p>
                    <p className="font-heading font-extrabold text-text text-base">₦25,000,000.00</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <VerificationRow
                  title="BVN Verification"
                  desc="Bank Verification Number connected"
                  status="Verified"
                />
                <VerificationRow
                  title="NIN Verification"
                  desc="National Identity Number connected"
                  status="Verified"
                />
                <VerificationRow
                  title="Residential Address"
                  desc="Utility bill verified by compliance"
                  status="Verified"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <Card className="border-border/60 bg-surface shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">Alert Preferences</CardTitle>
            <CardDescription className="text-xs">Control how you receive wallet transaction alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4 py-2 border-b border-border/40">
              <div>
                <p className="text-xs font-bold text-text">SMS Instant Alerts</p>
                <p className="text-2xs text-muted">Receive SMS notifications for every debit and credit</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-border/80 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full" />
              </label>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <div>
                <p className="text-xs font-bold text-text">Email Receipts</p>
                <p className="text-2xs text-muted">Get detailed PDF transaction receipts sent to your inbox</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={emailReceipts}
                  onChange={(e) => setEmailReceipts(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-border/80 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full" />
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Danger Zone */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-text">Sign out of Payzix</p>
            <p className="text-2xs text-muted">Securely terminate active session on this device</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={logout}
            className="border-red-500/30 text-red-500 hover:bg-red-500/10 cursor-pointer text-xs font-bold"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/40 py-2.5 last:border-0">
      <span className="text-text-secondary font-medium text-xs sm:text-sm">{label}</span>
      <div className="text-right text-text">{value}</div>
    </div>
  );
}

function VerificationRow({ title, desc, status }: { title: string; desc: string; status: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-surface-raised p-3">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
        <div>
          <p className="text-xs font-bold text-text">{title}</p>
          <p className="text-2xs text-muted">{desc}</p>
        </div>
      </div>
      <Badge variant="success" className="text-2xs">{status}</Badge>
    </div>
  );
}