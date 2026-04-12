import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents } from "../../mdx-components";
import { SITE } from "../../config";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props: { params: Promise<{ mdxPath?: string[] }> }) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  const { title: pageTitle, description: pageDescription, ...restMetadata } = metadata;
  return {
    title: pageTitle
      ? { template: "%s - OpenNext", absolute: pageTitle }
      : { template: "%s - OpenNext", default: "OpenNext" },
    description: pageDescription ?? SITE.description,
    twitter: {
      card: "summary_large_image",
    },
    icons: { icon: "/favicon-light.png" },
    ...restMetadata,
  };
}

const Wrapper = useMDXComponents({}).wrapper;

export default async function Page(props: { params: Promise<{ mdxPath?: string[] }> }) {
  const params = await props.params;
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(params.mdxPath);
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
