import Script from "next/script";

/**
 * Back Nine sign-up and payment: the GoHighLevel form, embedded as is.
 *
 * Card details go to GHL's Stripe element inside this iframe and never touch
 * this site. Plans, prices and subscriptions are edited in GHL; the plan cards
 * on /back-9-partner are display copy only, so change both together.
 *
 * form_embed.js sizes the iframe to its content, so the min-height is only
 * the placeholder before it loads.
 */
const FORM_ID = "eJzSUnqgeHqXVhiOKP4S";
const FORM_ORIGIN = "https://api.arrowleafmarketing.com";

export function BackNineSignup() {
  return (
    <div data-reveal className="overflow-hidden rounded-brand-lg border border-hairline bg-white p-2 sm:p-4">
      <iframe
        src={`${FORM_ORIGIN}/widget/form/${FORM_ID}`}
        id={`inline-${FORM_ID}`}
        title="Back Nine partner sign-up"
        // Lets the nested Stripe element offer Apple Pay and Google Pay.
        allow="payment"
        className="block min-h-[1100px] w-full border-0"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Back Nine Partner Sign-up"
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
