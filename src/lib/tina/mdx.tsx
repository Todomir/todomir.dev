import { Component, component$ } from "@builder.io/qwik";

import Code from "~/components/code/code";

// Define TypeScript types for the nodes based on the AST structure
type MarkdownNode = {
  type: string;
  children?: MarkdownNode[];
  name?: string;
  text?: string;
  url?: string;
  value?: string;
  lang?: string;
  title?: string | null;
  alt?: string;
  caption?: string;
  props?: Record<string, any>;
};

// Define a generic Markdown component that decides how to render each node
export const MarkdownComponent = component$<{
  node: MarkdownNode;
  components: Record<string, Component>;
}>((props) => {
  const { node, components } = props;

  switch (node.type) {
    case "root":
      return (
        <div>
          {node.children?.map((child, index) => (
            <MarkdownComponent
              key={index}
              node={child}
              components={components}
            />
          ))}
        </div>
      );
    case "p":
      return (
        <p>
          {node.children?.map((child, index) => (
            <MarkdownComponent
              key={index}
              node={child}
              components={components}
            />
          ))}
        </p>
      );
    case "text":
      return <>{node.text}</>;
    case "a":
      return (
        <a
          href={node.url}
          title={node.title ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.children?.map((child, index) => (
            <MarkdownComponent
              key={index}
              node={child}
              components={components}
            />
          ))}
        </a>
      );
    case "code_block":
      return <Code content={node.value || ""} lang={node.lang} />;
    case "img":
      return <img src={node.url} alt={node.alt} title={node.caption} />;
    case "blockquote":
      return (
        <blockquote>
          {node.children?.map((child, index) => (
            <MarkdownComponent
              key={index}
              node={child}
              components={components}
            />
          ))}
        </blockquote>
      );
    case "ul":
      return (
        <ul>
          {node.children?.map((child, index) => (
            <MarkdownComponent
              key={index}
              node={child}
              components={components}
            />
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {node.children?.map((child, index) => (
            <MarkdownComponent
              key={index}
              node={child}
              components={components}
            />
          ))}
        </ol>
      );
    case "li":
      return (
        <li>
          {node.children?.map((child, index) => (
            <MarkdownComponent
              key={index}
              node={child}
              components={components}
            />
          ))}
        </li>
      );
    case "hr":
      return <hr />;
    // Handling headings (h1-h6)
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      const Heading = node.type;
      return (
        <Heading>
          {node.children?.map((child, index) => (
            <MarkdownComponent
              key={index}
              node={child}
              components={components}
            />
          ))}
        </Heading>
      );
    case "mdxJsxFlowElement":
      const DynamicComponent =
        components[node.name as keyof typeof components] || DefaultComponent;

      return (
        <DynamicComponent {...((node.props as any) || {})}>
          {node.children?.map((child, index) => (
            <MarkdownComponent
              components={components}
              key={index}
              node={child}
            />
          ))}
          <MarkdownComponent
            components={components}
            key={node.name}
            node={node.props?.children}
          />
        </DynamicComponent>
      );

    default:
      return null; // Or a placeholder for unsupported node types
  }
});

const DefaultComponent = component$(() => {
  return null;
});
