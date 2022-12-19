import FontStyles from "@fontsource/roboto/index.css";
import * as ComicFont from "@fontsource/comic-neue/index.css";
import * as Montserrat from "@fontsource/montserrat/index.css";
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css";
import clsx from 'clsx';
import { ThemeProvider, useTheme } from "./utils/theme-provider";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: FontStyles },
    { rel: "stylesheet", href: ComicFont },
    { rel: "stylesheet", href: Montserrat },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Seven Wonders",
  viewport: "width=device-width,initial-scale=1",
});

function App() {
  const [theme] = useTheme();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}
