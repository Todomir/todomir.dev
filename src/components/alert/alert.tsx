import { component$, Slot } from "@builder.io/qwik";

type Props = {
  severity: "info" | "warning" | "error" | "success";
};

const classes = {
  info: "bg-blue-100 text-blue-900 border-blue-200",
  warning: "bg-yellow-100 text-orange-900 border-orange-200",
  error: "bg-red-100 text-red-900 border-red-200",
  success: "bg-green-100 text-green-900 border-green-200",
} as const;

export default component$<Props>(({ severity }) => {
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
        <Slot name="icon" />
      </aside>
      <header class="!leading-0 col-start-2 h-auto text-xl font-bold">
        <Slot name="title" />
      </header>
      <div class="col-start-2 [&_a]:font-semibold [&_a]:underline">
        <Slot />
      </div>
    </article>
  );
});
