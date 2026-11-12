export interface Service {
  slug: string;
  name: string;
  navLabel: string;
  icon: string;
  short: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
  benefits: { label: string; icon: string }[];
}

export const services: Service[] = [
  {
    slug: "ocean-freight-forwarding",
    name: "Ocean Freight Forwarding",
    navLabel: "Ocean Freight Forwarding",
    icon: "ri-ship-line",
    short:
      "Reliable sea freight solutions for international cargo movement, including FCL and LCL shipments.",
    tagline: "Global sea freight, delivered with certainty.",
    description:
      "Our ocean freight forwarding connects Indian businesses to global markets through dependable FCL (Full Container Load) and LCL (Less than Container Load) services. We manage the entire sea freight lifecycle — booking, documentation, vessel coordination, transhipment and delivery — so your international cargo moves efficiently across the world's major trade lanes.",
    image:
      "https://readdy.ai/api/search-image?query=Aerial%20view%20of%20a%20massive%20container%20ship%20loaded%20with%20colorful%20shipping%20containers%20navigating%20through%20deep%20blue%20ocean%20water%2C%20large%20container%20terminal%20cranes%20and%20port%20infrastructure%20in%20the%20background%2C%20professional%20corporate%20logistics%20photography%2C%20clear%20sky%2C%20sharp%20detail%2C%20high%20quality&width=1200&height=800&seq=lsl-ocean-1&orientation=landscape"
    ,
    alt: "Container ship carrying international cargo across the ocean",
    features: [
      "FCL and LCL sea freight options",
      "Global port-to-port connections",
      "Vessel and schedule coordination",
      "Import and export documentation",
      "Cargo tracking and milestone updates",
      "Competitive international rates",
    ],
    benefits: [
      { label: "Cost-efficient for bulk cargo", icon: "ri-money-dollar-circle-line" },
      { label: "Global carrier network", icon: "ri-global-line" },
      { label: "Flexible FCL / LCL modes", icon: "ri-archive-drawer-line" },
    ],
  },
  {
    slug: "air-freight-forwarding",
    name: "Air Freight Forwarding",
    navLabel: "Air Freight Forwarding",
    icon: "ri-flight-takeoff-line",
    short: "Fast and secure air freight solutions for time-sensitive shipments.",
    tagline: "Speed without compromise.",
    description:
      "When time matters, our air freight forwarding delivers. We move time-sensitive, high-value and urgent cargo through scheduled and consolidated air services, with priority handling, secure ground operations and real-time status visibility across major international airports.",
    image:
      "https://readdy.ai/api/search-image?query=Wide%20cargo%20aircraft%20being%20loaded%20with%20palletized%20freight%20at%20a%20busy%20international%20airport%20apron%2C%20ground%20crew%20and%20loading%20equipment%2C%20dramatic%20clear%20sky%2C%20professional%20aviation%20and%20logistics%20photography%2C%20sharp%20focus%2C%20premium%20corporate%20tone&width=1200&height=800&seq=lsl-air-1&orientation=landscape"
    ,
    alt: "Cargo aircraft being loaded with air freight at an international airport",
    features: [
      "Express and consolidated air cargo",
      "Priority and chartered capacity",
      "International airport coverage",
      "Time-critical shipment handling",
      "Airline and agent coordination",
      "Real-time shipment visibility",
    ],
    benefits: [
      { label: "Fastest transit times", icon: "ri-speed-up-line" },
      { label: "Secure handling", icon: "ri-shield-check-line" },
      { label: "Time-critical reliability", icon: "ri-timer-flash-line" },
    ],
  },
  {
    slug: "road-freight",
    name: "Road Freight",
    navLabel: "Road Freight",
    icon: "ri-truck-line",
    short: "Flexible road transportation solutions for domestic and regional cargo movement.",
    tagline: "Flexible door-to-door road capacity.",
    description:
      "Our road freight network provides flexible, reliable overland transportation across India and regional corridors. From full truckloads to express same-day runs, we offer adaptable capacity, professional drivers and coordinated fleet management for cargo of every size.",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20white%20semi%20truck%20hauling%20freight%20on%20a%20highway%20through%20a%20scenic%20landscape%2C%20professional%20logistics%20photography%2C%20golden%20hour%20lighting%2C%20corporate%20clean%20style%2C%20sharp%20detail&width=1200&height=800&seq=lsl-road-1&orientation=landscape"
    ,
    alt: "Freight truck transporting cargo on a highway",
    features: [
      "Full truckload (FTL) and less than truckload (LTL)",
      "Domestic and regional routes",
      "Express and scheduled transport",
      "Professional drivers and fleet",
      "Flexible vehicle types and sizes",
      "Live dispatch coordination",
    ],
    benefits: [
      { label: "Flexible capacity", icon: "ri-truck-line" },
      { label: "Regional coverage", icon: "ri-map-2-line" },
      { label: "Door-to-door options", icon: "ri-road-map-line" },
    ],
  },
  {
    slug: "rail-freight",
    name: "Rail Freight",
    navLabel: "Rail Freight",
    icon: "ri-train-line",
    short: "Efficient rail freight solutions for dependable large-volume transportation.",
    tagline: "Dependable capacity for large volumes.",
    description:
      "Rail freight offers an efficient, cost-effective and lower-emission option for moving large volumes over long distances. We coordinate rail solutions that keep heavy and high-frequency cargo moving reliably across major domestic corridors.",
    image:
      "https://readdy.ai/api/search-image?query=Freight%20train%20carrying%20shipping%20containers%20moving%20along%20double%20track%20railway%20through%20open%20countryside%2C%20professional%20logistics%20photography%2C%20clear%20day%20light%2C%20container%20wagons%2C%20corporate%20clean%20aesthetic&width=1200&height=800&seq=lsl-rail-1&orientation=landscape"
    ,
    alt: "Freight train carrying containers on a railway line",
    features: [
      "Large-volume rail capacity",
      "Domestic corridor coverage",
      "Container and bulk rail cargo",
      "Cost-efficient long haul",
      "Reliable scheduled departures",
      "Lower-emission transport",
    ],
    benefits: [
      { label: "High-volume capacity", icon: "ri-server-line" },
      { label: "Cost efficient", icon: "ri-line-chart-line" },
      { label: "Lower emissions", icon: "ri-leaf-line" },
    ],
  },
  {
    slug: "value-added-services",
    name: "Value Added Services",
    navLabel: "Value Added Services",
    icon: "ri-settings-3-line",
    short: "Additional logistics support designed to improve shipment efficiency and operational convenience.",
    tagline: "Do more with your supply chain.",
    description:
      "Beyond transportation, we build operational efficiency through value-added services — customs support, cargo consolidation, quality checks, documentation handling and packaging — designed to simplify your logistics and improve every shipment's performance.",
    image:
      "https://readdy.ai/api/search-image?query=Professionals%20in%20a%20modern%20logistics%20control%20room%20monitoring%20global%20shipments%20on%20large%20screens%20with%20maps%20and%20data%20dashboards%2C%20corporate%20technology%20photography%2C%20clean%20office%2C%20blue%20toned%20screens&width=1200&height=800&seq=lsl-value-1&orientation=landscape"
    ,
    alt: "Logistics specialists monitoring shipments in a control room",
    features: [
      "Cargo consolidation",
      "Packaging and labelling",
      "Quality checks and inspection",
      "Documentation and paperwork",
      "Insurance coordination",
      "Customized logistics planning",
    ],
    benefits: [
      { label: "Operational convenience", icon: "ri-tools-line" },
      { label: "Improved efficiency", icon: "ri-flashlight-line" },
      { label: "Custom solutions", icon: "ri-settings-4-line" },
    ],
  },
  {
    slug: "cold-chain-logistics",
    name: "Cold Chain Logistics",
    navLabel: "Cold Chain Logistics",
    icon: "ri-snowy-line",
    short: "Temperature-controlled transportation and storage solutions for sensitive products.",
    tagline: "Protecting sensitive cargo at every degree.",
    description:
      "Our cold chain logistics maintains the integrity of temperature-sensitive products — pharmaceuticals, food, chemicals and perishables — with carefully controlled refrigerated transport and storage, monitored throughout the journey to protect your cargo's quality.",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20refrigerated%20warehouse%20interior%20with%20cold%20storage%20racks%20and%20temperature%20controlled%20environment%2C%20clean%20food%20and%20pharmaceutical%20logistics%2C%20professional%20industrial%20photography%2C%20cool%20blue%20lighting%2C%20premium%20corporate&width=1200&height=800&seq=lsl-cold-1&orientation=landscape"
    ,
    alt: "Temperature-controlled cold storage warehouse interior",
    features: [
      "Refrigerated transport",
      "Temperature-controlled storage",
      "Cold chain monitoring",
      "Perishable and pharmaceutical handling",
      "Reefer equipment coordination",
      "Cold chain compliance",
    ],
    benefits: [
      { label: "Temperature integrity", icon: "ri-thermometer-line" },
      { label: "Sensitive product handling", icon: "ri-shield-check-line" },
      { label: "End-to-end monitoring", icon: "ri-eye-line" },
    ],
  },
  {
    slug: "custom-clearance",
    name: "Custom Clearance",
    navLabel: "Custom Clearance",
    icon: "ri-file-shield-2-line",
    short: "Professional customs documentation and clearance support for smooth cargo movement.",
    tagline: "Smooth clearance, zero delays.",
    description:
      "Our customs clearance specialists manage documentation, tariff classification, licensing and regulatory compliance so your cargo moves through borders smoothly. We handle the formalities to prevent delays and keep your shipments compliant.",
    image:
      "https://readdy.ai/api/search-image?query=Customs%20clearance%20documents%20and%20stamped%20export%20papers%20on%20a%20professional%20desk%20with%20a%20laptop%20and%20world%20clock%2C%20port%20and%20shipping%20paperwork%20concept%2C%20clean%20corporate%20photography%2C%20organized%2C%20sharp%20detail&width=1200&height=800&seq=lsl-customs-1&orientation=landscape"
    ,
    alt: "Customs documentation and export clearance paperwork on a desk",
    features: [
      "Import and export clearance",
      "Documentation management",
      "Tariff classification",
      "Licensing and compliance",
      "Duty and tax coordination",
      "Regulatory advisory",
    ],
    benefits: [
      { label: "Compliance expertise", icon: "ri-verified-badge-line" },
      { label: "Reduced delays", icon: "ri-time-line" },
      { label: "Documentation support", icon: "ri-file-list-3-line" },
    ],
  },
  {
    slug: "air-charter-services",
    name: "Air Charter Services",
    navLabel: "Air Charter Services",
    icon: "ri-plane-line",
    short: "Specialized air charter solutions for urgent, oversized or critical cargo requirements.",
    tagline: "Mission-critical capacity when you need it.",
    description:
      "When cargo is urgent, oversized or beyond normal capacity, our air charter services deliver dedicated air capacity. We arrange aircraft that match your specific requirements — full charters or blocked space — for complex and critical shipments.",
    image:
      "https://readdy.ai/api/search-image?query=Large%20cargo%20aircraft%20on%20runway%20being%20prepared%20for%20a%20specialized%20charter%20flight%2C%20cargo%20door%20open%2C%20ground%20support%20vehicles%2C%20professional%20aviation%20photography%2C%20clear%20sky%2C%20dramatic%20premium%20tone&width=1200&height=800&seq=lsl-charter-1&orientation=landscape"
    ,
    alt: "Large cargo aircraft prepared for a charter flight",
    features: [
      "Full charter and blocked space",
      "Oversized and heavy cargo",
      "Urgent and critical shipments",
      "Aircraft selection and advisory",
      "Dedicated ground handling",
      "Flexible routing",
    ],
    benefits: [
      { label: "Priority capacity", icon: "ri-rocket-2-line" },
      { label: "Oversized cargo support", icon: "ri-expand-height-line" },
      { label: "Custom routing", icon: "ri-route-line" },
    ],
  },
  {
    slug: "warehousing-distribution",
    name: "Warehousing & Distribution",
    navLabel: "Warehousing & Distribution",
    icon: "ri-archive-line",
    short: "Secure storage, inventory handling and organized distribution solutions.",
    tagline: "Storage, inventory and distribution, resolved.",
    description:
      "Our warehousing and distribution services keep your inventory secure, organized and moving. From storage and inventory management to picking, packing and final distribution, we create an efficient link between your products and their destination.",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20automated%20distribution%20warehouse%20with%20high%20racks%20and%20order%20picking%20area%2C%20workers%20with%20scanners%2C%20bright%20clean%20industrial%20floor%2C%20professional%20logistics%20photography%2C%20sharp%20detail&width=1200&height=800&seq=lsl-warehouse-1&orientation=landscape"
    ,
    alt: "Modern automated warehouse with distribution racks",
    features: [
      "Secure storage facilities",
      "Inventory management",
      "Picking, packing and labeling",
      "Distribution coordination",
      "Stock reporting",
      "Fulfilment support",
    ],
    benefits: [
      { label: "Secure storage", icon: "ri-lock-2-line" },
      { label: "Inventory control", icon: "ri-scan-line" },
      { label: "Efficient distribution", icon: "ri-box-3-line" },
    ],
  },
  {
    slug: "courier-services",
    name: "Courier Services",
    navLabel: "Courier Services",
    icon: "ri-motorbike-line",
    short: "Reliable courier solutions for documents, parcels and time-sensitive deliveries.",
    tagline: "Documents and parcels, delivered right.",
    description:
      "Our courier services deliver documents, parcels and time-sensitive items with speed and care. With scheduled routes and dependable last-mile handling, we keep your important deliveries moving on time and to the right place.",
    image:
      "https://readdy.ai/api/search-image?query=Courier%20delivery%20person%20on%20a%20delivery%20scooter%20with%20parcel%20bags%20riding%20through%20a%20city%20street%2C%20professional%20delivery%20service%20photography%2C%20motion%2C%20clean%20urban%20background%2C%20sharp%20detail&width=1200&height=800&seq=lsl-courier-1&orientation=landscape"
    ,
    alt: "Courier delivering parcels by scooter in a city",
    features: [
      "Document and parcel delivery",
      "Time-sensitive shipments",
      "Scheduled and express routes",
      "Last-mile delivery",
      "Proof of delivery",
      "Local and regional coverage",
    ],
    benefits: [
      { label: "Fast last-mile delivery", icon: "ri-timer-line" },
      { label: "Proof of delivery", icon: "ri-file-check-line" },
      { label: "City and regional reach", icon: "ri-map-pin-2-line" },
    ],
  },
  {
    slug: "door-to-door-logistics",
    name: "Door-to-Door Logistics",
    navLabel: "Door-to-Door Logistics",
    icon: "ri-home-3-line",
    short: "Complete logistics management from pickup location to final destination.",
    tagline: "One partner. From pickup to doorstep.",
    description:
      "Door-to-door logistics simplifies your supply chain into a single coordinated journey. We manage everything from pickup, transportation, customs and warehousing to final delivery — one accountable partner for the entire movement of your cargo.",
    image:
      "https://readdy.ai/api/search-image?query=End-to-end%20door%20to%20door%20delivery%20concept%20showing%20a%20warehouse%20truck%20and%20courier%20moving%20cargo%20from%20a%20business%20to%20a%20home%20doorstep%2C%20professional%20logistics%20photography%2C%20clean%20city%20setting%2C%20sharp%20detail&width=1200&height=800&seq=lsl-d2d-1&orientation=landscape"
    ,
    alt: "Door-to-door delivery moving cargo from business to doorstep",
    features: [
      "Single point of contact",
      "Pickup to delivery management",
      "Multi-modal coordination",
      "Customs and documentation",
      "Final mile delivery",
      "End-to-end visibility",
    ],
    benefits: [
      { label: "One accountable partner", icon: "ri-team-line" },
      { label: "Simplified management", icon: "ri-list-check" },
      { label: "Full journey visibility", icon: "ri-eye-2-line" },
    ],
  },
];

export const servicesNav = services.map((s) => ({
  slug: s.slug,
  label: s.navLabel,
}));