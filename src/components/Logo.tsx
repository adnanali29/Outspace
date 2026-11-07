import Image from "next/image";

// The official logo in its own colours. Place it on white backgrounds.
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
      className={`w-auto ${className}`}
    />
  );
}
