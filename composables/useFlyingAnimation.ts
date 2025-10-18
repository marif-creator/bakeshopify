/**
 * Flying Animation Composable
 *
 * Creates a smooth flying animation effect where an element appears to fly
 * from one position to another, typically used for cart additions or similar UI effects.
 *
 * @param sourceElementId - The ID of the element to clone and animate from
 * @param targetElementId - The ID of the element to animate to
 * @param options - Animation configuration options
 * @returns Object with animation controls and state
 */

interface FlyingAnimationOptions {
  duration?: number
  scale?: number
  opacity?: number
  onComplete?: () => void
  onAnimationEnd?: () => void
}

export const useFlyingAnimation = () => {
  /**
   * Animate an element flying from source to target
   */
  const animateToElement = (
    sourceElementId: string,
    targetElementId: string,
    options: FlyingAnimationOptions = {}
  ) => {
    const {
      duration = 800,
      scale = 0.1,
      opacity = 0.8,
      onComplete,
      onAnimationEnd
    } = options

    // Get the source element (element to clone)
    const sourceElement = document.getElementById(sourceElementId)
    if (!sourceElement) {
      console.warn(`Source element with ID "${sourceElementId}" not found`)
      return false
    }

    // Get the target element (destination)
    const targetElement = document.getElementById(targetElementId)
    if (!targetElement) {
      console.warn(`Target element with ID "${targetElementId}" not found`)
      return false
    }

    // Find the image element within the source
    const imgElement = sourceElement.querySelector('img')
    if (!imgElement) {
      console.warn(`No image element found within source element "${sourceElementId}"`)
      return false
    }

    // Create a flying clone of the image
    const flyingImage = imgElement.cloneNode(true) as HTMLImageElement
    flyingImage.className = 'flying-animation'
    flyingImage.style.pointerEvents = 'none'
    flyingImage.style.zIndex = '9999'

    // Get positions
    const sourceRect = sourceElement.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()

    // Set initial position (absolute positioning)
    flyingImage.style.position = 'fixed'
    flyingImage.style.left = `${sourceRect.left}px`
    flyingImage.style.top = `${sourceRect.top}px`
    flyingImage.style.width = `${sourceRect.width}px`
    flyingImage.style.height = `${sourceRect.height}px`
    flyingImage.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
    flyingImage.style.borderRadius = '8px'
    flyingImage.style.objectFit = 'cover'

    // Append to body
    document.body.appendChild(flyingImage)

    // Force reflow to ensure initial styles are applied
    flyingImage.offsetHeight

    // Animate to target position (scaled down)
    flyingImage.style.left = `${targetRect.left}px`
    flyingImage.style.top = `${targetRect.top}px`
    flyingImage.style.width = `${sourceRect.width * scale}px`
    flyingImage.style.height = `${sourceRect.height * scale}px`
    flyingImage.style.opacity = opacity.toString()

    // Handle animation completion
    const cleanup = () => {
      if (flyingImage.parentNode) {
        flyingImage.parentNode.removeChild(flyingImage)
      }
      onAnimationEnd?.()
    }

    // Set up completion callback
    setTimeout(() => {
      onComplete?.()
      // Small delay before cleanup to ensure onComplete runs first
      setTimeout(cleanup, 10)
    }, duration)

    return true
  }

  /**
   * Convenience method for product-to-cart animation
   */
  const animateToCart = (productImageElementId: string = 'mainproductimage', cartElementId: string = 'minicart') => {
    return animateToElement(productImageElementId, cartElementId, {
      duration: 800,
      scale: 0.1,
      opacity: 0.8
    })
  }

  /**
   * Animate with callback for completion
   */
  const animateWithCallback = (
    sourceId: string,
    targetId: string,
    onComplete?: () => void,
    options?: Omit<FlyingAnimationOptions, 'onComplete'>
  ) => {
    return animateToElement(sourceId, targetId, {
      ...options,
      onComplete
    })
  }

  return {
    animateToElement,
    animateToCart,
    animateWithCallback
  }
}