interface OutputMetadata {
  /** Number of bands e.g. 3 for sRGB, 4 for CMYK */
  channels: number;
  /** Number of pixels per inch */
  density: number;
  /** Name of pixel depth format */
  depth: string;
  /** Format of the generated image */
  format: string;

  /** Presence of an alpha transparency channel */
  hasAlpha: boolean;
  /** Presence of an embedded ICC profile */
  hasProfile: boolean;
  /** Height of the image */
  height: number;
  /** Indicating whether the image is interlaced using a progressive scan */
  isProgressive: boolean;
  /** Name of colour space interpretation */
  space: string;
  /** URL of the generated image */
  src: string;
  /** Width of the image */
  width: number;
}

declare module "*&as=metadata&imagetools-gallery" {
  const outputs: OutputMetadata[];
  export default outputs;
}

declare module "*&as=metadata&imagetools" {
  const outputs: OutputMetadata;
  export default outputs;
}

declare module "*&imagetools-gallery" {
  const outputs: string[];
  export default outputs;
}

declare module "*&imagetools" {
  const outputs: string;
  export default outputs;
}
