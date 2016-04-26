import React from 'react'
import cn from 'classnames'
import './ContentBox.css'

export function ContentBox ({ className, children, ...props }) {
  return (
    <div
      className={cn('.ContentBox', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContentBoxHeader ({ text, sourceLink, docsLink, ...props }) {
  return (
    <h1
      className={'.Header'}
      {...props}
    >
      {text}

      <small className={'.Small'}>
        <a
          className={'.Link'}
          href={sourceLink}
        >
          Source
        </a>
        <span> | </span>
        <a
          className={'.Link'}
          href={docsLink}
        >
          Docs
        </a>
      </small>
    </h1>
  )
}

export function ContentBoxParagraph ({ children, ...props }) {
  return (
    <div
      className={'.Paragraph'}
      {...props}
    >
      {children}
    </div>
  )
}
