/**
 * ALL COPY FOR THE SITE LIVES IN THIS FILE.
 *
 * Edit text here; no component needs to change. Anything shown as [Square brackets]
 * is a placeholder for information the firm has not yet supplied.
 *
 * Bar Council of India (Rule 36): keep this an informational site. Do not add testimonials,
 * client names, results, awards, fees, comparisons or superlatives.
 */

export type PartnerSlug = "monika-bhandari" | "mayank-pal";

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Partner {
  slug: PartnerSlug;
  name: string;
  shortName: string;
  initials: string;
  title: string;
  designation: string;
  qualifications: string;
  enrolmentNo: string;
  barCouncil: string;
  experience: string;
  practisingSince: string;
  /** Set to a real photograph when supplied; until then the initials placeholder is shown. */
  photo?: Photo;
  profile: string;
  coreAreas: string[];
}

export interface PracticeArea {
  num: string;
  slug: string;
  title: string;
  shortTitle: string;
  intro: string;
  services: string[];
  /** Partner slugs, or "firm" when the brief names the firm as lead. */
  leads: (PartnerSlug | "firm")[];
  related: string[];
  seoTitle: string;
}

const practiceAreas: PracticeArea[] = [
  {
    num: "01",
    slug: "property-real-estate",
    title: "Property & Real Estate Laws",
    shortTitle: "Property & Real Estate",
    intro: "Title verification, transaction documentation and RERA compliance for buyers, sellers, developers and lenders.",
    services: [
      "Legal due diligence, property title verification and preparation of Title Search Reports (TSR)",
      "Examination and verification of property ownership, title and revenue records",
      "Drafting and vetting of sale deeds, lease deeds, gift deeds, mortgage deeds and other property documents",
      "RERA project and agent registration, renewal, extension and related approvals",
      "RERA advisory, statutory compliance, periodic filings and project updates",
      "Drafting of applications, replies and legal representation before RERA authorities and appellate tribunals",
      "Property transaction documentation, registration-related assistance and legal opinions on property title and ownership",
    ],
    leads: ["mayank-pal"],
    related: ["land-revenue", "banking-finance", "registrations"],
    seoTitle: "Property title verification and RERA registration, Uttarakhand",
  },
  {
    num: "02",
    slug: "land-revenue",
    title: "Land & Revenue Laws",
    shortTitle: "Land & Revenue",
    intro: "Advice and documentation on revenue records, land use and ownership of agricultural and non-agricultural land.",
    services: [
      "Advisory on land and revenue laws",
      "Examination and verification of land revenue records",
      "Mutation, partition and demarcation-related legal assistance",
      "Land use conversion and Change of Land Use (CLU) matters",
      "Agricultural and non-agricultural land matters",
      "Land ownership, tenancy and revenue-related documentation",
    ],
    leads: ["mayank-pal"],
    related: ["property-real-estate", "registrations"],
    seoTitle: "Land and revenue law, Roorkee and Haridwar",
  },
  {
    num: "03",
    slug: "banking-finance",
    title: "Banking & Finance Laws",
    shortTitle: "Banking & Finance",
    intro: "Title investigation, security documentation and legal opinions for banks, financial institutions and borrowers.",
    services: [
      "Preparation and vetting of loan and security documents",
      "Legal due diligence for banks and financial institutions",
      "Property title investigation and search reports for loan transactions",
      "Drafting and vetting of mortgage deeds, guarantees and security agreements",
      "Legal opinions on property-based lending and security creation",
      "CIBIL and credit information-related legal advisory",
      "Banking and financial documentation compliance",
    ],
    leads: ["mayank-pal", "monika-bhandari"],
    related: ["property-real-estate", "contracts-documentation"],
    seoTitle: "Banking and finance documentation, Roorkee",
  },
  {
    num: "04",
    slug: "corporate-commercial",
    title: "Corporate & Commercial Laws",
    shortTitle: "Corporate & Commercial",
    intro: "Incorporation, constitutional documents, governance and commercial contracts for businesses at every stage.",
    services: [
      "Company incorporation and corporate registration",
      "Registration of partnership firms, LLPs, societies, trusts and AOPs",
      "Drafting of partnership deeds, trust deeds, memoranda, articles of association and other constitutional documents",
      "Corporate governance and regulatory advisory",
      "Corporate and commercial legal due diligence",
      "Drafting and vetting of commercial contracts and agreements",
      "Employment and business-related legal documentation",
      "Corporate restructuring and business compliance advisory",
    ],
    leads: ["monika-bhandari"],
    related: ["regulatory-compliance", "contracts-documentation", "registrations"],
    seoTitle: "Company incorporation and corporate law, Roorkee",
  },
  {
    num: "05",
    slug: "regulatory-compliance",
    title: "Statutory & Regulatory Compliance",
    shortTitle: "Statutory & Regulatory Compliance",
    intro: "The registrations, licences, approvals and periodic filings a business needs to establish and operate lawfully.",
    services: [
      "Statutory and regulatory compliance advisory",
      "Annual and periodic corporate compliances",
      "Statutory filings and documentation",
      "Business establishment registrations and regulatory approvals",
      "Industrial and commercial licences, permissions and approvals",
      "Single window clearance and investment facilitation-related assistance",
      "Compliance documentation and regulatory due diligence",
    ],
    leads: ["monika-bhandari"],
    related: ["corporate-commercial", "registrations", "gst"],
    seoTitle: "Statutory and regulatory compliance, Uttarakhand",
  },
  {
    num: "06",
    slug: "gst",
    title: "Goods & Services Tax (GST)",
    shortTitle: "GST",
    intro: "Registration, returns, notices and appeals under GST for businesses and commercial establishments.",
    services: [
      "GST registration, amendment and cancellation",
      "GST return filing and statutory compliance",
      "GST notices, replies and representation",
      "GST assessment and appeal-related legal assistance",
      "GST advisory and compliance documentation",
      "Examination of GST-related transactions and records",
      "GST registration and compliance for businesses and commercial establishments",
    ],
    leads: ["monika-bhandari", "mayank-pal"],
    related: ["income-tax", "regulatory-compliance"],
    seoTitle: "GST and income tax matters, Roorkee",
  },
  {
    num: "07",
    slug: "income-tax",
    title: "Income Tax Laws",
    shortTitle: "Income Tax",
    intro: "Returns, notices, assessments and appeals, with representation before competent authorities and appellate forums.",
    services: [
      "Income tax return filing and compliance-related assistance",
      "Income tax notices, replies and legal representation",
      "Income tax assessment and reassessment proceedings",
      "Income tax appeals and related documentation",
      "Taxation-related legal advisory and opinions",
      "Tax compliance and statutory documentation",
      "Assistance with income tax proceedings before competent authorities and appellate forums",
    ],
    leads: ["monika-bhandari", "mayank-pal"],
    related: ["gst", "regulatory-compliance"],
    seoTitle: "Income tax notices, assessments and appeals, Roorkee",
  },
  {
    num: "08",
    slug: "contracts-documentation",
    title: "Contracts & Legal Documentation",
    shortTitle: "Contracts & Legal Documentation",
    intro: "Drafting, review and vetting of the agreements and opinions that record a transaction.",
    services: [
      "Drafting and vetting of contracts and agreements",
      "Preparation of legal opinions and advisory notes",
      "Commercial and business agreements",
      "Employment agreements and service contracts",
      "Sale, purchase, lease and licensing agreements",
      "Memoranda of Understanding (MoUs)",
      "Legal documentation, review and transaction support",
    ],
    leads: ["monika-bhandari", "mayank-pal"],
    related: ["corporate-commercial", "property-real-estate", "banking-finance"],
    seoTitle: "Contract drafting and legal documentation, Roorkee",
  },
  {
    num: "09",
    slug: "intellectual-property",
    title: "Intellectual Property Rights",
    shortTitle: "Intellectual Property Rights",
    intro: "Trademark search, registration and protection, from filing to renewal.",
    services: [
      "Trademark search, registration and advisory",
      "Trademark objections, oppositions and related proceedings",
      "Trademark renewal and assignment-related documentation",
    ],
    leads: ["firm"],
    related: ["corporate-commercial", "contracts-documentation"],
    seoTitle: "Trademark search and registration, Uttarakhand",
  },
  {
    num: "10",
    slug: "registrations",
    title: "Registrations & Business Facilitation",
    shortTitle: "Registrations & Business Facilitation",
    intro: "Registration of instruments and entities, and the permissions a new enterprise needs.",
    services: [
      "Registration of sale deeds, lease deeds, gift deeds and other instruments",
      "Registration-related legal documentation before Sub-Registrar offices",
      "Incorporation and registration of business entities",
      "Single window clearance and regulatory approval assistance",
      "MSME/Udyam registration-related assistance",
      "Registration of trusts, societies, partnership firms and LLPs",
      "Documentation for business licences and statutory permissions",
    ],
    leads: ["monika-bhandari", "mayank-pal"],
    related: ["corporate-commercial", "property-real-estate", "regulatory-compliance"],
    seoTitle: "Registration of instruments and business entities, Roorkee",
  },
];

const partners: Partner[] = [
  {
    slug: "monika-bhandari",
    name: "Monika Bhandari",
    shortName: "Adv. Monika Bhandari",
    initials: "MB",
    title: "Partner",
    designation: "Advocate & Company Secretary",
    qualifications: "LL.B., Company Secretary (CS)",
    enrolmentNo: "UK/563/2021",
    barCouncil: "Bar Council of Uttarakhand",
    experience: "10 years",
    practisingSince: "2021 as advocate; Company Secretary since 2016",
    profile:
      "Monika Bhandari began her career as a Company Secretary in 2016, working on corporate governance, statutory filings, business registrations and regulatory compliance, before extending her practice to advocacy in 2021. Her work covers corporate and commercial law, GST, income tax, company incorporation, registration of business entities, statutory and regulatory compliance, and banking and finance documentation. She drafts and vets contracts and agreements, examines loan and security documents, prepares legal opinions and advises on compliance. She also handles the incorporation and registration of companies, partnership firms, societies, trusts and AOPs, together with statutory approvals, business establishment registrations and single-window clearance procedures. As the firm's founding partner, she oversees its professional management and supervises corporate documentation, compliance and advisory assignments. Her work is marked by precise documentation, close reading of regulatory requirements, confidentiality and professional diligence.",
    coreAreas: [
      "Corporate and Commercial Laws",
      "Goods and Services Tax (GST) and Income Tax Matters",
      "Corporate Governance and Statutory Compliance",
      "Incorporation and Registration of Companies",
      "Registration of Partnership Firms, Societies, Trusts and AOPs",
      "Business Registrations, Statutory Approvals and Single Window Clearance",
      "Banking and Finance Documentation",
      "Drafting and Vetting of Contracts and Agreements",
      "Legal Due Diligence and Regulatory Compliance Advisory",
    ],
  },
  {
    slug: "mayank-pal",
    name: "Mayank Pal",
    shortName: "Adv. Mayank Pal",
    initials: "MP",
    title: "Partner",
    designation: "Advocate",
    qualifications: "LL.B.",
    enrolmentNo: "UK/566/2021",
    barCouncil: "Bar Council of Uttarakhand",
    experience: "5 years",
    practisingSince: "[Confirm year]",
    profile:
      "Mayank Pal's practice centres on real estate and property, land and revenue, legal due diligence, property title verification, contract drafting and vetting, and banking and finance documentation. He examines property ownership documents, land and revenue records and title documentation, and advises on the legal aspects of property transactions. He also prepares and examines loan, mortgage and security documents, undertakes legal research and case law analysis, drafts legal opinions, and supports GST and income tax documentation and compliance. He acts for individuals, businesses, real estate developers and financial institutions on documentation and due diligence assignments. As a partner, he contributes to the firm's management, documentation, research and due diligence work, with an emphasis on detailed examination of records, timely execution, confidentiality and compliance with the law.",
    coreAreas: [
      "Real Estate and Property Laws",
      "Land and Revenue Laws",
      "Property Title Verification and Legal Due Diligence",
      "Drafting and Vetting of Contracts and Agreements",
      "Banking and Finance Documentation",
      "Loan, Mortgage and Security Documentation",
      "Income Tax and GST-Related Documentation and Compliance",
      "Legal Research and Case Law Analysis",
      "Preparation of Legal Opinions and Property-Related Documentation",
    ],
  },
];

export const site = {
  name: "The Law & Lawyers",
  legalName: "The Law & Lawyers (Advocates and Solicitors)",
  descriptor: "Advocates & Solicitors",
  established: "2021",
  registrationNo: "UKFIRM06B06/24010088",
  constitution: "Registered Partnership Firm",
  copyrightYear: "2026",

  contact: {
    addressLines: ["House No. 1380, Ganga Enclave", "Roorkee, District Haridwar", "Uttarakhand – 247667"],
    addressOneLine: "House No. 1380, Ganga Enclave, Roorkee, District Haridwar, Uttarakhand – 247667",
    mapQuery: "House No. 1380, Ganga Enclave, Roorkee, Haridwar, Uttarakhand 247667",
    phoneDisplay: "+91 73029 83391",
    phoneHref: "tel:+917302983391",
    email: "advocate@lawandlawyers.in",
    officeHours: "[Confirm office hours]",
  },

  nav: [
    { href: "/firm", label: "The Firm" },
    { href: "/partners", label: "Partners" },
    { href: "/practice", label: "Practice" },
    { href: "/contact", label: "Contact" },
  ],

  legalLinks: [
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/privacy", label: "Privacy notice" },
    { href: "/terms", label: "Terms of use" },
  ],

  cta: {
    enquiry: "Send an enquiry",
    practice: "View practice areas",
    contactFirm: "Contact the firm",
    moreFirm: "More about the firm",
  },

  hero: {
    eyebrow: "ADVOCATES & SOLICITORS · ROORKEE, UTTARAKHAND · EST. 2021",
    headline: "Considered counsel for property, tax and enterprise.",
    /** Alternatives supplied by the firm; swap into `headline` if preferred. */
    headlineAlternatives: [
      "Title, tax and enterprise, examined with care.",
      "Precise legal work, from title to compliance.",
    ],
    subline:
      "A registered partnership of advocates in Roorkee, advising individuals, businesses, developers and financial institutions on property, taxation, corporate and regulatory matters since 2021.",
  },

  firm: {
    intro:
      "The Law & Lawyers (Advocates and Solicitors) is a registered partnership firm of advocates based in Roorkee, District Haridwar, Uttarakhand (Registration No. UKFIRM06B06/24010088). Since 2021 the firm has advised individuals, businesses, real estate developers, corporate entities and financial institutions, with a particular focus on legal advisory, due diligence, transaction documentation and regulatory compliance.",
    second:
      "The firm's work spans real estate and property, land and revenue, banking and finance, corporate and commercial law, GST, income tax, intellectual property and statutory compliance. It verifies title, conducts due diligence, drafts and vets the instruments behind a transaction, and registers companies, partnership firms, LLPs, societies, trusts and associations of persons, along with their constitutional documents. The firm also assists with single-window clearances, business registrations, licences and statutory approvals for industrial and commercial undertakings, and represents clients before competent authorities, tribunals and forums.",
    vision:
      "To be a trusted and respected legal practice that helps individuals, businesses and financial institutions make informed decisions, and to make legal services accessible, transparent and dependable, so clients understand their rights, obligations and the legal implications of their property, tax, business and regulatory matters.",
    mission:
      "To deliver accurate, practical legal solutions through careful advisory, meticulous due diligence, precise documentation and effective compliance. Every assignment is handled with diligence, confidentiality, integrity and accountability. That means clear legal opinions, early identification of risk, resolution of open issues, and a lawful, well-reasoned course of action. Through this work the firm aims to build lasting professional relationships founded on trust, transparency, ethical practice and consistent quality.",
    commitment:
      "Since its establishment, the firm has remained committed to delivering accurate, timely, effective and legally compliant services, upholding high standards of professional ethics, integrity, confidentiality, transparency and accountability. It operates strictly within the framework of applicable laws and professional regulations.",
    servicesList: [
      "Property title verification",
      "Legal due diligence",
      "Land and revenue matters",
      "Corporate and commercial documentation",
      "Incorporation and registration of companies",
      "Registration of partnership firms, societies, AOPs and trusts",
      "Constitutional documents, deeds and statutory records",
      "Single window clearance and business establishment registrations",
      "Statutory approvals, licences and permissions",
      "Regulatory compliances for business and industrial undertakings",
      "Loan, mortgage and security documents: preparation and vetting",
      "Legal drafting, advisory and representation before competent authorities, tribunals and forums",
    ],
    principles: [
      { name: "Accuracy", text: "every document and opinion is checked against the record and the law." },
      { name: "Confidentiality", text: "client information is held in strict confidence." },
      { name: "Integrity", text: "the firm works strictly within applicable law and professional regulations." },
      { name: "Transparency", text: "clients are told plainly what the position is and what it means." },
      { name: "Accountability", text: "every assignment is seen through to a clear conclusion." },
    ],
    particulars: [
      { label: "Name", value: "The Law & Lawyers (Advocates and Solicitors)" },
      { label: "Constitution", value: "Registered Partnership Firm" },
      { label: "Registration No.", value: "UKFIRM06B06/24010088" },
      { label: "Established", value: "2021" },
      { label: "Office", value: "Roorkee, District Haridwar, Uttarakhand" },
      { label: "Partners", value: "2" },
    ],
  },

  whomWeActFor: ["Individuals", "Businesses", "Real Estate Developers", "Corporate Entities", "Banks & Financial Institutions"],

  howWeWork: [
    { num: "01", title: "The brief", text: "We understand the matter, the documents available and any deadline." },
    { num: "02", title: "Examination", text: "We review records, title, filings and the applicable law in detail." },
    {
      num: "03",
      title: "Opinion & documentation",
      text: "We give a clear opinion, identify risks and prepare or vet the documents.",
    },
    {
      num: "04",
      title: "Filing & follow-through",
      text: "We handle registrations, filings and representation before the competent authority.",
    },
  ],

  partnersIntro:
    "The firm is led by two partners, Advocate Monika Bhandari and Advocate Mayank Pal, who oversee its advisory, documentation, due diligence and compliance work. Their practice together covers corporate and commercial matters, taxation, real estate and property, land and revenue, banking and finance documentation, and statutory compliance. Matters are handled collaboratively, combining practical experience with careful legal research.",

  practiceIntro:
    "Legal advisory, documentation, due diligence and regulatory compliance across ten areas of law, for individuals, businesses, real estate developers, corporate entities and financial institutions.",

  contactIntro:
    "Tell us briefly about the matter, the assistance you need and any deadline that applies. If you have documents for review, list what is available. Please do not upload them here; we will confirm how to share them securely.",

  enquiryBand: {
    heading: "Tell us about the matter.",
    text: "Describe it briefly, the kind of assistance you need and any relevant deadline. If you have documents, tell us what is available and we will confirm how to share them securely.",
  },

  form: {
    note: "Submitting this form does not create an advocate–client relationship. Please do not send confidential documents through this form.",
    documentsHint: "List documents; do not upload. We will confirm how to share them securely.",
    success: "Your enquiry has been received. The firm will respond by phone or email.",
  },

  disclaimer: {
    title: "Disclaimer",
    lead: 'The Bar Council of India does not permit advocates to solicit work or advertise. By clicking "I Agree", you confirm that:',
    points: [
      "you are accessing this website of your own accord, to learn about The Law & Lawyers, and not because of any advertisement, solicitation, invitation or inducement by the firm or its members;",
      "the information on this website is provided at your request, for informational purposes only, and does not constitute legal advice;",
      "visiting this website or contacting the firm through it does not create an advocate–client relationship;",
      "the firm is not liable for any action taken in reliance on material on this website.",
    ],
    agree: "I Agree",
    exit: "Exit",
    footer:
      "This website is for information only and does not constitute advertising, solicitation or legal advice, in accordance with the rules of the Bar Council of India. No advocate–client relationship is created by its use.",
  },

  partners,
  practiceAreas,
};

export const getPartner = (slug: string) => partners.find((p) => p.slug === slug);
export const getPractice = (slug: string) => practiceAreas.find((p) => p.slug === slug);

/** Practice areas a partner leads, in index order. */
export const practicesLedBy = (slug: PartnerSlug) =>
  practiceAreas.filter((p) => p.leads.includes(slug) || p.leads.includes("firm"));

/** Partners shown against a practice area; "firm" shows both partners. */
export const partnersFor = (practice: PracticeArea): Partner[] =>
  practice.leads.includes("firm")
    ? partners
    : practice.leads
        .map((s) => (s === "firm" ? undefined : getPartner(s)))
        .filter((p): p is Partner => Boolean(p));

/**
 * Privacy notice and Terms of use. Drafted with India's Digital Personal Data Protection Act, 2023
 * in mind. Items in [square brackets] need the firm's confirmation. The firm's own counsel should
 * review both documents before they go live.
 */
export const legal = {
  privacy: {
    title: "Privacy notice",
    updated: "[Confirm effective date]",
    intro:
      "This notice explains how The Law & Lawyers (Advocates and Solicitors) handles personal data collected through this website. It is written with the Digital Personal Data Protection Act, 2023 (the DPDP Act) in mind.",
    sections: [
      {
        heading: "Who is responsible for your data",
        paragraphs: [
          "The Law & Lawyers (Advocates and Solicitors), a registered partnership firm, House No. 1380, Ganga Enclave, Roorkee, District Haridwar, Uttarakhand – 247667, decides why and how the data you submit through this website is used. In the language of the DPDP Act, the firm is the Data Fiduciary.",
        ],
      },
      {
        heading: "What we collect",
        paragraphs: ["Only what you choose to type into the enquiry form:"],
        list: [
          "your full name, phone number and email address;",
          "the nature of the matter, any deadline, and your brief description of the matter;",
          "a list of documents you have available (documents themselves are not uploaded through this site).",
        ],
        after:
          "Please do not include confidential or sensitive details in the form. The firm will tell you how to share documents securely if it is appropriate to do so.",
      },
      {
        heading: "Why we use it",
        paragraphs: [
          "We use the information to read your enquiry and to respond to you by phone or email. We do not use it for advertising or marketing, and we do not sell or rent it. The form asks for your consent before you can send it; that consent is the basis on which we process what you submit.",
        ],
      },
      {
        heading: "Withdrawing consent",
        paragraphs: [
          "You may withdraw your consent at any time by writing to advocate@lawandlawyers.in. Withdrawal does not affect anything done before it, and the firm may need to keep some records where the law requires.",
        ],
      },
      {
        heading: "Who else handles your data",
        paragraphs: ["To run the site and deliver your enquiry, the firm relies on these service providers, each acting on the firm's instructions:"],
        list: [
          "Resend, to deliver the enquiry to the firm by email, with Formspree as a fallback if that fails;",
          "Vercel, which hosts the website;",
          "Plausible, if enabled, for cookie-free visit counts. It loads only after you accept the disclaimer and it does not receive your name, phone number or email address;",
          "Google Maps, only if you press “Load map here” on the Contact page. Nothing from Google loads otherwise.",
        ],
        after:
          "Some of these providers may store data on servers outside India. [Confirm the hosting and email regions in use.] The site sets no advertising or tracking cookies. It uses your browser's session storage to remember that you accepted the disclaimer, and local storage to remember your light or dark theme choice.",
      },
      {
        heading: "How long we keep it",
        paragraphs: ["[Confirm retention period for enquiries that do not lead to an engagement.]"],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Under the DPDP Act you may ask the firm for a summary of the personal data it holds about you and how it is being used, ask for it to be corrected, completed or updated, and ask for it to be erased. You may also nominate another person to exercise these rights on your behalf if you die or become incapable of doing so. Write to advocate@lawandlawyers.in to use any of these rights.",
        ],
      },
      {
        heading: "Complaints",
        paragraphs: [
          "If you have a concern about how your data has been handled, write to the firm at advocate@lawandlawyers.in. [Confirm the name of the person who will receive grievances.] If you are not satisfied with the response, you may complain to the Data Protection Board of India.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "This website is not meant for children. Please do not submit data about a person under 18 years of age unless you are their parent or lawful guardian.",
        ],
      },
      {
        heading: "Safeguards",
        paragraphs: [
          "The firm takes reasonable security steps to protect the data you submit, including encrypted transmission. No method of transmission over the internet is completely secure, which is why the form asks you not to send confidential documents.",
        ],
      },
      {
        heading: "Changes to this notice",
        paragraphs: ["If this notice changes, the new version will be published on this page with its effective date."],
      },
    ] as { heading: string; paragraphs: string[]; list?: string[]; after?: string }[],
  },
  terms: {
    title: "Terms of use",
    updated: "[Confirm effective date]",
    intro: "By using this website you agree to these terms. If you do not agree, please do not use it.",
    sections: [
      {
        heading: "Information only",
        paragraphs: [
          "This website is provided for information only. It is not advertising or solicitation, and nothing on it is legal advice. The Bar Council of India does not permit advocates to advertise or solicit work.",
        ],
      },
      {
        heading: "No advocate–client relationship",
        paragraphs: [
          "Visiting this website, reading it, or sending an enquiry through it does not create an advocate–client relationship. That relationship arises only when the firm has agreed in writing to act for you. Until then, please do not send confidential documents or information.",
        ],
      },
      {
        heading: "No reliance",
        paragraphs: [
          "The material on this website is general in nature and may not be complete or current. The firm is not liable for any action taken, or not taken, in reliance on it. Please take advice on your own facts before acting.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The text, drawings, seal and design of this website belong to The Law & Lawyers. You may read and print pages for your own reference. You may not copy, republish or adapt them without the firm's written permission.",
        ],
      },
      {
        heading: "Links and third parties",
        paragraphs: [
          "Where this website links to a third-party service, such as a map, the firm does not control that service and is not responsible for it.",
        ],
      },
      {
        heading: "Availability",
        paragraphs: [
          "The firm tries to keep the website available but does not promise that it will be uninterrupted or free of errors.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India. [Confirm the courts that will have jurisdiction.]",
        ],
      },
    ] as { heading: string; paragraphs: string[]; list?: string[]; after?: string }[],
  },
};

/**
 * Photographs of the firm's office, supplied by the firm. Files are in public/photos (metadata stripped,
 * resized to 2400px wide). Alt text describes what is shown. The next/image component serves AVIF/WebP.
 * Not used: a photo of a client meeting (confidentiality).
 */
export const photos = {
  corridor: {
    src: "/photos/office-corridor.jpg",
    width: 2000,
    height: 1695,
    alt: "The corridor of the firm's office in Roorkee, with a signboard reading The Law & Lawyers, Advocates, Law Firm, and planters along the workstations.",
  },
  workstations: {
    src: "/photos/office-workstations.jpg",
    width: 2400,
    height: 1600,
    alt: "Workstations in the firm's office, with the firm's name on the wall behind them.",
  },
  desks: {
    src: "/photos/office-desks.jpg",
    width: 2400,
    height: 1600,
    alt: "Staff at desks in the firm's office, with a long counter and framed pictures on the wall.",
  },
  floor: {
    src: "/photos/office-floor.jpg",
    width: 2400,
    height: 1600,
    alt: "The office floor with desks along the wall and a long working table in the foreground.",
  },
} satisfies Record<string, Photo>;
