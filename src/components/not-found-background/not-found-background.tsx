import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Application } from "@splinetool/runtime";

type Props = {
  class?: string | string[] | Record<string, boolean>;
};

export default component$<Props>(({ class: className }) => {
  const glitchRef = useSignal<HTMLCanvasElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const canvas = glitchRef.value;
    if (!canvas) return;

    const app = new Application(canvas);
    await app.load(
      "https://prod.spline.design/m-IFZdp13kEONOXi/scene.splinecode",
    );

    canvas.style.opacity = "0";
  });

  return (
    <canvas
      aria-hidden="true"
      ref={glitchRef}
      style={{ opacity: 0, willChange: "opacity" }}
      class={[className]}
    ></canvas>
  );
});
