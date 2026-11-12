import { useEffect } from "react";

export default function usePageMeta(title: string, description: string, canonicalPath: string) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}${canonicalPath}`);

    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:type", "website");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    return () => {
      document.title = "LSL Logistics Network";
      setMeta("description", "");
    };
  }, [title, description, canonicalPath]);
}