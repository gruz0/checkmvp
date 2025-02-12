import { ProductType } from '@/concept/domain/ProductType'

describe('ProductType Class', () => {
  const validProductTypes = [
    'b2b',
    'b2c',
    'b2b2c',
    'saas',
    'marketplace',
  ] as const

  describe('Creation of ProductType', () => {
    it.each(validProductTypes)(
      'should create a ProductType instance with %s',
      (type) => {
        const productType = ProductType.New(type)

        expect(productType).toBeInstanceOf(ProductType)
        expect(productType.getValue()).toBe(type)
      }
    )

    it('should trim whitespace from input', () => {
      const productType = ProductType.New('  b2b  ')

      expect(productType.getValue()).toBe('b2b')
    })

    it('should convert input to lowercase', () => {
      const productType = ProductType.New('B2B')

      expect(productType.getValue()).toBe('b2b')
    })
  })

  describe('Validation', () => {
    it('should throw error when value is empty', () => {
      expect(() => ProductType.New('')).toThrow('Product type must be defined.')
    })

    it('should throw error when value is only whitespace', () => {
      expect(() => ProductType.New('   ')).toThrow(
        'Product type must be defined.'
      )
    })

    it('should throw error for invalid product type', () => {
      expect(() => ProductType.New('invalid_type')).toThrow(
        `Invalid product type. Must be one of: ${validProductTypes.join(', ')}`
      )
    })
  })

  describe('Edge Cases', () => {
    it('should handle mixed case input', () => {
      const productType = ProductType.New('B2b2C')

      expect(productType.getValue()).toBe('b2b2c')
    })

    it('should handle input with extra spaces', () => {
      const productType = ProductType.New('  SAAS  ')

      expect(productType.getValue()).toBe('saas')
    })

    it('should handle input with tabs and newlines', () => {
      const productType = ProductType.New('\tb2b\n')

      expect(productType.getValue()).toBe('b2b')
    })
  })
})
