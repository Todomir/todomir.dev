import {
  component$,
  createContextId,
  Slot,
  useContext,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

type UserPreferences = {
  isTouchDevice: boolean;
  prefersColorScheme: "light" | "dark" | "no-preference";
  prefersContrast: "no-preference" | "high" | "low";
  reducedMotion: boolean;
};

const userPreferencesContext =
  createContextId<UserPreferences>("USER_PREFERENCES");

export const UserPreferencesProvider = component$(() => {
  const userPreferences = useStore<UserPreferences>(
    {
      reducedMotion: false,
      prefersColorScheme: "light",
      prefersContrast: "no-preference",
      isTouchDevice: false,
    },
    { deep: true },
  );

   
  useVisibleTask$(({ cleanup }) => {
    const abortController = new AbortController();

    userPreferences.isTouchDevice = "ontouchstart" in window;

    const prefersColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const prefersContrast = window.matchMedia("(prefers-contrast: high)");

    prefersContrast.addEventListener(
      "change",
      () => {
        userPreferences.prefersContrast =
          prefersContrast.matches ? "high" : "low";
      },
      { signal: abortController.signal },
    );

    prefersReducedMotion.addEventListener(
      "change",
      () => {
        userPreferences.reducedMotion = prefersReducedMotion.matches;
      },
      { signal: abortController.signal },
    );

    userPreferences.prefersColorScheme =
      prefersColorScheme.matches ? "dark" : "light";
    userPreferences.reducedMotion = prefersReducedMotion.matches;
    userPreferences.prefersContrast = prefersContrast.matches ? "high" : "low";

    cleanup(() => {
      abortController.abort();
    });
  });

  useContextProvider(userPreferencesContext, userPreferences);

  return <Slot />;
});

export function useGetUserPreferences() {
  const userPreferences = useContext(userPreferencesContext);
  return userPreferences;
}
