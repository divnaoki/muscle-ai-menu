import Image from "next/image";

interface MdxImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function MdxImage({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: MdxImageProps) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full rounded-lg border border-gray-200"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
