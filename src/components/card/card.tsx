import { Slot, component$ } from "@builder.io/qwik";

interface Props {
  class: string;
}

export default component$((props: Props) => {
  return (
    <article class={["rounded-xl p-8 md:p-10", props.class]}>
      <div class="flex flex-col gap-10 md:flex-row md:gap-12">
        <div class="flex w-full flex-col">
          <Slot name="aside" />
        </div>
        <header class="my-auto flex w-full flex-col gap-3 pb-6">
          <Slot name="superheader" />
          <div class="flex w-full justify-between gap-4">
            <Slot name="title" />
          </div>
          <Slot name="description" />
        </header>
      </div>
    </article>
  );
});
