import { socialLinks } from "@/config/site";

export default function Head() {
  return (
    <>
      {/* ✅ CRITICAL: Preload LCP image for faster load */}
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/dzpa07b4h/image/upload/v1763888924/dzaky_acxfnm.jpg"
        fetchPriority="high"
      />
      {socialLinks.map((s) => (
        <link key={s.href} rel="me" href={s.href} />
      ))}
    </>
  );
}

