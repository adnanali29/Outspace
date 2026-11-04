import Image from "next/image";

// The official logo, shown in solid white to sit on the site's black areas.
export function Logo({
  className,
  priority = false,
}: {
  className: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/outpace-academy-logo.png"
      alt="Outpace Academy"
      width={1024}
      height={300}
      priority={priority}
      className={`w-auto brightness-0 invert ${className}`}
    />
  );
}
