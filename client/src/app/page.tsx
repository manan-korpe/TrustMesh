import Link from "next/link";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  Network,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { Button, Variant } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Decentralized Identity",
    description:
      "Secure digital identities using decentralized identifiers and cryptographic verification.",
  },
  {
    icon: ShieldCheck,
    title: "RBAC Access Control",
    description:
      "Control system access using organization-defined roles and permissions.",
  },
  {
    icon: Box,
    title: "NFT Asset Ownership",
    description:
      "Represent physical and digital assets as blockchain-backed NFTs with ownership history.",
  },
  {
    icon: Network,
    title: "Blockchain Security",
    description:
      "Maintain tamper-resistant identity, access, and asset records on a distributed network.",
  },
];

const SECURITY_POINTS = [
  "Cryptographic identity verification",
  "Role-based access control",
  "Tamper-resistant audit history",
  "Blockchain-backed asset ownership",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                TrustMesh
              </h1>

              <p className="text-xs text-slate-500">
                Decentralized Trust Infrastructure
              </p>
            </div>
          </Link>

          <Link href="/login">
            <Button variant={Variant.Primary}>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">

        {/* Background decoration */}
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">

          {/* Hero Content */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Network className="h-4 w-4" />
              Decentralized Identity Platform
            </div>

            <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Secure Identity.
              <span className="block text-blue-600">
                Decentralized Trust.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              TrustMesh provides a decentralized platform for identity
              management, role-based access control, and secure digital
              asset ownership using blockchain technology.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link href="/login">
                <Button
                  variant={Variant.Primary}
                  className="px-6 py-3"
                >
                  Sign In to TrustMesh
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <a href="#features">
                <Button
                  variant={Variant.Outline}
                  className="border-slate-300 bg-white px-6 py-3 text-slate-700 hover:bg-slate-50"
                >
                  Explore Platform
                </Button>
              </a>

            </div>

          </div>

          {/* Security Visualization */}
          <div>

            <Card className="border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">

              <div className="mb-8 flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    TrustMesh Network
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-slate-900">
                    Secure Identity Layer
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Fingerprint className="h-6 w-6 text-blue-600" />
                </div>

              </div>

              <div className="space-y-4">

                {/* Wallet */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Wallet className="h-5 w-5 text-blue-600" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Wallet Identity
                      </p>

                      <p className="text-xs text-slate-500">
                        Cryptographically verified
                      </p>
                    </div>

                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                  </div>
                </div>

                {/* Access */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                      <KeyRound className="h-5 w-5 text-indigo-600" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Access Control
                      </p>

                      <p className="text-xs text-slate-500">
                        Role permissions verified
                      </p>
                    </div>

                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                  </div>
                </div>

                {/* Asset */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <Box className="h-5 w-5 text-purple-600" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Asset Ownership
                      </p>

                      <p className="text-xs text-slate-500">
                        Blockchain ownership verified
                      </p>
                    </div>

                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                  </div>
                </div>

              </div>

            </Card>

          </div>

        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-slate-200 bg-slate-50 py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Platform
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Built for trusted digital infrastructure
            </h2>

            <p className="mt-4 text-slate-600">
              A single platform for decentralized identity, secure access,
              and verifiable asset ownership.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>

                </Card>
              );
            })}

          </div>
        </div>

      </section>

      {/* Security */}
      <section className="border-t border-slate-200 bg-white py-24">

        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Security First
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Designed around trust and verification
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-600">
              TrustMesh reduces dependency on centralized identity and
              asset management by using cryptographic verification and
              blockchain technology.
            </p>

          </div>

          <div className="space-y-4">

            {SECURITY_POINTS.map((point) => (
              <div
                key={point}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
              >

                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

                <span className="text-sm text-slate-700">
                  {point}
                </span>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-slate-50 py-24">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
            Enter the TrustMesh Network
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Authenticate securely using your decentralized wallet identity
            and access your organization dashboard.
          </p>

          <div className="mt-8">

            <Link href="/login">
              <Button
                variant={Variant.Primary}
                className="px-8 py-3"
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 TrustMesh. Decentralized Trust Infrastructure.
          </p>

          <div className="flex gap-6">
            <span>Identity</span>
            <span>RBAC</span>
            <span>Blockchain</span>
            <span>NFT Assets</span>
          </div>

        </div>

      </footer>

    </main>
  );
}