import { validate as uuidValidate } from 'uuid'
import { Identity } from '@/shared/Identity'

describe('Identity Class', () => {
  describe('New Method', () => {
    it('should create an Identity with a valid UUID string', () => {
      const value = '123e4567-e89b-12d3-a456-426614174000' // Example UUID
      const identity = Identity.New(value)
      expect(identity).toBeInstanceOf(Identity)
      expect(identity.getValue()).toBe(value)
    })

    it('should throw an error when value is not a valid UUID', () => {
      expect(() => Identity.New('invalid-uuid')).toThrow(
        'Value must be a valid UUID'
      )
    })

    it('should throw an error when value is an empty string', () => {
      expect(() => Identity.New('')).toThrow('Value cannot be empty')
    })

    it('should throw an error when value is a string with only whitespace', () => {
      expect(() => Identity.New('   ')).toThrow('Value cannot be empty')
    })

    it('should throw an error when value is null', () => {
      expect(() => Identity.New(null as unknown as string)).toThrow(
        'Value cannot be empty'
      )
    })

    it('should throw an error when value is undefined', () => {
      expect(() => Identity.New(undefined as unknown as string)).toThrow(
        'Value cannot be empty'
      )
    })
  })

  describe('Generate Method', () => {
    it('should generate a new Identity with a valid UUID', () => {
      const identity = Identity.Generate()
      expect(identity).toBeInstanceOf(Identity)
      const value = identity.getValue()
      expect(uuidValidate(value)).toBeTrue()
    })

    it('should generate unique UUIDs', () => {
      const identity1 = Identity.Generate()
      const identity2 = Identity.Generate()
      expect(identity1.getValue()).not.toBe(identity2.getValue())
    })
  })

  describe('getValue Method', () => {
    it('should return the correct value after creation with New', () => {
      const value = '123e4567-e89b-12d3-a456-426614174000'
      const identity = Identity.New(value)
      expect(identity.getValue()).toBe(value)
    })

    it('should return a valid UUID after creation with Generate', () => {
      const identity = Identity.Generate()
      const value = identity.getValue()
      expect(uuidValidate(value)).toBeTrue()
    })
  })
})
