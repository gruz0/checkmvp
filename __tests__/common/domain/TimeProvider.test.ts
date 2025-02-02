import {
  FixedTimeProvider,
  SystemTimeProvider,
} from '@/common/domain/TimeProvider'

describe('TimeProvider', () => {
  describe('SystemTimeProvider', () => {
    it('should return current system time', () => {
      const provider = new SystemTimeProvider()
      const before = new Date()
      const result = provider.now()
      const after = new Date()

      // The result should be between before and after timestamps
      expect(result.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(result.getTime()).toBeLessThanOrEqual(after.getTime())
    })

    it('should return new Date instance on each call', () => {
      const provider = new SystemTimeProvider()
      const result1 = provider.now()
      const result2 = provider.now()

      expect(result1).not.toBe(result2)
      expect(result1).toBeInstanceOf(Date)
      expect(result2).toBeInstanceOf(Date)
    })
  })

  describe('FixedTimeProvider', () => {
    it('should return the fixed date provided in constructor', () => {
      const fixedDate = new Date('2024-01-01T12:00:00Z')
      const provider = new FixedTimeProvider(fixedDate)

      const result = provider.now()

      expect(result.toISOString()).toBe(fixedDate.toISOString())
    })

    it('should return new Date instance on each call', () => {
      const fixedDate = new Date('2024-01-01T12:00:00Z')
      const provider = new FixedTimeProvider(fixedDate)

      const result1 = provider.now()
      const result2 = provider.now()

      expect(result1).not.toBe(result2)
      expect(result1).toBeInstanceOf(Date)
      expect(result2).toBeInstanceOf(Date)
      expect(result1.toISOString()).toBe(result2.toISOString())
    })

    it('should not be affected by modifications to constructor date', () => {
      const fixedDate = new Date('2024-01-01T12:00:00Z')
      const provider = new FixedTimeProvider(fixedDate)

      const originalTime = provider.now()

      // Modify the original date
      fixedDate.setFullYear(2025)

      const newTime = provider.now()
      expect(newTime.toISOString()).toBe(originalTime.toISOString())
      expect(newTime.getFullYear()).toBe(2024)
    })

    it('should not be affected by modifications to returned date', () => {
      const fixedDate = new Date('2024-01-01T12:00:00Z')
      const provider = new FixedTimeProvider(fixedDate)

      const result = provider.now()
      result.setFullYear(2025)

      const nextResult = provider.now()
      expect(nextResult.getFullYear()).toBe(2024)
    })
  })
})
