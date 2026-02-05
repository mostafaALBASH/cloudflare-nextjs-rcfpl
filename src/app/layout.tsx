import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Return Consistency in FPL – Reliable Fantasy Premier League Players | RCFPL",
  description: "Explore Return Consistency in Fantasy Premier League (FPL). Identify reliable players based on 5+ point returns, not just explosive hauls.",
  keywords: [
    "FPL",
    "Fantasy Premier League",
    "Return Consistency",
    "FPL players",
    "FPL statistics",
    "FPL analysis",
    "consistent FPL players",
    "FPL points",
    "FPL returns",
    "Fantasy Football",
    "Premier League fantasy"
  ],
  authors: [{ name: "Mostafa Elbesh", url: "https://github.com/mostafaALBASH" }],
  creator: "Mostafa Elbesh",
  publisher: "Mostafa Elbesh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: "https://www.rcfpl.net/",
  },
  openGraph: {
    type: "website",
    url: "https://www.rcfpl.net/",
    title: "Return Consistency in FPL – Reliable Fantasy Premier League Players",
    description: "Explore Return Consistency in Fantasy Premier League (FPL). Identify reliable players based on 5+ point returns, not just explosive hauls. Free FPL analysis tool.",
    siteName: "RCFPL",
    locale: "en_US",
    images: [
      {
        url: "https://www.rcfpl.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "RCFPL - Return Consistency for Fantasy Premier League",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Return Consistency in FPL – Reliable Fantasy Premier League Players",
    description: "Explore Return Consistency in Fantasy Premier League (FPL). Identify reliable players based on 5+ point returns, not just explosive hauls.",
    creator: "@mostafaALBASH",
    images: ["https://www.rcfpl.net/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%2338bdf8'/><path d='M20 30 L50 15 L80 30 L80 55 L50 70 L20 55 Z' fill='%231e293b' stroke='%2338bdf8' stroke-width='3'/><circle cx='35' cy='38' r='4' fill='%2310b981'/><circle cx='50' cy='32' r='4' fill='%2310b981'/><circle cx='65' cy='38' r='4' fill='%2310b981'/><circle cx='43' cy='48' r='4' fill='%2310b981'/><circle cx='57' cy='48' r='4' fill='%2310b981'/><text x='50' y='88' font-family='Arial,sans-serif' font-size='20' font-weight='bold' fill='%231e293b' text-anchor='middle'>RC</text></svg>",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect width='180' height='180' rx='36' fill='%2338bdf8'/><path d='M36 54 L90 27 L144 54 L144 99 L90 126 L36 99 Z' fill='%231e293b' stroke='%2338bdf8' stroke-width='5'/><circle cx='63' cy='68' r='7' fill='%2310b981'/><circle cx='90' cy='58' r='7' fill='%2310b981'/><circle cx='117' cy='68' r='7' fill='%2310b981'/><circle cx='77' cy='86' r='7' fill='%2310b981'/><circle cx='103' cy='86' r='7' fill='%2310b981'/><text x='90' y='155' font-family='Arial,sans-serif' font-size='36' font-weight='bold' fill='%231e293b' text-anchor='middle'>RC</text></svg>",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RCFPL",
  },
  other: {
    "date": "2025-08-01",
    "last-modified": "2026-01-31",
    "msapplication-TileColor": "#38bdf8",
  },
  themeColor: "#38bdf8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns# schema: https://schema.org/" vocab="https://schema.org/">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PJ7SPRMW');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* JSON-LD Structured Data */}
        <Script
          id="structured-data-webapp"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "@id": "https://www.rcfpl.net/#webapp",
              "url": "https://www.rcfpl.net/",
              "name": "RCFPL - Return Consistency for Fantasy Premier League",
              "alternateName": "Return Consistency FPL",
              "description": "Explore Return Consistency in Fantasy Premier League (FPL). Identify reliable players based on 5+ point returns, not just explosive hauls. Free FPL analysis tool with player statistics, consistency scores, and filtering options.",
              "applicationCategory": "SportsApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "FPL Player Return Consistency Analysis",
                "5+ Point Return Tracking",
                "Consistency Score Calculation",
                "Player Filtering by Team and Position",
                "Return Rate Statistics",
                "Blank Rate Analysis",
                "Haul Tracking (10+ points)",
                "CSV Export Functionality",
                "Mobile-Friendly Interface"
              ],
              "author": {
                "@type": "Person",
                "name": "Mostafa Elbesh",
                "email": "mosteloy@gmail.com",
                "url": "https://github.com/mostafaALBASH"
              },
              "creator": {
                "@type": "Person",
                "name": "Mostafa Elbesh"
              },
              "inLanguage": "en-US",
              "isAccessibleForFree": true,
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "datePublished": "2025-08-01",
              "dateModified": "2026-01-31",
              "softwareVersion": "1.0.0",
              "releaseNotes": "Production release with FPL return consistency analysis",
              "screenshot": "https://www.rcfpl.net/og-image.png",
              "permissions": "No special permissions required",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "1",
                "bestRating": "5",
                "worstRating": "1"
              },
              "softwareHelp": {
                "@type": "CreativeWork",
                "url": "https://www.rcfpl.net/#definition"
              }
            })
          }}
        />

        <Script
          id="structured-data-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": "https://www.rcfpl.net/#faq",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is Return Consistency in FPL?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Return Consistency in Fantasy Premier League (FPL) measures how reliably a player delivers FPL points across matches. A return is defined as any gameweek where a player scores 5+ FPL points. This metric focuses on frequency of returns, not just total points or rare explosive hauls."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is the Consistency Score calculated?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Consistency Score (0-100) is a percentile-based composite with three weighted components: 55% Return Rate (percentage of appearances with 5+ points using plus-four smoothing), 25% Low Volatility (inverse of points standard deviation for predictable scoring), and 20% Low Blanks (inverse of blank rate for reliable floor). Players with fewer than 6 appearances are excluded and assigned a score of 0."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is considered a return in FPL?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In RCFPL, a return is defined as any match where a player scores 5+ FPL points, representing a meaningful fantasy contribution beyond just appearance points."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is a blank in FPL?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A blank is a match where a player scores 0-2 points, meaning they failed to return more than appearance points. This follows the Premier League glossary definition of 'blanked'."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is a haul in FPL?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A haul is a match where a player scores 10+ points, representing double-digit games useful for measuring upside potential."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can RCFPL predict future FPL player performance?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. RCFPL analyzes past performance only and does not predict future returns. It uses official FPL match history data to help identify historically consistent players."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is RCFPL free to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, RCFPL is completely free to use. No registration, subscription, or payment is required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which FPL players are most consistent?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Players with high Consistency Scores (70+) tend to deliver 5+ points regularly. Sort by 'Consistency Score' to find the most reliable fantasy assets based on historical data."
                  }
                }
              ]
            })
          }}
        />

        <Script
          id="structured-data-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.rcfpl.net/#organization",
              "name": "RCFPL",
              "url": "https://www.rcfpl.net/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.rcfpl.net/logo.png",
                "width": 180,
                "height": 180
              },
              "sameAs": [
                "https://github.com/mostafaALBASH"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "mosteloy@gmail.com",
                "contactType": "Developer",
                "availableLanguage": "English"
              }
            })
          }}
        />

        <Script
          id="structured-data-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.rcfpl.net/#website",
              "url": "https://www.rcfpl.net/",
              "name": "RCFPL - Return Consistency for Fantasy Premier League",
              "description": "Explore Return Consistency in Fantasy Premier League (FPL). Identify reliable players based on 5+ point returns, not just explosive hauls.",
              "publisher": {
                "@id": "https://www.rcfpl.net/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.rcfpl.net/?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "inLanguage": "en-US"
            })
          }}
        />

        <Script
          id="structured-data-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.rcfpl.net/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Return Consistency Analysis",
                  "item": "https://www.rcfpl.net/#definition"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Methodology",
                  "item": "https://www.rcfpl.net/#methodology"
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJ7SPRMW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}

