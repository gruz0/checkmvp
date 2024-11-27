import { GoogleTrendsKeyword } from '@/idea/domain/GoogleTrendsKeyword'

describe('GoogleTrendsKeyword Class', () => {
  const validKeyword = 'Technology'

  describe('Successful Creation', () => {
    it('should create a GoogleTrendsKeyword instance with a valid keyword', () => {
      const keyword = GoogleTrendsKeyword.New(validKeyword)
      expect(keyword).toBeInstanceOf(GoogleTrendsKeyword)
      expect(keyword.getKeyword()).toBe(validKeyword.trim())
    })

    it('should create an instance when keyword is at minimum length', () => {
      const minKeyword = 'AI'
      const keyword = GoogleTrendsKeyword.New(minKeyword)
      expect(keyword.getKeyword()).toBe(minKeyword)
    })

    it('should create an instance when keyword is at maximum length', () => {
      const maxKeyword = 'A'.repeat(100)
      const keyword = GoogleTrendsKeyword.New(maxKeyword)
      expect(keyword.getKeyword()).toBe(maxKeyword)
    })
  })

  describe('Validation Errors', () => {
    it('should throw an error when keyword is null', () => {
      expect(() => {
        GoogleTrendsKeyword.New(null as unknown as string)
      }).toThrow('Keyword must be a string.')
    })

    it('should throw an error when keyword is undefined', () => {
      expect(() => {
        GoogleTrendsKeyword.New(undefined as unknown as string)
      }).toThrow('Keyword must be a string.')
    })

    it('should throw an error when keyword is not a string', () => {
      expect(() => {
        GoogleTrendsKeyword.New(123 as unknown as string)
      }).toThrow('Keyword must be a string.')
    })

    it('should throw an error when keyword is an empty string', () => {
      expect(() => {
        GoogleTrendsKeyword.New('')
      }).toThrow('Keyword cannot be empty.')
    })

    it('should throw an error when keyword is whitespace only', () => {
      expect(() => {
        GoogleTrendsKeyword.New('   ')
      }).toThrow('Keyword cannot be empty.')
    })

    it('should throw an error when keyword is shorter than minimum length', () => {
      const shortKeyword = 'A'
      expect(() => {
        GoogleTrendsKeyword.New(shortKeyword)
      }).toThrow('Keyword must be between 2 and 100 characters.')
    })

    it('should throw an error when keyword is longer than maximum length', () => {
      const longKeyword = 'A'.repeat(101)
      expect(() => {
        GoogleTrendsKeyword.New(longKeyword)
      }).toThrow('Keyword must be between 2 and 100 characters.')
    })
  })

  describe('Getter Method', () => {
    it('should return the correct keyword from getKeyword()', () => {
      const keyword = GoogleTrendsKeyword.New(validKeyword)
      expect(keyword.getKeyword()).toBe(validKeyword.trim())
    })
  })
})
