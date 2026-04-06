import './Avatar.css'

/** 1 = image fills the circle edge-to-edge (object-fit: cover, no inner zoom-out). */
const DEFAULT_IMAGE_SCALE = 1
const DEFAULT_OBJECT_POSITION = 'center 38%'

/**
 * Circular image avatar with CSS-only portrait heuristics (not true face centering).
 * Optional BOARD_MEMBERS fields: avatarObjectPosition, photoScale, photoOffsetX, photoOffsetY.
 */
export default function Avatar({
  src,
  alt = '',
  size = 112,
  variant = 'standalone',
  objectPosition = DEFAULT_OBJECT_POSITION,
  imageScale,
  translateX = 0,
  translateY = 0,
  interactive = false,
  className = '',
}) {
  const resolvedScale = imageScale != null ? imageScale : DEFAULT_IMAGE_SCALE
  const isEmbedded = variant === 'embedded'

  const style = {
    '--avatar-object-position': objectPosition,
    '--avatar-image-scale': String(resolvedScale),
    '--avatar-tx': `${translateX ?? 0}px`,
    '--avatar-ty': `${translateY ?? 0}px`,
  }
  if (!isEmbedded) {
    style['--avatar-size'] = typeof size === 'number' ? `${size}px` : size
  }

  const rootClass = [
    'avatar',
    isEmbedded ? 'avatar--embedded' : '',
    interactive ? 'avatar--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass} style={style}>
      <img src={src} alt={alt} className="avatar__img" decoding="async" />
    </div>
  )
}
