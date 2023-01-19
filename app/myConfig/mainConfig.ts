interface LoadingSunDefaults {
  defaultSize: number,
  breaker: CssBreakPointMeasure,
  rest: Array<GenerateImageSizesInputRest>
}

interface MainConfig {
  loadingSunDefaults: LoadingSunDefaults,
}

const mainConfig: MainConfig = {
  loadingSunDefaults: {
    defaultSize: 33, // NTS: better name might be fallback
    breaker: 'max-width',
    rest: [
      [786, 100],
      [1200, 50],
    ],
  },
};

export default mainConfig;
