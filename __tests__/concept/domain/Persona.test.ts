import { Persona } from '@/concept/domain/Persona'

describe('Persona Class', () => {
  describe('Creation of Persona', () => {
    it('should create a Persona instance with valid input', () => {
      const validPersona =
        'Software developers who specialize in frontend development and have experience with React, Product managers with agile methodology expertise'
      const persona = Persona.New(validPersona)

      expect(persona).toBeInstanceOf(Persona)
      expect(persona.getValue()).toBe(validPersona)
    })

    it('should trim whitespace from input', () => {
      const untrimmedPersona =
        '   Software developers who specialize in frontend development and have experience with React   '
      const trimmedPersona = untrimmedPersona.trim()
      const persona = Persona.New(untrimmedPersona)

      expect(persona.getValue()).toBe(trimmedPersona)
    })

    it('should throw error when input is empty', () => {
      expect(() => {
        Persona.New('')
      }).toThrow('Personas must be defined and between 64 and 2048 characters.')
    })

    it('should throw error when input is only whitespace', () => {
      expect(() => {
        Persona.New('     ')
      }).toThrow('Personas must be defined and between 64 and 2048 characters.')
    })

    it('should throw error when input is less than 64 characters', () => {
      const shortPersona = 'Software developers'
      expect(() => {
        Persona.New(shortPersona)
      }).toThrow('Personas must be defined and between 64 and 2048 characters.')
    })

    it('should throw error when input exceeds 2048 characters', () => {
      const longPersona = 'a'.repeat(2049)
      expect(() => {
        Persona.New(longPersona)
      }).toThrow('Personas must be defined and between 64 and 2048 characters.')
    })

    it('should accept input at minimum length (64 characters)', () => {
      const minLengthPersona = 'a'.repeat(64)
      const persona = Persona.New(minLengthPersona)

      expect(persona.getValue()).toBe(minLengthPersona)
    })

    it('should accept input at maximum length (2048 characters)', () => {
      const maxLengthPersona = 'a'.repeat(2048)
      const persona = Persona.New(maxLengthPersona)

      expect(persona.getValue()).toBe(maxLengthPersona)
    })
  })

  describe('Edge Cases', () => {
    it('should handle unicode characters correctly', () => {
      const unicodePersona =
        '👩‍💻 Developers, 👨‍💼 Managers. All of them are good at their jobs'
      const persona = Persona.New(unicodePersona)

      expect(persona.getValue()).toBe(unicodePersona)
    })

    it('should handle special characters correctly', () => {
      const specialCharPersona =
        'Dev-Ops, QA/Testers & Product Managers. All of them are good at their jobs'
      const persona = Persona.New(specialCharPersona)

      expect(persona.getValue()).toBe(specialCharPersona)
    })

    it('should handle multiple spaces correctly', () => {
      const multipleSpacesPersona =
        'Developers,    Testers,   Managers. All of them are good at their jobs'
      const persona = Persona.New(multipleSpacesPersona)

      expect(persona.getValue()).toBe(multipleSpacesPersona)
    })

    it('should handle newlines correctly', () => {
      const newlinePersona =
        '1. Developers,\n2. Testers,\n3. Managers\n\nAll of them are good at their jobs'
      const persona = Persona.New(newlinePersona)

      expect(persona.getValue()).toBe(newlinePersona)
    })
  })
})
