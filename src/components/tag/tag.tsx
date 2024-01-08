import { Slot, component$ } from "@builder.io/qwik";

type Props = {
  active?: boolean;
  class?: string | string[] | Record<string, boolean>;
};

export default component$<Props>(({ active, class: className }) => {
  return (
    <div
      class={[
        "inline-flex leading-0 @md:text-sm w-max rounded-xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50 px-3 py-1 text-xs text-zinc-950 shadow-sm",
        { "bg-zinc-950 text-white border-zinc-950": active },
        className,
      ]}
    >
      <Slot />
    </div>
  );
});
