import { HypothesisFramework } from '@/concept/domain/HypothesisFramework'

describe('HypothesisFramework Class', () => {
  const validStatement =
    'If we build [solution], [target audience] will achieve [outcome] because [reason]'
  const validHypotheses = [
    'If we build a unified search tool, remote teams will save 45 minutes daily because they can find documents faster',
    'If we create an AI assistant, developers will code 30% faster because they get instant help',
  ]

  describe('Creation of HypothesisFramework', () => {
    it('should create a HypothesisFramework instance with valid inputs', () => {
      const framework = HypothesisFramework.New(validStatement, validHypotheses)

      expect(framework).toBeInstanceOf(HypothesisFramework)
      expect(framework.getStatement()).toBe(validStatement)
      expect(framework.getHypotheses()).toEqual(validHypotheses)
    })

    it('should trim whitespace from format', () => {
      const framework = HypothesisFramework.New(
        '  ' + validStatement + '  ',
        validHypotheses
      )

      expect(framework.getStatement()).toBe(validStatement)
    })

    it('should trim whitespace from hypotheses', () => {
      const framework = HypothesisFramework.New(validStatement, [
        '  First example  ',
        '\tSecond example\t',
      ])

      expect(framework.getHypotheses()).toEqual([
        'First example',
        'Second example',
      ])
    })

    it('should return immutable hypotheses array', () => {
      const framework = HypothesisFramework.New(validStatement, validHypotheses)
      const hypotheses = framework.getHypotheses()

      hypotheses.push('New hypothesis')

      expect(framework.getHypotheses()).toEqual(validHypotheses)
    })
  })

  describe('Validation', () => {
    describe('Statement', () => {
      it('should throw error when statement is empty', () => {
        expect(() => HypothesisFramework.New('', validHypotheses)).toThrow(
          'Statement must not be empty'
        )
      })

      it('should throw error when statement is only whitespace', () => {
        expect(() => HypothesisFramework.New('   ', validHypotheses)).toThrow(
          'Statement must not be empty'
        )
      })
    })

    describe('Hypotheses', () => {
      it('should throw error when hypotheses array is empty', () => {
        expect(() => HypothesisFramework.New(validStatement, [])).toThrow(
          'Hypotheses must not be empty'
        )
      })

      it('should throw error when any hypothesis is empty', () => {
        expect(() =>
          HypothesisFramework.New(validStatement, ['Valid hypothesis', ''])
        ).toThrow('Hypotheses must not contain empty values')
      })

      it('should throw error when any example is only whitespace', () => {
        expect(() =>
          HypothesisFramework.New(validStatement, ['Valid hypothesis', '   '])
        ).toThrow('Hypotheses must not contain empty values')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle unicode characters in format and examples', () => {
      const framework = HypothesisFramework.New(
        '如果我们构建[解决方案]，[目标用户]将[结果]因为[原因]',
        ['如果我们构建搜索工具，团队将节省时间因为文档更容易找到']
      )

      expect(framework.getStatement()).toBe(
        '如果我们构建[解决方案]，[目标用户]将[结果]因为[原因]'
      )
      expect(framework.getHypotheses()).toEqual([
        '如果我们构建搜索工具，团队将节省时间因为文档更容易找到',
      ])
    })

    it('should handle special characters in format and examples', () => {
      const statement = 'When [x] & [y] => then [z] @ [t]!'
      const hypotheses = [
        'When A & B => then C @ D!',
        'When X & Y => then Z @ T!',
      ]
      const framework = HypothesisFramework.New(statement, hypotheses)

      expect(framework.getStatement()).toBe(statement)
      expect(framework.getHypotheses()).toEqual(hypotheses)
    })

    it('should handle multiple spaces in format and examples', () => {
      const statement = 'If   we   build   [solution]'
      const hypotheses = [
        'First   example   with   spaces',
        'Second    example    with    spaces',
      ]
      const framework = HypothesisFramework.New(statement, hypotheses)

      expect(framework.getStatement()).toBe(statement)
      expect(framework.getHypotheses()).toEqual(hypotheses)
    })

    it('should handle newlines in format and examples', () => {
      const statement = 'If we build [solution],\n we will achieve [outcome]'
      const hypotheses = [
        'Example with\nline break',
        'Another\nexample with\nbreaks',
      ]
      const framework = HypothesisFramework.New(statement, hypotheses)

      expect(framework.getStatement()).toBe(statement)
      expect(framework.getHypotheses()).toEqual(hypotheses)
    })
  })
})
