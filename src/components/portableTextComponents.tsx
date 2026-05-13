import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/sanity-image";

export const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
      if (!value?.asset) return null;
      const imageUrl = getOptimizedImageUrl(value, 1200);
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Project image"}
            width={1200}
            height={800}
            className="rounded-lg w-full"
          />
        </div>
      );
    },
    video: ({
      value,
    }: {
      value: {
        videoFile?: { asset?: { url?: string } };
        caption?: string;
        posterImage?: { asset?: { _ref?: string } };
      };
    }) => {
      if (!value?.videoFile?.asset?.url) return null;

      const posterUrl = value.posterImage
        ? getOptimizedImageUrl(value.posterImage, 1920)
        : undefined;

      return (
        <div className="my-8">
          <video
            controls
            className="w-full rounded-lg"
            poster={posterUrl}
            preload="metadata"
          >
            <source src={value.videoFile.asset.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {value.caption && (
            <p className="text-white/60 text-sm mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-white/80 text-lg leading-relaxed mb-4">{children}</p>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold text-white mt-12 mb-6">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-outside pl-6 my-4 space-y-2 text-white/80 text-lg leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-outside pl-6 my-4 space-y-2 text-white/80 text-lg leading-relaxed">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="pl-1">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="pl-1">{children}</li>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          {...(isExternal && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
          className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};
