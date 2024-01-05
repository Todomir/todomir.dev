import type { HTMLAttributes } from "@builder.io/qwik";
import { $, component$, useOnDocument, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { lerp, random } from "~/utils/functions";

type Props = {
  shouldFollowCursor?: boolean;
  shouldBlink?: boolean;
  class?: string | string[] | Record<string, boolean>;
} & HTMLAttributes<HTMLDivElement>;

export default component$<Props>(({ shouldFollowCursor = false, shouldBlink = false, class: className, ...props }) => {
  const logoRef = useSignal<HTMLDivElement>();

  useOnDocument(
    "mousemove",
    $((e) => {
      if (!shouldFollowCursor) return;
      const logo = logoRef.value;

      if (!logo) return;

      // Get the distance between the cursor and the center of the logo in a radius around the center of the logo
      const distance = {
        x: e.pageX - logo.offsetLeft - logo.clientWidth / 2,
        y: e.pageY - logo.offsetTop - logo.clientHeight / 2,
      };

      // Flip the logo if the cursor is on the left side of the logo
      const shouldFlip = distance.x < 0;
      logo.animate({ transform: `scaleX(${shouldFlip ? -1 : 1})` }, { duration: 300, fill: "forwards" });

      const leftEye = logo.querySelector<HTMLDivElement>("[data-left-eye]");
      const rightEye = logo.querySelector<HTMLDivElement>("[data-right-eye]");

      const generateTranslatePosition = (speed: number) => {
        return {
          x: Math.abs(lerp(0, distance.x * speed, 0.5)),
          y: lerp(0, distance.y * speed, 0.5),
        };
      };

      if (!leftEye || !rightEye) return;
      // Move the eyes in the tangent of the angle of the cursor to the center of the logo

      const leftEyePosition = generateTranslatePosition(0.06);
      const rightEyePosition = generateTranslatePosition(0.1);

      leftEye.animate(
        { transform: `translate(${leftEyePosition.x}px, ${leftEyePosition.y}px)` },
        { duration: 1000, fill: "forwards" },
      );
      rightEye.animate(
        { transform: `translate(${rightEyePosition.x}px, ${rightEyePosition.y}px)` },
        { duration: 1000, fill: "forwards" },
      );
    }),
  );

  // Intervals can only be set eagerly on the client, so we use `useVisibleTask$` to run this task only once the logo is visible.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (!shouldBlink) return;

    const logo = logoRef.value;
    if (!logo) return;

    const leftEye = logo.querySelector<HTMLDivElement>("[data-left-eye]");
    const rightEye = logo.querySelector<HTMLDivElement>("[data-right-eye]");
    if (!leftEye || !rightEye) return;

    // Randomly blink the eyes
    const interval = setInterval(
      async () => {
        const blinkDuration = random(90, 150);
        const blinkAmount = random(1, 3);

        for (let i = 0; i < blinkAmount; i++) {
          leftEye.textContent = "-";
          rightEye.textContent = "-";
          await new Promise((resolve) => setTimeout(resolve, blinkDuration));
          leftEye.textContent = "•";
          rightEye.textContent = "•";
          await new Promise((resolve) => setTimeout(resolve, blinkDuration));
        }
      },
      random(1000, 5000),
    );

    cleanup(() => clearInterval(interval));
  });

  return (
    <div
      {...props}
      ref={logoRef}
      role="img"
      aria-label="todomir.dev logo"
      class={[
        "logo group flex w-fit origin-center select-none before:pointer-events-none before:absolute before:inset-0 before:left-1/2 before:top-1/2 before:block before:h-full before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:border-red-500 before:p-64",
        className,
      ]}
    >
      <div class="relative inline-block w-fit" aria-hidden data-body>
        [
      </div>
      <div class="relative inline-block w-fit" aria-hidden data-left-eye>
        •
      </div>
      <div class="relative inline-block w-fit" aria-hidden data-right-eye>
        •
      </div>
    </div>
  );
});
