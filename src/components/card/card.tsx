import { Slot, component$ } from "@builder.io/qwik";

interface Props {
  class: string;
}

export default component$((props: Props) => {
  return (
    <article class={["@container/card @sm/card:p-1 @md/card:p-3 rounded-xl", props.class]}>
      <div class="@lg/card:flex-row @md/card:gap-12 flex flex-col gap-10">
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
