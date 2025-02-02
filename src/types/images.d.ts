// Static image imports
declare module '*.jpeg' {
  const content: {
    src: string
    height: number
    width: number
  }
  export default content
}

declare module '*.jpg' {
  const content: {
    src: string
    height: number
    width: number
  }
  export default content
}

declare module '*.png' {
  const content: {
    src: string
    height: number
    width: number
  }
  export default content
}

// Vector images with src property
declare module '*.svg' {
  const content: {
    src: string
    height: number
    width: number
  }
  export default content
}
