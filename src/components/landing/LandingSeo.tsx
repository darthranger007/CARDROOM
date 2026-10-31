import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../../config/site";

const faqs = [
  {
    q: "Is Cardroom a free business card maker?",
    a: "Yes. You can design a business card, customize layout and typography, and export a PDF or PNG at no cost — no account or subscription required.",
  },
  {
    q: "Can I download a print-ready business card PDF?",
    a: "Yes. Cardroom exports standard 3.5″ × 2″ cards as PDF or PNG, suitable for printing or sharing digitally.",
  },
  {
    q: "Do I need design software?",
    a: "No. Everything runs in your browser: pick a theme, enter your details, upload a logo, and export.",
  },
];

export function LandingSeo() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebApplication",
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "DesignApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        className="border-t border-white/[0.06] px-8 py-16 lg:px-12 lg:py-20"
        aria-labelledby="cardroom-faq"
      >
        <div className="mx-auto max-w-[720px]">
          <h2
            id="cardroom-faq"
            className="font-card-serif text-[clamp(1.5rem,3vw,2rem)] font-normal tracking-[-0.01em] text-fg"
          >
            Free business card maker — questions
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Cardroom helps freelancers and professionals build a clean business card online,
            with custom fonts, logos, and instant PDF export.
          </p>
          <dl className="mt-10 space-y-8">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <dt className="text-[15px] font-semibold text-fg">{q}</dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-fg-muted">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
