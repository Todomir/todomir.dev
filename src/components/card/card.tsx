import { component$, Slot } from "@builder.io/qwik";

type Props = {
  class: string;
};

export default component$((props: Props) => {
  return (
    <article
      class={[
        "rounded-xl @container/card @sm/card:p-1 @md/card:p-3",
        props.class,
      ]}
    >
      <div class="flex flex-col gap-10 @md/card:gap-12 @lg/card:flex-row">
        <div class="flex w-full flex-col">
          <Slot name="aside" />
        </div>
        <header class="my-auto flex w-full flex-col gap-3 pb-6">
          <Slot name="superheader" />
          <div class="flex w-full justify-between gap-6">
            <Slot name="title" />
          </div>
          <Slot name="description" />
        </header>
      </div>
    </article>
  );
});
