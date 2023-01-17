import Image from 'next/image';
import loadingSun from '../images/loadingSun.gif';

type GenerateImageSizesInputArg = [string, number, number];


// input: scaler, pixels, viewUnits
function generateImageSizes(...args : Array<GenerateImageSizesInputArg>) {
  if (args.length === 0) return '';
  const result: Array<string> = [];
  return result;
}

export default function LoadingSun() {
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
        sizes="(max-width: 768px) 100vw,
          ()
        "
        fill
      />
    </div>
  );
}
