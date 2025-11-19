import { getSiteSettings, getContactPageSettings } from "@/sanity/queries";
import ContactForm from "@/components/ContactForm";

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
