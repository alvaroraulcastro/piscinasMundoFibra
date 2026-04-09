const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://piscinasmundofibra.cl";
const WHATSAPP_URL = "https://wa.me/56954088120";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Piscinas Mundo Fibra",
  alternateName: "PiscinasMundoFibra",
  description:
    "Empresa especializada en piscinas de fibra de vidrio con tecnología multicapa. Alta durabilidad, fácil mantenimiento, instalación rápida y 6 colores disponibles.",
  url: SITE_URL,
  telephone: "+56954088120",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+56954088120",
      contactType: "sales",
      areaServed: "CL",
      availableLanguage: "Spanish",
      contactOption: "TollFree",
    },
    {
      "@type": "ContactPoint",
      url: WHATSAPP_URL,
      contactType: "customer support",
      areaServed: "CL",
      availableLanguage: "Spanish",
    },
  ],
  sameAs: [
    "https://www.instagram.com/piscinasmundofibra",
    WHATSAPP_URL,
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
    addressRegion: "Chile",
  },
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  priceRange: "$$",
  currenciesAccepted: "CLP",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Piscinas de Fibra de Vidrio",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Piscina de Fibra de Vidrio",
          description:
            "Piscina de fibra de vidrio con tecnología multicapa (Gelcoat + 3 capas Viniléster). Alta durabilidad, resistencia UV y fácil mantenimiento.",
          brand: {
            "@type": "Brand",
            name: "Piscinas Mundo Fibra",
          },
          color: ["Celeste", "Azul Tahití", "Verde Turquesa", "Blanco", "Gris Oscuro", "Gris Claro"],
          material: "Fibra de Vidrio",
          countryOfOrigin: "CL",
        },
        areaServed: { "@type": "Country", name: "Chile" },
        availability: "https://schema.org/InStock",
      },
    ],
  },
  image: `${SITE_URL}/og-image.png`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og-image.png`,
    width: 512,
    height: 512,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuáles son las ventajas de una piscina de fibra de vidrio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Las piscinas de fibra de vidrio ofrecen alta durabilidad y resistencia, fácil mantenimiento, son climáticamente resistentes, tienen instalación rápida, protección contra rayos UV, fácil eliminación de hongos y algas, y están disponibles en múltiples diseños y colores.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué colores de piscinas están disponibles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Disponemos de 6 colores: Celeste, Azul Tahití, Verde Turquesa, Blanco, Gris Oscuro y Gris Claro. Cada color mantiene su tonalidad gracias al recubrimiento Gelcoat exterior.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es la tecnología multicapa en fibra de vidrio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestra tecnología multicapa consiste en 4 capas: Gelcoat (capa exterior resistente a UV), y tres capas de Viniléster corrosivo-resistente (una estructural y dos de sellado), garantizando una piscina duradera sin ósmosis y con alta resistencia química.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo puedo cotizar una piscina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puedes cotizar tu piscina directamente en nuestra web completando el formulario de cotización con las dimensiones (largo, ancho, profundidad), color deseado y accesorios. Se genera una orden de compra al instante que puedes enviar por WhatsApp al +56 9 5408 8120.",
      },
    },
    {
      "@type": "Question",
      name: "¿Ofrecen bomba de calefacción para piscinas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, ofrecemos bomba de calefacción Aquark como accesorio opcional. La bomba de calor permite disfrutar la piscina durante todo el año, incluso en temporadas frías.",
      },
    },
    {
      "@type": "Question",
      name: "¿En qué regiones de Chile instalan piscinas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prestamos servicios en todo Chile. Nuestras piscinas de fibra de vidrio están diseñadas para adaptarse a todos los climas, desde el norte árido hasta el frío del sur.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ventajas",
      item: `${SITE_URL}/#ventajas`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Cotizador",
      item: `${SITE_URL}/#cotizador`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contacto",
      item: `${SITE_URL}/#contacto`,
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Piscinas Mundo Fibra",
  description: "Piscinas de fibra de vidrio en Chile — cotizador online",
  inLanguage: "es-CL",
  publisher: {
    "@id": `${SITE_URL}/#business`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
