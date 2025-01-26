import { Region } from '@/concept/domain/Region'

describe('Region Class', () => {
  const validRegions = [
    'worldwide',
    'north_america',
    'south_america',
    'europe',
    'asia',
    'africa',
    'oceania',
  ]

  describe('Successful Creation', () => {
    it.each(validRegions)(
      'should create a Region instance with %s',
      (region) => {
        const regionObj = Region.New(region)
        expect(regionObj).toBeInstanceOf(Region)
        expect(regionObj.getValue()).toBe(region)
      }
    )

    it('should handle uppercase input', () => {
      const regionObj = Region.New('WORLDWIDE')
      expect(regionObj.getValue()).toBe('worldwide')
    })

    it('should handle whitespace', () => {
      const regionObj = Region.New('  europe  ')
      expect(regionObj.getValue()).toBe('europe')
    })
  })

  describe('Validation Errors', () => {
    it('should throw an error when value is null', () => {
      expect(() => {
        Region.New(null as unknown as string)
      }).toThrow('Region must be defined.')
    })

    it('should throw an error when value is undefined', () => {
      expect(() => {
        Region.New(undefined as unknown as string)
      }).toThrow('Region must be defined.')
    })

    it('should throw an error when value is empty string', () => {
      expect(() => {
        Region.New('')
      }).toThrow('Region must be defined.')
    })

    it('should throw an error when value is whitespace only', () => {
      expect(() => {
        Region.New('   ')
      }).toThrow('Region must be defined.')
    })

    it('should throw an error for invalid region', () => {
      expect(() => {
        Region.New('invalid_region')
      }).toThrow(`Invalid region. Must be one of: ${validRegions.join(', ')}`)
    })
  })
})
