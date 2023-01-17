import Image from 'next/image'
import loadingSun from '../images/loadingSun.gif'

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
        // fill
        layout='fill'
      />
    </div>
  )
}
