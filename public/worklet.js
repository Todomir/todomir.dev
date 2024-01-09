(async function () {
  if (!("paintWorklet" in CSS)) {
    await import("https://unpkg.com/css-paint-polyfill");
  }

  CSS.paintWorklet.addModule("/border.js");
})();
