"use client";

export default function Footer() {
  const socials = [
    { label: "LinkedIn", href: "https://linkedin.com/in/arjun-s-nair" },
    { label: "GitHub", href: "https://github.com/Arjun-SN04" },
    { label: "Email", href: "mailto:2004arjunsnair@gmail.com" },
  ];

  return (
    <footer className="w-full border-t border-border-subtle bg-surface-dim relative z-20">
      <div className="mx-auto max-w-360 px-margin-page py-8 font-mono text-[10px] tracking-wider text-text-muted">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="uppercase font-bold text-accent-white hover:text-accent-hover transition-colors"
            >
              ARJUN S NAIR
            </a>
            <span className="hidden md:inline text-border-accent">·</span>
            <span className="uppercase text-text-muted/60">Full-Stack AI Integration Developer</span>
          </div>

          <div className="flex gap-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-white transition-colors duration-300 uppercase"
              >
                {social.label}
              </a>
            ))}
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-border-subtle/40 text-text-muted/40">
          <span>© 2026 Arjun S Nair</span>
        </div>
      </div>
    </footer>
  );
}
