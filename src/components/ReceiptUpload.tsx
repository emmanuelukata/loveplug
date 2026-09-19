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

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mt-6 pt-6" style={{ borderTop: "1px solid #3d1e2c" }}>
      <p className="text-sm font-medium" style={{ color: "#f8eef3" }}>
        Upload Payment Receipt
      </p>
      <p className="mt-1 text-sm" style={{ color: "#8c7180" }}>
        After making the bank transfer, upload your payment receipt here.
      </p>

      <div className="mt-4">
        <label
          htmlFor="receipt"
          className="block cursor-pointer px-4 py-6 text-center transition-colors"
          style={{ border: "2px dashed #3d1e2c" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#f8eef3")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#3d1e2c")}
        >
          <span className="text-sm" style={{ color: "#8c7180" }}>
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
          className="mt-3 text-sm"
          style={{
            color:
              status === "success"
                ? "#22c55e"
                : status === "error"
                  ? "#ef4444"
                  : "#8c7180",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
