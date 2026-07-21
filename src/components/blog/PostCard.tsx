import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/supabase/types";

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass group flex flex-col overflow-hidden rounded-df-lg transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-df-primary-100 to-df-secondary-300/50">
        {post.cover_image_url && (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          {post.categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="rounded-df-full bg-df-primary-100 px-2.5 py-1 text-df-primary-700"
            >
              {category}
            </span>
          ))}
          {post.published_at && (
            <span className="text-df-ink-400">
              {DATE_FORMATTER.format(new Date(post.published_at))}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-df-ink-900">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-df-ink-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
          {post.excerpt}
        </p>
        <span className="mt-auto pt-4 text-sm font-semibold text-df-primary-700">
          Ler mais →
        </span>
      </div>
    </Link>
  );
}
