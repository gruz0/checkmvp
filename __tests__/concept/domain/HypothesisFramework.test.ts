import { HypothesisFramework } from '@/concept/domain/HypothesisFramework'

describe('HypothesisFramework Class', () => {
  const validFormat =
    'If we build [solution], [target audience] will achieve [outcome] because [reason]'
  const validExamples = [
    'If we build a unified search tool, remote teams will save 45 minutes daily because they can find documents faster',
    'If we create an AI assistant, developers will code 30% faster because they get instant help',
  ]

  describe('Creation of HypothesisFramework', () => {
    it('should create a HypothesisFramework instance with valid inputs', () => {
      const framework = HypothesisFramework.New(validFormat, validExamples)

      expect(framework).toBeInstanceOf(HypothesisFramework)
      expect(framework.getFormat()).toBe(validFormat)
      expect(framework.getExamples()).toEqual(validExamples)
    })

    it('should trim whitespace from format', () => {
      const framework = HypothesisFramework.New(
        '  ' + validFormat + '  ',
        validExamples
      )

      expect(framework.getFormat()).toBe(validFormat)
    })

    it('should trim whitespace from examples', () => {
      const framework = HypothesisFramework.New(validFormat, [
        '  First example  ',
        '\tSecond example\t',
      ])

      expect(framework.getExamples()).toEqual([
        'First example',
        'Second example',
      ])
    })

    it('should return immutable examples array', () => {
      const framework = HypothesisFramework.New(validFormat, validExamples)
      const examples = framework.getExamples()

      examples.push('New example')

      expect(framework.getExamples()).toEqual(validExamples)
    })
  })

  describe('Validation', () => {
    describe('Format', () => {
      it('should throw error when format is empty', () => {
        expect(() => HypothesisFramework.New('', validExamples)).toThrow(
          'Format must not be empty'
        )
      })

      it('should throw error when format is only whitespace', () => {
        expect(() => HypothesisFramework.New('   ', validExamples)).toThrow(
          'Format must not be empty'
        )
      })
    })

    describe('Examples', () => {
      it('should throw error when examples array is empty', () => {
        expect(() => HypothesisFramework.New(validFormat, [])).toThrow(
          'Examples must not be empty'
        )
      })

      it('should throw error when any example is empty', () => {
        expect(() =>
          HypothesisFramework.New(validFormat, ['Valid example', ''])
        ).toThrow('Examples must not contain empty values')
      })

      it('should throw error when any example is only whitespace', () => {
        expect(() =>
          HypothesisFramework.New(validFormat, ['Valid example', '   '])
        ).toThrow('Examples must not contain empty values')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle unicode characters in format and examples', () => {
      const framework = HypothesisFramework.New(
        '如果我们构建[解决方案]，[目标用户]将[结果]因为[原因]',
        ['如果我们构建搜索工具，团队将节省时间因为文档更容易找到']
      )

      expect(framework.getFormat()).toBe(
        '如果我们构建[解决方案]，[目标用户]将[结果]因为[原因]'
      )
      expect(framework.getExamples()).toEqual([
        '如果我们构建搜索工具，团队将节省时间因为文档更容易找到',
      ])
    })

    it('should handle special characters in format and examples', () => {
      const format = 'When [x] & [y] => then [z] @ [t]!'
      const examples = [
        'When A & B => then C @ D!',
        'When X & Y => then Z @ T!',
      ]
      const framework = HypothesisFramework.New(format, examples)

      expect(framework.getFormat()).toBe(format)
      expect(framework.getExamples()).toEqual(examples)
    })

    it('should handle multiple spaces in format and examples', () => {
      const format = 'If   we   build   [solution]'
      const examples = [
        'First   example   with   spaces',
        'Second    example    with    spaces',
      ]
      const framework = HypothesisFramework.New(format, examples)

      expect(framework.getFormat()).toBe(format)
      expect(framework.getExamples()).toEqual(examples)
    })

    it('should handle newlines in format and examples', () => {
      const format = 'If we build [solution],\nwe will achieve [outcome]'
      const examples = [
        'Example with\nline break',
        'Another\nexample with\nbreaks',
      ]
      const framework = HypothesisFramework.New(format, examples)

      expect(framework.getFormat()).toBe(format)
      expect(framework.getExamples()).toEqual(examples)
    })
  })
})
