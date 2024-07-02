import type { HTMLAttributes } from "@builder.io/qwik";

import {
  $,
  component$,
  useOnDocument,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

import { useGetUserPreferences } from "~/context/user-preferences";
import { clamp, lerp, random } from "~/utils/functions";

type Props = {
  class?: string | string[] | Record<string, boolean>;
  shouldBlink?: boolean;
  shouldFollowCursor?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default component$<Props>(
  ({
    shouldFollowCursor = false,
    shouldBlink = false,
    class: className,
    ...props
  }) => {
    const logoRef = useSignal<HTMLDivElement>();
    const userPrefences = useGetUserPreferences();

    useOnDocument(
      "mousemove",
      $((e) => {
        if (
          !shouldFollowCursor ||
          userPrefences.reducedMotion ||
          userPrefences.isTouchDevice
        ) {
          return;
        }

        const logo = logoRef.value;

        if (!logo) {
          return;
        }

        const logoRect = logo.getBoundingClientRect();
        const logoCenter = {
          x: logoRect.left + logoRect.width / 2,
          y: logoRect.top + logoRect.height / 2,
        };

        const cursorPosition = {
          x: e.clientX,
          y: e.clientY,
        };

        /** Distance between cursor and logo center */
        const distance = {
          x: cursorPosition.x - logoCenter.x,
          y: cursorPosition.y - logoCenter.y,
        };

        const RANGE = 745; // in px
        /** If the cursor is within a certain range of the logo */
        const isWithinRange =
          Math.abs(distance.x) < RANGE && Math.abs(distance.y) < RANGE;

        const leftEyePosition = {
          x: clamp(Math.abs(lerp(0, distance.x * 0.06, 0.5)), 0, 8),
          y: clamp(lerp(0, distance.y * 0.06, 0.5), -10, 10),
        };
        const rightEyePosition = {
          x: clamp(Math.abs(lerp(0, distance.x * 0.1, 0.5)), 0, 12),
          y: clamp(lerp(0, distance.y * 0.1, 0.5), -10, 10),
        };

        const leftEye = logo.querySelector<HTMLDivElement>("[data-left-eye]");
        const rightEye = logo.querySelector<HTMLDivElement>("[data-right-eye]");

        if (!leftEye || !rightEye) {
          return;
        }

        if (isWithinRange) {
          // Flip the logo if the cursor is on the left side of the logo
          const shouldFlip = distance.x < 0;
          logo.animate(
            {
              transform: `scaleX(${shouldFlip ? -1 : 1})`,
            },
            {
              duration: 300,
              fill: "forwards",
            },
          );

          // Move the eyes in the tangent of the angle of the cursor to the center of the logo
          leftEye.animate(
            {
              transform: `translate(${leftEyePosition.x}px, ${leftEyePosition.y}px)`,
            },
            {
              duration: 1_000,
              fill: "forwards",
            },
          );
          rightEye.animate(
            {
              transform: `translate(${rightEyePosition.x}px, ${rightEyePosition.y}px)`,
            },
            {
              duration: 1_000,
              fill: "forwards",
            },
          );
        } else {
          // Reset the logo to its original position
          logo.animate(
            {
              transform: "translate(0, 0)",
            },
            {
              duration: 300,
              fill: "forwards",
            },
          );

          // Reset the eyes to their original position
          leftEye.animate(
            {
              transform: "translate(0, 0)",
            },
            {
              duration: 6_000,
              fill: "forwards",
            },
          );
          rightEye.animate(
            {
              transform: "translate(0, 0)",
            },
            {
              duration: 6_000,
              fill: "forwards",
            },
          );
        }
      }),
    );

    // Intervals can only be set eagerly on the client, so we use `useVisibleTask$` to run this task only once the logo is visible.
     
    useVisibleTask$(({ cleanup }) => {
      if (!shouldBlink) {
        return;
      }

      const logo = logoRef.value;
      if (!logo) {
        return;
      }

      const leftEye = logo.querySelector<HTMLDivElement>("[data-left-eye]");
      const rightEye = logo.querySelector<HTMLDivElement>("[data-right-eye]");
      if (!leftEye || !rightEye) {
        return;
      }

      // Randomly blink the eyes
      const interval = setInterval(
        () => {
          (async () => {
            const blinkDuration = random(90, 150);
            const blinkAmount = random(1, 4);

            for (let index = 0; index < blinkAmount; index++) {
              leftEye.textContent = "-";
              rightEye.textContent = "-";
              await new Promise((resolve) => {
                setTimeout(resolve, blinkDuration);
              });
              leftEye.textContent = "•";
              rightEye.textContent = "•";
              await new Promise((resolve) => {
                setTimeout(resolve, blinkDuration);
              });
            }
          })();
        },
        random(3_000, 7_000),
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
          "logo pointer-events-none relative flex size-8 origin-center select-none",
          className,
        ]}
      >
        <div class="absolute h-full w-full" aria-hidden data-body>
          [
        </div>
        <div class="absolute left-1/4 w-fit" aria-hidden data-left-eye>
          •
        </div>
        <div class="absolute left-1/2 w-fit" aria-hidden data-right-eye>
          •
        </div>
      </div>
    );
  },
);
