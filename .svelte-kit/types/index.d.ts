type DynamicRoutes = {
	"/books/[slug]": { slug: string }
};

type Layouts = {
	"/": { slug?: string };
	"/books": { slug?: string };
	"/books/[slug]": { slug: string }
};

export type RouteId = "/" | "/books" | "/books/[slug]";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/books" | `/books/${string}` & {};

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/robots.txt";