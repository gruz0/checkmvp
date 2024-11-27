import { ValueProposition } from '@/idea/domain/ValueProposition'

describe('ValueProposition Class', () => {
  const validMainBenefit = 'Saves time for users'
  const validProblemSolving = 'Automates repetitive tasks'
  const validDifferentiation = 'Uses advanced AI algorithms'

  describe('Successful Creation', () => {
    it('should create a ValueProposition instance with valid inputs', () => {
      const valueProp = ValueProposition.New(
        validMainBenefit,
        validProblemSolving,
        validDifferentiation
      )

      expect(valueProp).toBeInstanceOf(ValueProposition)
      expect(valueProp.getMainBenefit()).toBe(validMainBenefit)
      expect(valueProp.getProblemSolving()).toBe(validProblemSolving)
      expect(valueProp.getDifferentiation()).toBe(validDifferentiation)
    })
  })

  describe('Validation Errors', () => {
    describe('MainBenefit Property', () => {
      it('should throw an error when mainBenefit is empty', () => {
        expect(() =>
          ValueProposition.New('', validProblemSolving, validDifferentiation)
        ).toThrow('Main benefit cannot be empty')
      })

      it('should throw an error when mainBenefit is whitespace', () => {
        expect(() =>
          ValueProposition.New('   ', validProblemSolving, validDifferentiation)
        ).toThrow('Main benefit cannot be empty')
      })

      it('should throw an error when mainBenefit is null or undefined', () => {
        expect(() =>
          ValueProposition.New(
            null as unknown as string,
            validProblemSolving,
            validDifferentiation
          )
        ).toThrow('Main benefit cannot be empty')

        expect(() =>
          ValueProposition.New(
            undefined as unknown as string,
            validProblemSolving,
            validDifferentiation
          )
        ).toThrow('Main benefit cannot be empty')
      })
    })

    describe('ProblemSolving Property', () => {
      it('should throw an error when problemSolving is empty', () => {
        expect(() =>
          ValueProposition.New(validMainBenefit, '', validDifferentiation)
        ).toThrow('Problem solving cannot be empty')
      })

      it('should throw an error when problemSolving is whitespace', () => {
        expect(() =>
          ValueProposition.New(validMainBenefit, '   ', validDifferentiation)
        ).toThrow('Problem solving cannot be empty')
      })

      it('should throw an error when problemSolving is null or undefined', () => {
        expect(() =>
          ValueProposition.New(
            validMainBenefit,
            null as unknown as string,
            validDifferentiation
          )
        ).toThrow('Problem solving cannot be empty')

        expect(() =>
          ValueProposition.New(
            validMainBenefit,
            undefined as unknown as string,
            validDifferentiation
          )
        ).toThrow('Problem solving cannot be empty')
      })
    })

    describe('Differentiation Property', () => {
      it('should throw an error when differentiation is empty', () => {
        expect(() =>
          ValueProposition.New(validMainBenefit, validProblemSolving, '')
        ).toThrow('Differentiation cannot be empty')
      })

      it('should throw an error when differentiation is whitespace', () => {
        expect(() =>
          ValueProposition.New(validMainBenefit, validProblemSolving, '   ')
        ).toThrow('Differentiation cannot be empty')
      })

      it('should throw an error when differentiation is null or undefined', () => {
        expect(() =>
          ValueProposition.New(
            validMainBenefit,
            validProblemSolving,
            null as unknown as string
          )
        ).toThrow('Differentiation cannot be empty')

        expect(() =>
          ValueProposition.New(
            validMainBenefit,
            validProblemSolving,
            undefined as unknown as string
          )
        ).toThrow('Differentiation cannot be empty')
      })
    })
  })

  describe('Getter Methods', () => {
    let valueProp: ValueProposition

    beforeEach(() => {
      valueProp = ValueProposition.New(
        validMainBenefit,
        validProblemSolving,
        validDifferentiation
      )
    })

    it('should return the correct mainBenefit', () => {
      expect(valueProp.getMainBenefit()).toBe(validMainBenefit)
    })

    it('should return the correct problemSolving', () => {
      expect(valueProp.getProblemSolving()).toBe(validProblemSolving)
    })

    it('should return the correct differentiation', () => {
      expect(valueProp.getDifferentiation()).toBe(validDifferentiation)
    })
  })
})
