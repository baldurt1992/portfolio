function replaceExtension(path: string, suffix: string) {
  return path.replace(/\.(png|jpe?g|webp)$/i, `${suffix}.webp`)
}

export function projectImageSrcset(path: string | undefined) {
  if (!path) return undefined

  return [640, 960, 1280]
    .map((width) => `${replaceExtension(path, `-${width}`)} ${width}w`)
    .join(', ')
}

export function portraitImageSrcset(path: string | undefined) {
  if (!path) return undefined

  return [
    `${replaceExtension(path, '-224')} 224w`,
    `${replaceExtension(path, '-448')} 448w`,
    `${path} 640w`
  ].join(', ')
}

export function avatarImageSrcset(path: string | undefined) {
  if (!path) return undefined

  return [
    `${replaceExtension(path, '-112')} 112w`,
    `${replaceExtension(path, '-224')} 224w`,
    `${path} 256w`
  ].join(', ')
}
