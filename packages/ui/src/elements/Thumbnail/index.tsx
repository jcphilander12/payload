'use client'
import React from 'react'

import './index.scss'

const baseClass = 'thumbnail'

import type { SanitizedCollectionConfig } from 'payload'

import { File } from '../../graphics/File/index.js'
import { ShimmerEffect } from '../ShimmerEffect/index.js'

export type ThumbnailProps = {
  className?: string
  collectionSlug?: string
  doc?: Record<string, unknown>
  fileSrc?: string
  imageCacheTag?: string
  size?: 'expand' | 'large' | 'medium' | 'small'
  uploadConfig?: SanitizedCollectionConfig['upload']
}

const ThumbnailContext = React.createContext({
  className: '',
  filename: '',
  size: 'medium',
  src: '',
})

export const useThumbnailContext = () => React.useContext(ThumbnailContext)

export const Thumbnail: React.FC<ThumbnailProps> = (props) => {
  const { className = '', doc: { filename, mimeType } = {}, fileSrc, imageCacheTag, size } = props
  const [fileExists, setFileExists] = React.useState(undefined)
  const classNames = [baseClass, `${baseClass}--size-${size || 'medium'}`, className].join(' ')
  const [type, setType] = React.useState<'audio' | 'document' | 'image' | 'unknown' | 'video'>(
    undefined,
  )

  React.useEffect(() => {
    if (mimeType) setType(mimeType.split('/')[0])
  }, [mimeType])

  React.useEffect(() => {
    if (!fileSrc || !type) {
      setFileExists(false)
      return
    }
    if (type === 'image') {
      const img = new Image()
      img.src = fileSrc
      img.onload = () => setFileExists(true)
      img.onerror = () => setFileExists(false)
    } else if (type === 'video') {
      const video = document.createElement('video')
      video.src = fileSrc
      video.crossOrigin = 'anonymous'
      video.onloadeddata = () => setFileExists(true)
      video.onerror = () => setFileExists(false)
    } else {
      setFileExists(false)
    }
  }, [fileSrc, type])

  return (
    <div className={classNames}>
      {fileExists === undefined && <ShimmerEffect height="100%" />}
      {fileExists && type === 'image' && (
        <img
          alt={filename as string}
          src={`${fileSrc}${imageCacheTag ? `?${imageCacheTag}` : ''}`}
        />
      )}
      {fileExists && type === 'video' && (
        <video
          autoPlay={false}
          controls={false}
          muted={true}
          playsInline={true}
          src={`${fileSrc}${imageCacheTag ? `?${imageCacheTag}` : ''}`}
        />
      )}
      {fileExists === false && <File />}
    </div>
  )
}
