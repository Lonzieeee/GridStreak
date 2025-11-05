import { useEffect } from "react";

export default function SEO({ title, description, canonical, jsonLd = [], meta = [] }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement('meta');
        descTag.setAttribute('name', 'description');
        document.head.appendChild(descTag);
      }
      descTag.setAttribute('content', description);
    }

    if (canonical) {
      let linkTag = document.querySelector('link[rel="canonical"]');
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'canonical');
        document.head.appendChild(linkTag);
      }
      linkTag.setAttribute('href', canonical);
    }

   
    document.querySelectorAll('script[type="application/ld+json"][data-seo="true"]').forEach((el) => el.remove());

    jsonLd.forEach((obj) => {
      try {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.seo = 'true';
        script.text = JSON.stringify(obj);
        document.head.appendChild(script);
      } catch {
      
      }
    });

    // console.log('seo props: ',meta)

  
    meta.forEach(({ name, content, property }) => {
      if (!name && !property) return;
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let tag = document.querySelector(selector);
      // console.log('tags:',name,content,property);
      if (!tag) {
        
        tag = document.createElement('meta');
        if (name) tag.setAttribute('name', name);
        if (property) tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content || '');
    });
  }, [title, description, canonical, JSON.stringify(jsonLd), JSON.stringify(meta)]);

  return null;
}



