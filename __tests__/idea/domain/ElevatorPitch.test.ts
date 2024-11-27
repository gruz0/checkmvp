import { ElevatorPitch } from '@/idea/domain/ElevatorPitch'

describe('ElevatorPitch Class', () => {
  const validHook = 'Did you know that...'
  const validProblem = 'Many people struggle with...'
  const validSolution = 'Our product solves this by...'
  const validValueProposition = 'We uniquely offer...'
  const validCTA = 'Join us today to...'

  describe('Successful Creation', () => {
    it('should create an ElevatorPitch instance with valid inputs', () => {
      const pitch = ElevatorPitch.New(
        validHook,
        validProblem,
        validSolution,
        validValueProposition,
        validCTA
      )

      expect(pitch).toBeInstanceOf(ElevatorPitch)
      expect(pitch.getHook()).toBe(validHook)
      expect(pitch.getProblem()).toBe(validProblem)
      expect(pitch.getSolution()).toBe(validSolution)
      expect(pitch.getValueProposition()).toBe(validValueProposition)
      expect(pitch.getCTA()).toBe(validCTA)
    })
  })

  describe('Validation Errors', () => {
    describe('Hook Property', () => {
      it('should throw an error when hook is empty', () => {
        expect(() =>
          ElevatorPitch.New(
            '',
            validProblem,
            validSolution,
            validValueProposition,
            validCTA
          )
        ).toThrow('Hook cannot be empty')
      })

      it('should throw an error when hook is whitespace', () => {
        expect(() =>
          ElevatorPitch.New(
            '   ',
            validProblem,
            validSolution,
            validValueProposition,
            validCTA
          )
        ).toThrow('Hook cannot be empty')
      })

      it('should throw an error when hook is null or undefined', () => {
        expect(() =>
          ElevatorPitch.New(
            null as unknown as string,
            validProblem,
            validSolution,
            validValueProposition,
            validCTA
          )
        ).toThrow('Hook cannot be empty')

        expect(() =>
          ElevatorPitch.New(
            undefined as unknown as string,
            validProblem,
            validSolution,
            validValueProposition,
            validCTA
          )
        ).toThrow('Hook cannot be empty')
      })
    })

    describe('Problem Property', () => {
      it('should throw an error when problem is empty', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            '',
            validSolution,
            validValueProposition,
            validCTA
          )
        ).toThrow('Problem cannot be empty')
      })

      it('should throw an error when problem is whitespace', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            '   ',
            validSolution,
            validValueProposition,
            validCTA
          )
        ).toThrow('Problem cannot be empty')
      })

      it('should throw an error when problem is null or undefined', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            null as unknown as string,
            validSolution,
            validValueProposition,
            validCTA
          )
        ).toThrow('Problem cannot be empty')

        expect(() =>
          ElevatorPitch.New(
            validHook,
            undefined as unknown as string,
            validSolution,
            validValueProposition,
            validCTA
          )
        ).toThrow('Problem cannot be empty')
      })
    })

    describe('Solution Property', () => {
      it('should throw an error when solution is empty', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            '',
            validValueProposition,
            validCTA
          )
        ).toThrow('Solution cannot be empty')
      })

      it('should throw an error when solution is whitespace', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            '   ',
            validValueProposition,
            validCTA
          )
        ).toThrow('Solution cannot be empty')
      })

      it('should throw an error when solution is null or undefined', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            null as unknown as string,
            validValueProposition,
            validCTA
          )
        ).toThrow('Solution cannot be empty')

        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            undefined as unknown as string,
            validValueProposition,
            validCTA
          )
        ).toThrow('Solution cannot be empty')
      })
    })

    describe('ValueProposition Property', () => {
      it('should throw an error when valueProposition is empty', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            validSolution,
            '',
            validCTA
          )
        ).toThrow('Value proposition cannot be empty')
      })

      it('should throw an error when valueProposition is whitespace', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            validSolution,
            '   ',
            validCTA
          )
        ).toThrow('Value proposition cannot be empty')
      })

      it('should throw an error when valueProposition is null or undefined', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            validSolution,
            null as unknown as string,
            validCTA
          )
        ).toThrow('Value proposition cannot be empty')

        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            validSolution,
            undefined as unknown as string,
            validCTA
          )
        ).toThrow('Value proposition cannot be empty')
      })
    })

    describe('CTA Property', () => {
      it('should throw an error when cta is empty', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            validSolution,
            validValueProposition,
            ''
          )
        ).toThrow('Call to action cannot be empty')
      })

      it('should throw an error when cta is whitespace', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            validSolution,
            validValueProposition,
            '   '
          )
        ).toThrow('Call to action cannot be empty')
      })

      it('should throw an error when cta is null or undefined', () => {
        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            validSolution,
            validValueProposition,
            null as unknown as string
          )
        ).toThrow('Call to action cannot be empty')

        expect(() =>
          ElevatorPitch.New(
            validHook,
            validProblem,
            validSolution,
            validValueProposition,
            undefined as unknown as string
          )
        ).toThrow('Call to action cannot be empty')
      })
    })
  })

  describe('Getter Methods', () => {
    let pitch: ElevatorPitch

    beforeEach(() => {
      pitch = ElevatorPitch.New(
        validHook,
        validProblem,
        validSolution,
        validValueProposition,
        validCTA
      )
    })

    it('should return the correct hook', () => {
      expect(pitch.getHook()).toBe(validHook)
    })

    it('should return the correct problem', () => {
      expect(pitch.getProblem()).toBe(validProblem)
    })

    it('should return the correct solution', () => {
      expect(pitch.getSolution()).toBe(validSolution)
    })

    it('should return the correct value proposition', () => {
      expect(pitch.getValueProposition()).toBe(validValueProposition)
    })

    it('should return the correct CTA', () => {
      expect(pitch.getCTA()).toBe(validCTA)
    })
  })
})
