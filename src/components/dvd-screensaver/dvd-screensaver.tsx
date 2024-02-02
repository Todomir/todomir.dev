import type { QRL } from "@builder.io/qwik";

import {
  $,
  component$,
  Slot,
  useOnWindow,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

type State = {
  movement: {
    x: number;
    y: number;
  };
  position: {
    x: number;
    y: number;
  };
};
type Props = {
  class?: string | string[] | Record<string, boolean>;
  onCollide$?: QRL<(state: State) => void>;
  speedMultiplier?: number;
};

function getRandomMovementDirection() {
  return Math.random() < 0.5 ? -1 : 1;
}

export default component$<Props>(
  ({ class: className, speedMultiplier = 0.4, onCollide$ }) => {
    const dvdRef = useSignal<HTMLDivElement>();
    const state = useStore<State>({
      position: {
        x: 0,
        y: 0,
      },
      movement: {
        x: getRandomMovementDirection(),
        y: getRandomMovementDirection(),
      },
    });

    useOnWindow(
      "resize",
      $(() => {
        const dvd = dvdRef.value;
        if (!dvd) return;
        state.position.x = parent.innerWidth / 2 - dvd.clientWidth / 2;
        state.position.y = parent.innerHeight / 2 - dvd.clientHeight / 2;
      }),
    );

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
      const dvd = dvdRef.value;
      if (!dvd) return;

      const parent = dvd.parentElement ?? document.body;
      const parentRect = parent.getBoundingClientRect();
      const dvdRect = dvd.getBoundingClientRect();

      state.position.x = parentRect.width / 2 - dvdRect.width / 2;
      state.position.y = parentRect.height / 2 - dvdRect.height / 2;

      function updatePosition() {
        if (!dvd) return;
        state.position.x += state.movement.x * speedMultiplier;
        state.position.y += state.movement.y * speedMultiplier;
      }

      function detectCollision() {
        if (!dvd) return;
        const rect = dvd.getBoundingClientRect();

        if (state.position.x + rect.width >= parentRect.width) {
          state.movement.x = -state.movement.x;
          void onCollide$?.(state);
        } else if (state.position.x <= 0) {
          state.movement.x = -state.movement.x;
          void onCollide$?.(state);
        }

        if (state.position.y + rect.height >= parentRect.height) {
          state.movement.y = -state.movement.y;
          void onCollide$?.(state);
        } else if (state.position.y <= 0) {
          state.movement.y = -state.movement.y;
          void onCollide$?.(state);
        }
      }

      function loop() {
        updatePosition();
        detectCollision();
        requestAnimationFrame(loop);
      }

      dvd.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1_000,
        fill: "forwards",
      });
      loop();
    });

    return (
      <div class="dvd__wrapper relative col-span-full h-full w-full">
        <div
          style={{
            willChange: "transform",
            transform: `translate(${state.position.x}px, ${state.position.y}px)`,
          }}
          ref={dvdRef}
          class={["dvd opacity-0", className]}
        >
          <Slot />
        </div>
      </div>
    );
  },
);
