import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = `Loveplug <notifications@resend.dev>`;

export async function sendOrderConfirmation(to: string, reference: string, fullName: string, subtotal: number) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Order Confirmed — ${reference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a;">Order Confirmed</h2>
          <p>Hi ${fullName},</p>
          <p>Your order <strong>${reference}</strong> has been received.</p>
          <p style="font-size: 24px; font-weight: bold; color: #1a1a1a;">Total: ₦${subtotal.toLocaleString()}</p>
          <p>Please make a bank transfer to complete your order. You can check your order status anytime at:</p>
          <p><a href="https://loveplug.vercel.app/order/lookup" style="color: #2563eb;">Track Your Order</a></p>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">Loveplug — Quality lifestyle and wellness essentials</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send order confirmation:", error);
  }
}

export async function sendPaymentSubmitted(to: string, reference: string, fullName: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Payment Received — ${reference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a;">Payment Received</h2>
          <p>Hi ${fullName},</p>
          <p>We've received your payment notification for order <strong>${reference}</strong>.</p>
          <p>Our team is verifying your payment now. This usually takes within 24 hours.</p>
          <p>You'll receive another email once your payment is confirmed.</p>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">Loveplug — Quality lifestyle and wellness essentials</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send payment submitted email:", error);
  }
}

export async function sendPaymentConfirmed(to: string, reference: string, fullName: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Payment Confirmed — ${reference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #16a34a;">Payment Confirmed</h2>
          <p>Hi ${fullName},</p>
          <p>Your payment for order <strong>${reference}</strong> has been confirmed.</p>
          <p>We're now processing your order. You'll receive a shipping notification soon.</p>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">Loveplug — Quality lifestyle and wellness essentials</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send payment confirmed email:", error);
  }
}

export async function sendOrderShipped(to: string, reference: string, fullName: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Order Shipped — ${reference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Order Shipped</h2>
          <p>Hi ${fullName},</p>
          <p>Your order <strong>${reference}</strong> has been shipped and is on its way to you.</p>
          <p>You'll receive it within 2-5 business days depending on your location.</p>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">Loveplug — Quality lifestyle and wellness essentials</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send order shipped email:", error);
  }
}
