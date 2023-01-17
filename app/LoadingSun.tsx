import Image from 'next/image'
import loadingSun from '../images/loadingSun.gif'

function generateImageSizes () {
  const args = Array.from(arguments)
  if (args.length === 0) return ''
  const result = []

}

export default function LoadingSun () {

  return (
    <div
    className='IMAGE_HERE'
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
        sizes='(max-width: 768px) 100vw,
          ()
        '
        fill
      />
    </div>
  )
}
