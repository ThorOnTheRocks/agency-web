import { PortableText as PortableTextReact } from '@portabletext/react';

const components = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
        {children}
      </h2>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-muted-foreground leading-relaxed">
        {children}
      </p>
    ),
  },
  // You can add a custom code block component here later
};

export function PortableText({ value }: { value: any }) {
  return <PortableTextReact value={value} components={components} />;
}
