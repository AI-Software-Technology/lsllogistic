import { Link } from "react-router-dom";

interface LogoProps {
  dark?: boolean;
  onNavigate?: () => void;
}

const LOGO_URL =
  "https://storage.helloreaddy.io/project_files/c8457979-6bf1-4da6-b4d8-26a8dee913d7/8c67e4d3-df96-45a6-9d26-c2e12178fee6_compressed_WhatsApp-Image-2026-09-03-at-11.58.04-AM.webp";

export default function Logo({ onNavigate }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className="flex items-center whitespace-nowrap"
      aria-label="LSL Logistics Network — Home"
    >
      <img
        src={LOGO_URL}
        alt="LSL Logistics Network logo"
        className="h-11 w-auto rounded-md bg-white object-contain px-2 py-1"
        width="176"
        height="44"
      />
    </Link>
  );
}