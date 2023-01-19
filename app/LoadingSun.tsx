import Image from 'next/image';
import loadingSun from '../images/loadingSun.gif';
import mainConfig from './myConfig/mainConfig.js';

const { loadingSunDefaults } = mainConfig;

interface ComponentInputProps {
  defaultSize: DefaultSize,
  breaker: CssBreakPointMeasure,
  rest: Array<GenerateImageSizesInputRest>
}

function generateImageSizes(defaultSize: DefaultSize, breaker: CssBreakPointMeasure, ...args : Array<GenerateImageSizesInputRest>): string {
  if (args.length === 0) return '';
  const result: Array<string> = [];
  args.forEach((arg) => {
    result.push(`(${breaker}: ${arg[0]}) ${arg[1]}vw`);
  });
  result.push(`${defaultSize}vw`);
  return result.join(', ');
}

export default function LoadingSun({
  defaultSize = loadingSunDefaults.defaultSize,
  breaker = loadingSunDefaults.breaker,
  rest = loadingSunDefaults.rest,
} : ComponentInputProps) {
  return (
    <div
      className="IMAGE_HERE"
      style={{
        minHeight: '100%',
        minWidth: 'auto',
        position: 'relative',
        aspectRatio: '1 / 1',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <Image
        src={loadingSun}
        alt="loading sun gif"
        sizes={generateImageSizes(defaultSize, breaker, ...rest)}
        fill
      />
    </div>
  );
}
