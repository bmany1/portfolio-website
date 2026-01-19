import type { Metadata } from "next";
import { getSiteSettings, getContactPageSettings } from "@/sanity/queries";
import ContactForm from "@/components/ContactForm";
import { getOgImageUrl } from "@/lib/sanity-image";

export async function generateMetadata(): Promise<Metadata> {
  const [pageSettings, siteSettings] = await Promise.all([
    getContactPageSettings(),
    getSiteSettings(),
  ]);

  const title = "Contact";
  const description =
    pageSettings?.description ||
    "Get in touch with Bryan Many. I'm always open to discussing new opportunities and collaborations.";

  // Contact page uses default OG image only
  const ogImageUrl = siteSettings?.ogImage?.asset
    ? getOgImageUrl(siteSettings.ogImage)
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Bryan Many`,
      description,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: "Contact Bryan Many",
          },
        ],
      }),
    },
    twitter: {
      title: `${title} | Bryan Many`,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  };
}

export default async function ContactPage() {
  const [siteSettings, pageSettings] = await Promise.all([
    getSiteSettings(),
    getContactPageSettings(),
  ]);

  return (
    <div className="min-h-screen pt-20 pb-32 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {pageSettings?.eyebrow && (
            <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">
              {pageSettings.eyebrow}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {pageSettings?.heading || "Get in Touch"}
          </h1>
          {pageSettings?.description && (
            <p className="text-white/60 text-lg">
              {pageSettings.description}
            </p>
          )}
        </div>

        {/* Form */}
        <ContactForm
          formspreeId={pageSettings?.formspreeId}
          email={siteSettings?.email}
        />
      </div>
    </div>
  );
}
