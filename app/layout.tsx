import { Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import { SITE } from "../config";
import AppFooter from "../components/Footer";
import Logo from "../components/Logo";

export const metadata = {
  metadataBase: new URL(SITE.url),
};

const navbar = <Navbar logo={<Logo />} projectLink={SITE.github} chatLink={SITE.discord} />;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase={`${SITE.github}/docs/tree/main`}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          feedback={{ link: SITE.github }}
          footer={<AppFooter />}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
