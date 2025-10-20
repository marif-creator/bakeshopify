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
   * Animate product image flying to cart with cart plug animation
   * Returns a Promise that resolves when animation completes
   */
  const animateProductToCart = async (
    productImageElementId: string,
    cartElementId: string,
    options: Omit<FlyingAnimationOptions, 'onComplete' | 'onAnimationEnd'> & {
      duration?: number
      scale?: number
      opacity?: number
    } = {}
  ): Promise<boolean> => {
    const {
      duration = 800,
      scale = 0.1,
      opacity = 0.8
    } = options

    return new Promise((resolve) => {
      // Get elements
      const productElement = document.getElementById(productImageElementId)
      const cartElement = document.getElementById(cartElementId)

      if (!productElement) {
        console.warn(`Product element with ID "${productImageElementId}" not found`)
        resolve(false)
        return
      }

      if (!cartElement) {
        console.warn(`Cart element with ID "${cartElementId}" not found`)
        resolve(false)
        return
      }

      // Find the image element within the product
      const imgElement = productElement.querySelector('img')
      if (!imgElement) {
        console.warn(`No image element found within product element "${productImageElementId}"`)
        resolve(false)
        return
      }

      // Create flying product image
      const flyingImage = imgElement.cloneNode(true) as HTMLImageElement
      flyingImage.className = 'flying-product-animation'
      flyingImage.style.pointerEvents = 'none'
      flyingImage.style.zIndex = '9999'

      // Get positions
      const productRect = productElement.getBoundingClientRect()
      const cartRect = cartElement.getBoundingClientRect()

      // Set initial position for flying image
      flyingImage.style.position = 'fixed'
      flyingImage.style.left = `${productRect.left}px`
      flyingImage.style.top = `${productRect.top}px`
      flyingImage.style.width = `${productRect.width}px`
      flyingImage.style.height = `${productRect.height}px`
      flyingImage.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      flyingImage.style.borderRadius = '8px'
      flyingImage.style.objectFit = 'cover'

      // Append flying image to body
      document.body.appendChild(flyingImage)

      // Force reflow
      flyingImage.offsetHeight

      // Animate flying image to cart
      flyingImage.style.left = `${cartRect.left + cartRect.width / 2}px`
      flyingImage.style.top = `${cartRect.top}px`
      flyingImage.style.width = `${productRect.width * scale}px`
      flyingImage.style.height = `${productRect.height * scale}px`
      flyingImage.style.opacity = opacity.toString()

      // Set up completion for flying animation
      setTimeout(async () => {
        // Trigger cart "plugged" animation when flying image arrives
        triggerCartPlugAnimation(cartElement)

        // Clean up flying image
        if (flyingImage.parentNode) {
          flyingImage.parentNode.removeChild(flyingImage)
        }

        // Resolve promise to indicate animation completion
        resolve(true)
      }, duration)
    })
  }

  /**
   * Animate cart with "plugged" effect
   */
  const triggerCartPlugAnimation = (cartElement: HTMLElement) => {
    // Initial bounce
    cartElement.style.transform = 'scale(1.3)'

    // Pulsing effect
    setTimeout(() => {
      cartElement.style.transform = 'scale(1.1)'
      cartElement.style.filter = 'brightness(1.2)'

      setTimeout(() => {
        cartElement.style.transform = 'scale(1)'
        cartElement.style.filter = 'brightness(1)'

        // Final settle
        setTimeout(() => {
          cartElement.style.transform = 'scale(0.95)'

          setTimeout(() => {
            cartElement.style.transform = 'scale(1)'
          }, 100)
        }, 150)
      }, 200)
    }, 100)
  }

  /**
   * Convenience method for product-to-cart animation with async support
   * Returns a Promise that resolves when animation completes
   */
  const animateToCart = async (
    productImageElementId: string = 'mainproductimage',
    cartElementId: string = 'minicart',
    options: {
      onCartUpdate?: () => void
      duration?: number
      scale?: number
      opacity?: number
    } = {}
  ): Promise<boolean> => {
    const { onCartUpdate, duration, scale, opacity } = options

    // Start the flying animation
    const animationResult = await animateProductToCart(productImageElementId, cartElementId, {
      duration,
      scale,
      opacity
    })

    if (animationResult) {
      // Trigger cart update and plug animation when flying completes
      if (onCartUpdate) {
        onCartUpdate()
      } else {
        // Default plug animation if no callback provided
        const cartElement = document.getElementById(cartElementId)
        if (cartElement) {
          triggerCartPlugAnimation(cartElement)
        }
      }
    }

    return animationResult
  }

  /**
   * Animate with async/await support
   */
  const animateWithPromise = async (
    sourceId: string,
    targetId: string,
    options?: {
      duration?: number
      scale?: number
      opacity?: number
    }
  ): Promise<boolean> => {
    return animateProductToCart(sourceId, targetId, options)
  }

  return {
    animateProductToCart,
    animateToCart,
    animateWithPromise
  }
}