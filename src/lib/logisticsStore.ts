// ---------------------------------------------------------------------------
// In-memory logistics store: single source of truth for Service Enquiries,
// Confirmed Orders and Shipment Tracking history. Purely front-end / demo —
// no backend. Data lives for the current browser session and resets on reload.
// ---------------------------------------------------------------------------

export interface ShipmentEvent {
  label: string;
  when: string;
  note: string;
  location?: string;
}

export interface Shipment {
  id: string;
  awbNumber: string;
  status: string;
  shipmentType: string;
  shipmentDate: string;
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDelivery: string;
  lastUpdated: string;
  history: ShipmentEvent[];
}

export type EnquiryStatus = "New" | "Under Review" | "Accepted" | "Rejected";

export interface Enquiry {
  enquiryId: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceSlug: string;
  serviceName: string;
  origin: string;
  destination: string;
  cargoType: string;
  details: Record<string, string>;
  message: string;
  submittedAt: string;
  submittedEpoch: number;
  status: EnquiryStatus;
  orderId?: string;
  adminNotes: string;
  rejectionReason: string;
}

export interface Order extends Shipment {
  enquiryId: string;
  awbNumber: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceSlug: string;
  serviceName: string;
  cargoType: string;
  weight: string;
  packageDetails: string;
  notes: string;
  lastUpdatedEpoch: number;
}

export const TIMELINE_STATUSES = [
  "Order Received",
  "Shipment Confirmed",
  "Pickup Completed",
  "In Transit",
  "Arrived at Hub",
  "Customs Clearance",
  "Out for Delivery",
  "Delivered",
] as const;

export const ALL_STATUSES = [
  "Order Received",
  "Shipment Confirmed",
  "Pickup Completed",
  "In Transit",
  "Arrived at Hub",
  "Customs Clearance",
  "Out for Delivery",
  "Delivered",
  "Delayed",
  "Cancelled",
] as const;

export type ShipmentStatus = (typeof ALL_STATUSES)[number];

// --- helpers ---------------------------------------------------------------

const now = new Date();
const YEAR = now.getFullYear();

function pad(n: number, len = 6): string {
  return String(n).padStart(len, "0");
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(d: Date): string {
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function nowStamp(): string {
  return `${formatDateTime(now)}, IST`;
}

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

export function generateEnquiryId(seq: number): string {
  return `ENQ${YEAR}${pad(seq)}`;
}

export function generateOrderId(seq: number): string {
  return `LSL${YEAR}${pad(seq)}`;
}

// --- seed data -------------------------------------------------------------

const SEED_TIME = new Date(now.getTime());
SEED_TIME.setDate(SEED_TIME.getDate()); // keep in sync

function stage(daysAgo: number, hour: number, min: number, label: string, note: string, location?: string): ShipmentEvent {
  const d = new Date(now.getTime());
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, min, 0, 0);
  return { label, when: `${formatDateTime(d)}, IST`, note, location };
}

export const initialEnquiries: Enquiry[] = [
  {
    enquiryId: "ENQ20260001",
    customerName: "Rohit Sharma",
    companyName: "Sharma Textiles Pvt. Ltd.",
    email: "rohit@sharmatex.com",
    phone: "+91 98200 12001",
    serviceSlug: "ocean-freight-forwarding",
    serviceName: "Ocean Freight Forwarding",
    origin: "Port of Mundra, India",
    destination: "Port of Jebel Ali, UAE",
    cargoType: "Garments & Textiles",
    details: {
      mode: "FCL (Full Container Load)",
      containerType: "40ft High Cube",
      numContainers: "3",
      weight: "12,000 kg",
      dimensions: "5.8m x 2.3m x 2.3m",
      shipmentDate: "02 Sep 2026",
    },
    message: "Need a reliable monthly FCL service to Jebel Ali. Quotation requested for a 12-month contract.",
    submittedAt: stage(2, 9, 10, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 2 * 86400000,
    status: "Accepted",
    orderId: "LSL202600123",
    adminNotes: "Vendor verified. Contract rate approved by finance.",
    rejectionReason: "",
  },
  {
    enquiryId: "ENQ20260002",
    customerName: "Ananya Iyer",
    companyName: "Iyer Electronics",
    email: "ananya@iyerelec.in",
    phone: "+91 99870 22441",
    serviceSlug: "air-freight-forwarding",
    serviceName: "Air Freight Forwarding",
    origin: "IGI Airport, Delhi",
    destination: "Narita Airport, Tokyo",
    cargoType: "Electronics & Components",
    details: {
      airportOfOrigin: "IGI Airport, Delhi",
      destAirport: "Narita Airport, Tokyo",
      weight: "850 kg",
      numPackages: "12",
      dimensions: "1.2m x 0.8m x 0.6m",
      shipmentDate: "04 Sep 2026",
    },
    message: "Urgent consignment of circuit boards. Need consolidation with a confirmed uplift this week.",
    submittedAt: stage(1, 11, 5, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 1 * 86400000,
    status: "Accepted",
    orderId: "LSL202600108",
    adminNotes: "Space blocked on IGI-DEL-NRT flight.",
    rejectionReason: "",
  },
  {
    enquiryId: "ENQ20260003",
    customerName: "Vikram Mehta",
    companyName: "Mehta Auto Parts",
    email: "vikram@mehtaauto.com",
    phone: "+91 90040 51226",
    serviceSlug: "road-freight",
    serviceName: "Road Freight",
    origin: "Andheri, Mumbai",
    destination: "Bhosari, Pune",
    cargoType: "Automotive Components",
    details: {
      pickup: "Andheri, Mumbai",
      delivery: "Bhosari, Pune",
      vehicleType: "20ft Truck",
      weight: "6,500 kg",
      numPackages: "24",
      shipmentDate: "20 Aug 2026",
    },
    message: "Recurring weekly FTL between Mumbai and Pune plant.",
    submittedAt: stage(15, 8, 0, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 15 * 86400000,
    status: "Accepted",
    orderId: "LSL202600111",
    adminNotes: "Regular lane — assigned dedicated fleet.",
    rejectionReason: "",
  },
  {
    enquiryId: "ENQ20260004",
    customerName: "Priya Nair",
    companyName: "Nair Pharma Distribution",
    email: "priya@nairpharma.com",
    phone: "+91 98111 90960",
    serviceSlug: "custom-clearance",
    serviceName: "Custom Clearance",
    origin: "Chennai Port, India",
    destination: "Singapore",
    cargoType: "Pharmaceutical Exports",
    details: {
      direction: "Export",
      port: "Chennai Port, India",
      cargoType: "Pharmaceutical Exports",
      countryOfOrigin: "India",
      destCountry: "Singapore",
      docRequirements: "Certificate of Origin, COPP, Lab test reports.",
    },
    message: "Export clearance for a pharmaceutical batch. Documentation guidance needed.",
    submittedAt: stage(6, 9, 0, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 6 * 86400000,
    status: "Accepted",
    orderId: "LSL202600101",
    adminNotes: "Customs inspection ongoing; additional docs requested.",
    rejectionReason: "",
  },
  {
    enquiryId: "ENQ20260005",
    customerName: "Sandeep Rao",
    companyName: "Rao Cold Storage",
    email: "sandeep@raocold.com",
    phone: "+91 99530 18115",
    serviceSlug: "cold-chain-logistics",
    serviceName: "Cold Chain Logistics",
    origin: "Hyderabad, India",
    destination: "Bengaluru, India",
    cargoType: "Pharmaceuticals (Insulin)",
    details: {
      productType: "Pharmaceuticals (Insulin)",
      temperature: "2-8 C",
      storage: "Reefer Vehicle",
      shipmentDate: "",
    },
    message: "Temperature-sensitive insulin transport. Need end-to-end cold chain assurance.",
    submittedAt: stage(5, 14, 20, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 5 * 86400000,
    status: "Rejected",
    notes: "",
    adminNotes: "",
    rejectionReason: "Route currently outside our certified cold chain network. Please re-submit for a later date or use a partner lane.",
  },
  {
    enquiryId: "ENQ20260006",
    customerName: "Neha Kapoor",
    companyName: "Kapoor Retail",
    email: "neha@kapoorretail.in",
    phone: "+91 92211 30042",
    serviceSlug: "courier-services",
    serviceName: "Courier Services",
    origin: "Sector 44, Gurugram",
    destination: "Bandra, Mumbai",
    cargoType: "Documents",
    details: {
      pickupAddress: "Sector 44, Gurugram",
      deliveryAddress: "Bandra, Mumbai",
      cargoType: "Document",
      weight: "2 kg",
      numPackages: "1",
      shipmentDate: "05 Sep 2026",
    },
    message: "Express document delivery required by tomorrow morning for a tender submission.",
    submittedAt: stage(0, 8, 45, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 0.2 * 86400000,
    status: "New",
    adminNotes: "",
    rejectionReason: "",
  },
  {
    enquiryId: "ENQ20260007",
    customerName: "Arjun Malhotra",
    companyName: "Malhotra Aviation Parts",
    email: "arjun@malhotraav.com",
    phone: "+91 99002 73410",
    serviceSlug: "air-charter-services",
    serviceName: "Air Charter Services",
    origin: "Delhi, India",
    destination: "Riyadh, Saudi Arabia",
    cargoType: "Aircraft Spares",
    details: {
      cargoType: "Aircraft Spares",
      weight: "4,800 kg",
      dimensions: "6m x 2.4m x 2.4m",
      shipmentDate: "07 Sep 2026",
      urgency: "AOG (Aircraft on Ground) — parts are critical to a grounded aircraft.",
    },
    message: "Need charter capacity urgently for oversized compressor spares.",
    submittedAt: stage(1, 16, 30, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 1.5 * 86400000,
    status: "New",
    adminNotes: "",
    rejectionReason: "",
  },
  {
    enquiryId: "ENQ20260008",
    customerName: "Divya Menon",
    companyName: "Menon FMCG",
    email: "divya@menonfmcg.com",
    phone: "+91 98920 45560",
    serviceSlug: "warehousing-distribution",
    serviceName: "Warehousing & Distribution",
    origin: "Bhiwandi, Maharashtra",
    destination: "Multiple outlets, Mumbai",
    cargoType: "FMCG Products",
    details: {
      storageLocation: "Bhiwandi, Maharashtra",
      productType: "FMCG Products",
      storageCapacity: "5,000 sq ft",
      quantity: "1,200 units",
      duration: "3 months",
      distribution: "Daily dispatch to 40 retail outlets across Mumbai.",
    },
    message: "Seeking bonded and non-bonded warehousing with daily distribution.",
    submittedAt: stage(3, 10, 15, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 3 * 86400000,
    status: "Under Review",
    adminNotes: "",
    rejectionReason: "",
  },
  {
    enquiryId: "ENQ20260009",
    customerName: "Kunal Shah",
    companyName: "Shah Interiors",
    email: "kunal@shahinteriors.com",
    phone: "+91 90250 61780",
    serviceSlug: "door-to-door-logistics",
    serviceName: "Door-to-Door Logistics",
    origin: "GIDC, Ahmedabad",
    destination: "Riyadh, Saudi Arabia",
    cargoType: "Home Furniture",
    details: {
      pickupAddress: "GIDC, Ahmedabad",
      deliveryAddress: "Riyadh, Saudi Arabia",
      cargoType: "Home Furniture",
      weight: "9,800 kg",
      packageDetails: "8 pallets + 12 crates",
      shipmentDate: "10 Sep 2026",
    },
    message: "Full door-to-door for a hotel fit-out — pickup to house in Riyadh.",
    submittedAt: stage(1, 12, 40, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 1.2 * 86400000,
    status: "New",
    adminNotes: "",
    rejectionReason: "",
  },
  {
    enquiryId: "ENQ20260010",
    customerName: "Rahul Tripathi",
    companyName: "Tripathi Cements",
    email: "rahul@tripathicements.com",
    phone: "+91 97110 28871",
    serviceSlug: "rail-freight",
    serviceName: "Rail Freight",
    origin: "Nagpur, India",
    destination: "New Delhi, India",
    cargoType: "Cement (Bulk)",
    details: {
      cargoType: "Cement (Bulk)",
      weight: "48,000 kg",
      containerReq: "Box Wagon",
      shipmentDate: "",
    },
    message: "Monthly bulk cement movement by rail. Need reliable schedule.",
    submittedAt: stage(4, 11, 25, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 4 * 86400000,
    status: "Under Review",
    adminNotes: "",
    rejectionReason: "",
  },
  {
    enquiryId: "ENQ20260011",
    customerName: "Gayatri Deshmukh",
    companyName: "Deshmukh Agro Exports",
    email: "gayatri@deshmukhagro.com",
    phone: "+91 98901 44552",
    serviceSlug: "ocean-freight-forwarding",
    serviceName: "Ocean Freight Forwarding",
    origin: "Port of Nhava Sheva, India",
    destination: "Port of Rotterdam, Netherlands",
    cargoType: "Agricultural Products",
    details: {
      mode: "FCL (Full Container Load)",
      containerType: "20ft Reefer",
      numContainers: "2",
      weight: "24,000 kg",
      dimensions: "5.4m x 2.2m x 2.2m",
      shipmentDate: "12 Sep 2026",
    },
    message: "Reefer FCL for perishable agri-products to Rotterdam. Temperature 4 C.",
    submittedAt: stage(2, 13, 5, "Order Received", "Submitted").when,
    submittedEpoch: now.getTime() - 2.5 * 86400000,
    status: "Accepted",
    adminNotes: "",
    rejectionReason: "",
  },
];

export const initialOrders: Order[] = [
  {
    id: "LSL202600123",
    enquiryId: "ENQ20260001",
    awbNumber: "7745123390",
    customerName: "Rohit Sharma",
    companyName: "Sharma Textiles Pvt. Ltd.",
    email: "rohit@sharmatex.com",
    phone: "+91 98200 12001",
    serviceSlug: "ocean-freight-forwarding",
    serviceName: "Ocean Freight Forwarding",
    status: "In Transit",
    shipmentType: "Ocean Freight • FCL",
    shipmentDate: "02 Sep 2026",
    origin: "Mundra, India",
    destination: "Jebel Ali, UAE",
    currentLocation: "Arabian Sea",
    estimatedDelivery: "18 Sep 2026",
    lastUpdated: "04 Sep 2026, 10:24 IST",
    lastUpdatedEpoch: now.getTime() - 0.8 * 86400000,
    cargoType: "Garments & Textiles",
    weight: "12,000 kg",
    packageDetails: "3x 40ft High Cube Containers",
    notes: "Monthly FCL contract route.",
    history: [
      stage(2, 9, 10, "Order Received", "Shipment request registered with Order ID LSL202600123.", "Mundra, India"),
      stage(2, 12, 45, "Shipment Confirmed", "Booking confirmed and documentation initiated.", "Mundra, India"),
      stage(1, 8, 30, "Pickup Completed", "Container picked up and moved to Port of Mundra.", "Port of Mundra, India"),
      stage(1, 22, 15, "In Transit", "Vessel departed Port of Mundra bound for Jebel Ali.", "Arabian Sea"),
    ],
  },
  {
    id: "LSL202600111",
    enquiryId: "ENQ20260003",
    awbNumber: "7745123517",
    customerName: "Vikram Mehta",
    companyName: "Mehta Auto Parts",
    email: "vikram@mehtaauto.com",
    phone: "+91 90040 51226",
    serviceSlug: "road-freight",
    serviceName: "Road Freight",
    status: "Delivered",
    shipmentType: "Road Freight",
    shipmentDate: "20 Aug 2026",
    origin: "Mumbai, India",
    destination: "Pune, India",
    currentLocation: "Pune, India",
    estimatedDelivery: "22 Aug 2026",
    lastUpdated: "22 Aug 2026, 17:42 IST",
    lastUpdatedEpoch: now.getTime() - 13 * 86400000,
    cargoType: "Automotive Components",
    weight: "6,500 kg",
    packageDetails: "20ft Truck",
    notes: "Weekly FTL lane.",
    history: [
      stage(15, 8, 0, "Order Received", "Shipment request registered with Order ID LSL202600111.", "Mumbai, India"),
      stage(15, 10, 15, "Shipment Confirmed", "Booking confirmed and vehicle assigned.", "Mumbai, India"),
      stage(15, 14, 20, "Pickup Completed", "Cargo picked up from shipper.", "Mumbai, India"),
      stage(14, 6, 5, "In Transit", "Truck departed Mumbai bound for Pune.", "Mumbai-Pune Expressway"),
      stage(14, 20, 10, "Arrived at Hub", "Shipment reached Pune hub.", "Pune, India"),
      stage(13, 9, 30, "Out for Delivery", "Shipment loaded on final delivery vehicle.", "Pune, India"),
      stage(13, 15, 45, "Delivered", "Delivery completed and POD received.", "Pune, India"),
    ],
  },
  {
    id: "LSL202600108",
    enquiryId: "ENQ20260002",
    awbNumber: "7745123683",
    customerName: "Ananya Iyer",
    companyName: "Iyer Electronics",
    email: "ananya@iyerelec.in",
    phone: "+91 99870 22441",
    serviceSlug: "air-freight-forwarding",
    serviceName: "Air Freight Forwarding",
    status: "Order Received",
    shipmentType: "Air Freight",
    shipmentDate: "04 Sep 2026",
    origin: "Delhi, India",
    destination: "Dubai, UAE",
    currentLocation: "Delhi, India",
    estimatedDelivery: "06 Sep 2026",
    lastUpdated: "04 Sep 2026, 11:05 IST",
    lastUpdatedEpoch: now.getTime() - 0.5 * 86400000,
    cargoType: "Electronics & Components",
    weight: "850 kg",
    packageDetails: "12 packages",
    notes: "Consolidated uplift confirmed.",
    history: [
      stage(1, 11, 5, "Order Received", "Shipment request registered with Order ID LSL202600108.", "Delhi, India"),
    ],
  },
  {
    id: "LSL202600101",
    enquiryId: "ENQ20260004",
    awbNumber: "7745123729",
    customerName: "Priya Nair",
    companyName: "Nair Pharma Distribution",
    email: "priya@nairpharma.com",
    phone: "+91 98111 90960",
    serviceSlug: "custom-clearance",
    serviceName: "Custom Clearance",
    status: "Delayed",
    shipmentType: "Custom Clearance",
    shipmentDate: "29 Aug 2026",
    origin: "Chennai Port, India",
    destination: "Singapore",
    currentLocation: "Chennai Port, India",
    estimatedDelivery: "05 Sep 2026",
    lastUpdated: "03 Sep 2026, 16:20 IST",
    lastUpdatedEpoch: now.getTime() - 1 * 86400000,
    cargoType: "Pharmaceutical Exports",
    weight: "3,200 kg",
    packageDetails: "Palletised",
    notes: "Customs inspection in progress.",
    history: [
      stage(6, 9, 0, "Order Received", "Shipment request registered with Order ID LSL202600101.", "Chennai, India"),
      stage(6, 13, 35, "Shipment Confirmed", "Booking confirmed and documentation initiated.", "Chennai, India"),
      stage(5, 11, 10, "Pickup Completed", "Cargo moved to the port.", "Chennai Port, India"),
      stage(2, 9, 40, "Customs Clearance", "Customs inspection in progress. Additional documentation requested.", "Chennai Port, India"),
    ],
  },
];

// --- runtime state ----------------------------------------------------------

let enquiries: Enquiry[] = initialEnquiries.map((e) => ({ ...e, details: { ...e.details } }));
let orders: Order[] = initialOrders.map((o) => ({ ...o, history: [...o.history] }));

let enquirySeq = initialEnquiries.length;
let orderSeq = initialOrders.length;

export function getEnquiries(): Enquiry[] {
  return [...enquiries];
}

export function getEnquiry(id: string): Enquiry | undefined {
  return enquiries.find((e) => e.enquiryId === id);
}

export function addEnquiry(input: Omit<Enquiry, "enquiryId" | "status" | "submittedAt" | "submittedEpoch" | "adminNotes" | "rejectionReason" | "orderId">): Enquiry {
  enquirySeq += 1;
  const enquiryId = generateEnquiryId(enquirySeq);
  const newEnquiry: Enquiry = {
    ...input,
    enquiryId,
    status: "New",
    submittedAt: nowStamp(),
    submittedEpoch: now.getTime(),
    adminNotes: "",
    rejectionReason: "",
  };
  enquiries = [newEnquiry, ...enquiries];
  return newEnquiry;
}

export function setEnquiryStatus(id: string, status: EnquiryStatus, notes: string): void {
  enquiries = enquiries.map((e) =>
    e.enquiryId === id
      ? {
          ...e,
          status,
          rejectionReason: status === "Rejected" ? notes : e.rejectionReason,
          adminNotes: status === "Rejected" ? e.adminNotes : notes || e.adminNotes,
        }
      : e
  );
}

export function getOrders(): Order[] {
  return [...orders];
}

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

function uniqueOrderId(): string {
  orderSeq += 1;
  let candidate = generateOrderId(orderSeq);
  while (orders.some((o) => o.id === candidate)) {
    orderSeq += 1;
    candidate = generateOrderId(orderSeq);
  }
  return candidate;
}

let awbSeq = 0;

function uniqueAwbNumber(): string {
  awbSeq += 1;
  let candidate = `77${String(now.getTime()).slice(-6)}${String(awbSeq).padStart(2, "0")}`;
  while (orders.some((o) => o.awbNumber === candidate)) {
    awbSeq += 1;
    candidate = `77${String(now.getTime()).slice(-6)}${String(awbSeq).padStart(2, "0")}`;
  }
  return candidate;
}

export function createOrderFromEnquiry(enquiryId: string, patch: Partial<Order>): Order | null {
  const enquiry = getEnquiry(enquiryId);
  if (!enquiry) return null;
  if (orders.some((o) => o.enquiryId === enquiryId)) return orders.find((o) => o.enquiryId === enquiryId) ?? null;

  const orderId = uniqueOrderId();
  const stamp = nowStamp();
  const newOrder: Order = {
    id: orderId,
    enquiryId,
    awbNumber: (patch.awbNumber && patch.awbNumber.trim()) || uniqueAwbNumber(),
    customerName: enquiry.customerName,
    companyName: enquiry.companyName,
    email: enquiry.email,
    phone: enquiry.phone,
    serviceSlug: enquiry.serviceSlug,
    serviceName: enquiry.serviceName,
    status: "Order Received",
    shipmentType: enquiry.serviceName,
    shipmentDate: formatDate(now),
    origin: enquiry.origin,
    destination: enquiry.destination,
    currentLocation: enquiry.origin,
    estimatedDelivery: addDays(now, 7),
    lastUpdated: stamp,
    lastUpdatedEpoch: now.getTime(),
    cargoType: enquiry.cargoType,
    weight: enquiry.details.weight ?? "",
    packageDetails: enquiry.message.slice(0, 80),
    notes: "",
    history: [
      {
        label: "Order Received",
        when: stamp,
        note: `Order created from enquiry ${enquiry.enquiryId}.`,
        location: enquiry.origin,
      },
    ],
    ...patch,
  };
  orders = [newOrder, ...orders];
  enquiries = enquiries.map((e) => (e.enquiryId === enquiryId ? { ...e, status: "Accepted", orderId } : e));
  return newOrder;
}

export function updateOrder(
  id: string,
  patch: { status?: string; awbNumber?: string; currentLocation?: string; estimatedDelivery?: string; notes?: string }
): { order: Order | null; awbTaken: boolean } {
  let updated: Order | null = null;
  const stamp = nowStamp();

  const normalizedAwb = (patch.awbNumber || "").trim().toUpperCase();
  let awbTaken = false;
  if (normalizedAwb) {
    awbTaken = orders.some((o) => o.id !== id && o.awbNumber.toUpperCase() === normalizedAwb);
  }

  orders = orders.map((o) => {
    if (o.id !== id) return o;
    const status = patch.status ? patch.status : o.status;
    let history = o.history;
    if (patch.status && patch.status !== o.status) {
      const event: ShipmentEvent = {
        label: status,
        when: stamp,
        note: patch.notes || o.notes || `Status updated to ${status}.`,
        location: patch.currentLocation ? patch.currentLocation : o.currentLocation,
      };
      history = [...o.history, event];
    }
    updated = {
      ...o,
      status,
      awbNumber: awbTaken ? o.awbNumber : (normalizedAwb || o.awbNumber),
      currentLocation: patch.currentLocation ?? o.currentLocation,
      estimatedDelivery: patch.estimatedDelivery ?? o.estimatedDelivery,
      notes: patch.notes ?? o.notes,
      lastUpdated: stamp,
      lastUpdatedEpoch: now.getTime(),
      history,
    };
    return updated;
  });

  return { order: updated, awbTaken };
}

export function getShipmentByAwbNumber(awb: string): Shipment | null {
  const normalized = (awb || "").trim().toUpperCase();
  if (!normalized) return null;
  const found = orders.find((o) => o.awbNumber.toUpperCase() === normalized);
  if (!found) return null;
  const { id: orderId, status, shipmentType, shipmentDate, origin, destination, currentLocation, estimatedDelivery, lastUpdated, history } = found;
  return { id: orderId, awbNumber: found.awbNumber, status, shipmentType, shipmentDate, origin, destination, currentLocation, estimatedDelivery, lastUpdated, history };
}

export function isAwbNumberTaken(awb: string): boolean {
  const normalized = (awb || "").trim().toUpperCase();
  if (!normalized) return false;
  return orders.some((o) => o.awbNumber.toUpperCase() === normalized);
}

export function sampleAwbNumber(): string {
  return orders[0]?.awbNumber ?? "7745123390";
}

export interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  acceptedEnquiries: number;
  rejectedEnquiries: number;
  activeOrders: number;
  inTransit: number;
  delivered: number;
  delayed: number;
  cancelled: number;
}

export function getDashboardStats(): DashboardStats {
  const activeOrders = orders.filter((o) => !["Delivered", "Cancelled"].includes(o.status)).length;
  return {
    totalEnquiries: enquiries.length,
    newEnquiries: enquiries.filter((e) => e.status === "New").length,
    acceptedEnquiries: enquiries.filter((e) => e.status === "Accepted").length,
    rejectedEnquiries: enquiries.filter((e) => e.status === "Rejected").length,
    activeOrders,
    inTransit: orders.filter((o) => o.status === "In Transit").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    delayed: orders.filter((o) => o.status === "Delayed").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };
}

export interface ActivityItem {
  kind: "enquiry" | "order";
  refId: string;
  title: string;
  subtitle: string;
  status: string;
  when: string;
  epoch: number;
  link: string;
}

export function getRecentActivity(limit = 8): ActivityItem[] {
  const items: ActivityItem[] = [];

  enquiries.forEach((e) => {
    items.push({
      kind: "enquiry",
      refId: e.enquiryId,
      title: `${e.customerName}`,
      subtitle: `${e.serviceName} • ${e.origin} → ${e.destination}`,
      status: e.status,
      when: e.submittedAt,
      epoch: e.submittedEpoch,
      link: `/admin/enquiries/${e.enquiryId}`,
    });
  });

  orders.forEach((o) => {
    items.push({
      kind: "order",
      refId: o.id,
      title: `Order ${o.id}`,
      subtitle: `${o.serviceName} • ${o.origin} → ${o.destination}`,
      status: o.status,
      when: o.lastUpdated,
      epoch: o.lastUpdatedEpoch,
      link: `/admin/orders/${o.id}`,
    });
  });

  return items.sort((a, b) => b.epoch - a.epoch).slice(0, limit);
}