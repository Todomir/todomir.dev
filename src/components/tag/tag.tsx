import { component$, Slot } from "@builder.io/qwik";

type Props = {
  active?: boolean;
  class?: string | string[] | Record<string, boolean>;
};

export default component$<Props>(({ active, class: className }) => {
  return (
    <div
      class={[
        "leading-0 inline-flex w-max rounded-xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50 px-3 py-1 text-xs text-zinc-950 shadow-sm @md:text-sm",
        {
          "border-zinc-950 bg-zinc-950 text-white": active,
        },
        className,
      ]}
    >
      <Slot />
    </div>
  );
});
