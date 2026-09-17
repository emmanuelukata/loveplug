"use client";

import { useState, useRef } from "react";
import { uploadReceipt } from "@/app/actions/receipt";

export default function ReceiptUpload({ reference }: { reference: string }) {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("receipt", file);

    const result = await uploadReceipt(reference, formData);

    if (result.success) {
      setStatus("success");
      setMessage("Receipt uploaded successfully. We'll verify your payment shortly.");
    } else {
      setStatus("error");
      setMessage(result.error || "Upload failed. Please try again.");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mt-6 border-t border-border pt-6">
      <p className="text-sm font-medium text-foreground">
        Upload Payment Receipt
      </p>
      <p className="mt-1 text-sm text-muted">
        After making the bank transfer, upload your payment receipt here.
      </p>

      <div className="mt-4">
        <label
          htmlFor="receipt"
          className="block cursor-pointer border border-dashed border-border px-4 py-6 text-center transition-colors hover:border-foreground"
        >
          <span className="text-sm text-muted">
            {status === "uploading"
              ? "Uploading..."
              : "Click to select receipt (JPG, PNG, or PDF, max 5MB)"}
          </span>
          <input
            ref={fileInputRef}
            id="receipt"
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.pdf"
            onChange={handleUpload}
            className="hidden"
            disabled={status === "uploading"}
          />
        </label>
      </div>

      {message && (
        <p
          className={`mt-3 text-sm ${
            status === "success"
              ? "text-green-600"
              : status === "error"
                ? "text-red-500"
                : "text-muted"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
