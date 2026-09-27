import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { ComposeProvider } from "@/components/compose-context";
import { ComposeDialog } from "@/components/compose-dialog";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import appCss from "../styles.css?url";

const APP_NAME = "Murmur";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "An anonymous room for the things you cannot say out loud. Leave a problem. Leave a reply. No names.",
      },
      { name: "theme-color", content: "#0b0c0e" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootDocument,
  notFoundComponent: RootNotFound,
});

function RootDocument() {
  return (
    <html lang="en" className="dark antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <ComposeProvider>
            <div className="flex min-h-dvh flex-col">
              <SiteHeader />
              <Outlet />
              <SiteFooter />
            </div>
            <ComposeDialog />
            <Toaster
              theme="dark"
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "var(--color-card)",
                  color: "var(--color-foreground)",
                  border: "1px solid var(--color-border)",
                },
              }}
            />
          </ComposeProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <p className="text-xs tracking-widest text-muted uppercase">Quiet</p>
      <h1 className="mt-3 font-serif text-3xl tracking-tight">
        That page is not in the room.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        It may have been a mistyped link. The feed is still here.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex h-11 w-fit items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Back to Murmur
      </a>
    </main>
  );
}
