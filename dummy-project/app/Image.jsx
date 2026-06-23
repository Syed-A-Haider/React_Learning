import Image from "next/image";

function MyImage({ src, alt, width, height }) {
  return (
    <Image
      className="my-image"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

export default MyImage;
