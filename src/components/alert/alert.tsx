import type { Component } from "@builder.io/qwik";

import { component$, Slot } from "@builder.io/qwik";

type Props = {
  severity: "info" | "warning" | "error" | "success";
  title?: string;
};

const classes = {
  info: "bg-blue-100 text-blue-900 border-blue-200",
  warning: "bg-yellow-100 text-orange-900 border-orange-200",
  error: "bg-red-100 text-red-900 border-red-200",
  success: "bg-green-100 text-green-900 border-green-200",
} as const;

const icons = import.meta.glob<Component>("/src/media/icons/*.svg", {
  import: "default",
  query: "?jsx",
  eager: true,
});

export default component$<Props>(({ severity, title }) => {
  const iconPath = `/src/media/icons/${severity}.svg`;
  const Icon = icons[iconPath];

  return (
    <article
      class={[
        "not-prose grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-4 rounded-lg border p-4",
        classes[severity],
      ]}
    >
      <aside
        class={[
          "col-start-1",
          {
            "text-orange-500": severity === "warning",
          },
          {
            "text-red-500": severity === "error",
          },
          {
            "text-green-500": severity === "success",
          },
          {
            "text-blue-500": severity === "info",
          },
        ]}
      >
        <Icon />
      </aside>
      {Boolean(title) && (
        <header class="!leading-0 col-start-2 h-auto text-xl font-bold">
          {title}
        </header>
      )}
      <div class="col-start-2 [&_a]:font-semibold [&_a]:underline">
        <Slot />
      </div>
    </article>
  );
});
