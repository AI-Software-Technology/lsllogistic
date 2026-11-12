export type FormFieldType = "text" | "email" | "tel" | "date" | "textarea" | "select";

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  full?: boolean;
}

export interface ServiceFormConfig {
  originLabel: string;
  destinationLabel: string;
  originPlaceholder: string;
  destinationPlaceholder: string;
  cargoTypeLabel: string;
  extras: FormField[];
}

const defaultExtras: FormField[] = [
  { name: "cargoType", label: "Shipment / Cargo Type", type: "text", placeholder: "e.g. Textiles, Electronics, Machinery" },
  { name: "shipmentDate", label: "Shipment Date", type: "date" },
  { name: "weight", label: "Approximate Weight", type: "text", placeholder: "e.g. 2,500 kg" },
];

export const serviceFormConfigs: Record<string, ServiceFormConfig> = {
  "ocean-freight-forwarding": {
    originLabel: "Port of Origin",
    destinationLabel: "Port of Destination",
    originPlaceholder: "e.g. Port of Mundra, India",
    destinationPlaceholder: "e.g. Port of Jebel Ali, UAE",
    cargoTypeLabel: "Cargo Type",
    extras: [
      { name: "mode", label: "FCL / LCL", type: "select", required: true, options: ["FCL (Full Container Load)", "LCL (Less than Container Load)"] },
      { name: "containerType", label: "Container Type", type: "select", options: ["20ft Standard", "40ft Standard", "40ft High Cube", "20ft Reefer", "40ft Reefer"] },
      { name: "numContainers", label: "Number of Containers", type: "text", placeholder: "e.g. 2" },
      { name: "weight", label: "Cargo Weight", type: "text", placeholder: "e.g. 12,000 kg" },
      { name: "dimensions", label: "Cargo Dimensions", type: "text", placeholder: "e.g. 5.8m x 2.3m x 2.3m" },
      { name: "shipmentDate", label: "Preferred Shipping Date", type: "date" },
    ],
  },
  "air-freight-forwarding": {
    originLabel: "Airport of Origin",
    destinationLabel: "Destination Airport",
    originPlaceholder: "e.g. IGI Airport, Delhi",
    destinationPlaceholder: "e.g. Narita Airport, Tokyo",
    cargoTypeLabel: "Cargo Type",
    extras: [
      { name: "airportOfOrigin", label: "Airport of Origin", type: "text", placeholder: "e.g. IGI Airport, Delhi" },
      { name: "destAirport", label: "Destination Airport", type: "text", placeholder: "e.g. Narita Airport, Tokyo" },
      { name: "weight", label: "Cargo Weight", type: "text", placeholder: "e.g. 850 kg" },
      { name: "numPackages", label: "Number of Packages", type: "text", placeholder: "e.g. 12" },
      { name: "dimensions", label: "Package Dimensions", type: "text", placeholder: "e.g. 1.2m x 0.8m x 0.6m" },
      { name: "shipmentDate", label: "Preferred Shipping Date", type: "date" },
    ],
  },
  "road-freight": {
    originLabel: "Pickup Location",
    destinationLabel: "Delivery Location",
    originPlaceholder: "e.g. Andheri, Mumbai",
    destinationPlaceholder: "e.g. Bhosari, Pune",
    cargoTypeLabel: "Cargo Type",
    extras: [
      { name: "pickup", label: "Pickup Location", type: "text", placeholder: "e.g. Andheri, Mumbai" },
      { name: "delivery", label: "Delivery Location", type: "text", placeholder: "e.g. Bhosari, Pune" },
      { name: "vehicleType", label: "Vehicle Requirement", type: "select", options: ["Small Van", "Tata Ace / Mini Truck", "14ft Truck", "20ft Truck", "32ft Trailer"] },
      { name: "weight", label: "Cargo Weight", type: "text", placeholder: "e.g. 6,500 kg" },
      { name: "numPackages", label: "Number of Packages", type: "text", placeholder: "e.g. 24" },
      { name: "shipmentDate", label: "Loading Date", type: "date" },
    ],
  },
  "rail-freight": {
    originLabel: "Origin",
    destinationLabel: "Destination",
    originPlaceholder: "e.g. Nagpur, India",
    destinationPlaceholder: "e.g. New Delhi, India",
    cargoTypeLabel: "Cargo Type",
    extras: [
      { name: "cargoType", label: "Cargo Type", type: "text", placeholder: "e.g. Bulk Grain, Containers" },
      { name: "weight", label: "Cargo Weight", type: "text", placeholder: "e.g. 48,000 kg" },
      { name: "containerReq", label: "Container Requirement", type: "select", options: ["None", "Box Wagon", "Flat Wagon", "Container on Flat"] },
      { name: "shipmentDate", label: "Preferred Date", type: "date" },
    ],
  },
  "value-added-services": {
    originLabel: "Pickup Location",
    destinationLabel: "Delivery Location",
    originPlaceholder: "e.g. Warehouse, Gurugram",
    destinationPlaceholder: "e.g. Distribution centre, Jaipur",
    cargoTypeLabel: "Service / Cargo Type",
    extras: [
      { name: "cargoType", label: "Service / Cargo Type", type: "text", placeholder: "e.g. Consolidation, Packaging, Inspection" },
      { name: "shipmentDate", label: "Preferred Date", type: "date" },
      { name: "weight", label: "Approximate Weight", type: "text", placeholder: "e.g. 3,000 kg" },
    ],
  },
  "cold-chain-logistics": {
    originLabel: "Pickup Location",
    destinationLabel: "Delivery Location",
    originPlaceholder: "e.g. Hyderabad, India",
    destinationPlaceholder: "e.g. Bengaluru, India",
    cargoTypeLabel: "Product Type",
    extras: [
      { name: "productType", label: "Product Type", type: "text", placeholder: "e.g. Pharmaceuticals, Frozen Food" },
      { name: "temperature", label: "Required Temperature", type: "text", placeholder: "e.g. 2-8 C, -18 C" },
      { name: "storage", label: "Storage Requirement", type: "select", options: ["Reefer Vehicle", "Cold Storage Warehouse", "In-transit only"] },
      { name: "shipmentDate", label: "Shipment Date", type: "date" },
    ],
  },
  "custom-clearance": {
    originLabel: "Port / Airport",
    destinationLabel: "Destination Country",
    originPlaceholder: "e.g. Chennai Port, India",
    destinationPlaceholder: "e.g. Qatar",
    cargoTypeLabel: "Cargo Type",
    extras: [
      { name: "direction", label: "Import / Export", type: "select", required: true, options: ["Import", "Export"] },
      { name: "port", label: "Port / Airport", type: "text", placeholder: "e.g. Chennai Port, India" },
      { name: "cargoType", label: "Cargo Type", type: "text", placeholder: "e.g. Furniture, Auto parts" },
      { name: "countryOfOrigin", label: "Country of Origin", type: "text", placeholder: "e.g. India" },
      { name: "destCountry", label: "Destination Country", type: "text", placeholder: "e.g. Qatar" },
      { name: "docRequirements", label: "Documentation Requirements", type: "textarea", placeholder: "e.g. Bill of Lading, Certificate of Origin, etc." },
    ],
  },
  "air-charter-services": {
    originLabel: "Origin",
    destinationLabel: "Destination",
    originPlaceholder: "e.g. Delhi, India",
    destinationPlaceholder: "e.g. Riyadh, Saudi Arabia",
    cargoTypeLabel: "Cargo Type",
    extras: [
      { name: "cargoType", label: "Cargo Type", type: "text", placeholder: "e.g. Oversized machinery, Urgent spares" },
      { name: "weight", label: "Cargo Weight", type: "text", placeholder: "e.g. 5,000 kg" },
      { name: "dimensions", label: "Cargo Dimensions", type: "text", placeholder: "e.g. 6m x 2.4m x 2.4m" },
      { name: "shipmentDate", label: "Required Date", type: "date" },
      { name: "urgency", label: "Urgency / Special Requirement", type: "textarea", placeholder: "Describe urgency or any special handling needs" },
    ],
  },
  "warehousing-distribution": {
    originLabel: "Storage Location",
    destinationLabel: "Distribution Destination",
    originPlaceholder: "e.g. Warehouse, Bhiwandi",
    destinationPlaceholder: "e.g. Multiple retail outlets, Mumbai",
    cargoTypeLabel: "Product Type",
    extras: [
      { name: "storageLocation", label: "Storage Location", type: "text", placeholder: "e.g. Warehouse, Bhiwandi" },
      { name: "productType", label: "Product Type", type: "text", placeholder: "e.g. Electronics, FMCG" },
      { name: "storageCapacity", label: "Required Storage Capacity", type: "text", placeholder: "e.g. 5,000 sq ft" },
      { name: "quantity", label: "Approximate Quantity", type: "text", placeholder: "e.g. 1,200 units" },
      { name: "duration", label: "Storage Duration", type: "text", placeholder: "e.g. 3 months" },
      { name: "distribution", label: "Distribution Requirement", type: "textarea", placeholder: "Describe your distribution needs" },
    ],
  },
  "courier-services": {
    originLabel: "Pickup Address",
    destinationLabel: "Delivery Address",
    originPlaceholder: "e.g. Sector 44, Gurugram",
    destinationPlaceholder: "e.g. Bandra, Mumbai",
    cargoTypeLabel: "Document / Parcel",
    extras: [
      { name: "pickupAddress", label: "Pickup Address", type: "text", placeholder: "e.g. Sector 44, Gurugram" },
      { name: "deliveryAddress", label: "Delivery Address", type: "text", placeholder: "e.g. Bandra, Mumbai" },
      { name: "cargoType", label: "Document / Parcel", type: "select", options: ["Document", "Small Parcel", "Large Parcel", "Fragile Item"] },
      { name: "weight", label: "Package Weight", type: "text", placeholder: "e.g. 12 kg" },
      { name: "numPackages", label: "Number of Packages", type: "text", placeholder: "e.g. 2" },
      { name: "shipmentDate", label: "Preferred Delivery Date", type: "date" },
    ],
  },
  "door-to-door-logistics": {
    originLabel: "Pickup Address",
    destinationLabel: "Final Delivery Address",
    originPlaceholder: "e.g. GIDC, Ahmedabad",
    destinationPlaceholder: "e.g. Riyadh, Saudi Arabia",
    cargoTypeLabel: "Cargo Type",
    extras: [
      { name: "pickupAddress", label: "Pickup Address", type: "text", placeholder: "e.g. GIDC, Ahmedabad" },
      { name: "deliveryAddress", label: "Final Delivery Address", type: "text", placeholder: "e.g. Riyadh, Saudi Arabia" },
      { name: "cargoType", label: "Cargo Type", type: "text", placeholder: "e.g. Textile, Machinery" },
      { name: "weight", label: "Weight", type: "text", placeholder: "e.g. 9,800 kg" },
      { name: "packageDetails", label: "Package / Container Details", type: "textarea", placeholder: "e.g. Pallets + crates" },
      { name: "shipmentDate", label: "Preferred Pickup Date", type: "date" },
    ],
  },
};

export function getServiceFormConfig(slug: string): ServiceFormConfig | null {
  return serviceFormConfigs[slug] ?? null;
}

export const defaultServiceFormConfig: ServiceFormConfig = {
  originLabel: "Origin / Pickup Location",
  destinationLabel: "Destination / Delivery Location",
  originPlaceholder: "e.g. Mumbai, India",
  destinationPlaceholder: "e.g. Dubai, UAE",
  cargoTypeLabel: "Shipment / Cargo Type",
  extras: defaultExtras,
};