"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import { SITE_NAME } from "@/lib/config";

/**
 * Realistic login / OTP demo modal. No real auth is wired up.
 */
export function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"credential" | "otp">("credential");
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  if (!open) return null;

  const submitCredential = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setStep("otp");
  };

  const submitOtp = (e: FormEvent) => {
    e.preventDefault();
    setStep("credential");
    setValue("");
    setOtp("");
    setName("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Login or sign up"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[850px] overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="grid md:grid-cols-[40%_60%]">
          {/* Left panel */}
          <div className="hidden bg-[#2874f0] p-7 text-white md:block">
            <h2 className="text-2xl font-semibold leading-snug">
              Login to {SITE_NAME}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              Get access to your Orders, Wishlist and Recommendations.
            </p>
            <p className="mt-8 text-xs leading-relaxed text-white/60">
              Your personal details are safe with us. Demo login only.
            </p>
          </div>

          {/* Right panel */}
          <div className="relative p-6 sm:p-8">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close login dialog"
              className="absolute right-3 top-3 grid size-9 place-items-center rounded-full text-[#878787] transition-colors hover:bg-[#f1f3f6] hover:text-[#212121]"
            >
              <X className="size-5" />
            </button>

            {step === "credential" ? (
              <form onSubmit={submitCredential}>
                <label htmlFor="login-value" className="sr-only">
                  Email or mobile number
                </label>
                <input
                  id="login-value"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter email or mobile number"
                  className="h-11 w-full border-b-2 border-[#2874f0] text-sm outline-none placeholder:text-[#878787]"
                />
                <p className="mt-4 text-xs leading-relaxed text-[#878787]">
                  By continuing, you agree to {SITE_NAME}&apos;s Terms of Use
                  and Privacy Policy.
                </p>
                <button
                  type="submit"
                  disabled={!value.trim()}
                  className="mt-6 w-full rounded-sm bg-[#fb641b] py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValue("");
                    setName("Guest Shopper");
                    setStep("otp");
                  }}
                  className="mt-3 w-full rounded-sm border border-[#2874f0] py-3 text-sm font-bold uppercase tracking-wide text-[#2874f0] transition-colors hover:bg-[#2874f0]/5"
                >
                  Continue as Guest
                </button>
              </form>
            ) : (
              <form onSubmit={submitOtp}>
                <button
                  type="button"
                  onClick={() => setStep("credential")}
                  className="mb-4 flex items-center gap-1.5 text-sm font-medium text-[#2874f0]"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Change
                </button>
                <p className="text-sm font-semibold text-[#212121]">
                  OTP sent to{" "}
                  <span className="text-[#2874f0]">
                    {name ? `${name} (guest)` : value || "your number"}
                  </span>
                </p>
                <label htmlFor="login-otp" className="sr-only">
                  One time password
                </label>
                <input
                  id="login-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit OTP"
                  className="mt-5 h-11 w-full rounded-sm border border-[#e0e0e0] px-3 text-sm tracking-[0.5em] outline-none focus:border-[#2874f0]"
                />
                <button
                  type="submit"
                  disabled={otp.length < 6}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm bg-[#fb641b] py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Verify OTP
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
                <p className="mt-3 text-center text-xs text-[#878787]">
                  Did not receive the OTP?{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#2874f0]"
                    onClick={() => setOtp("123456")}
                  >
                    Resend (demo)
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}