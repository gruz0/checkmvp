import { Stage } from '@/concept/domain/Stage'

describe('Stage Class', () => {
  const validStages = ['idea', 'pre_mvp', 'mvp', 'post_launch'] as const

  describe('Creation of Stage', () => {
    it.each(validStages)('should create a Stage instance with %s', (stage) => {
      const stageInstance = Stage.New(stage)

      expect(stageInstance).toBeInstanceOf(Stage)
      expect(stageInstance.getValue()).toBe(stage)
    })

    it('should trim whitespace from input', () => {
      const stage = Stage.New('  idea  ')

      expect(stage.getValue()).toBe('idea')
    })

    it('should convert input to lowercase', () => {
      const stage = Stage.New('MVp')

      expect(stage.getValue()).toBe('mvp')
    })
  })

  describe('Validation', () => {
    it('should throw error when value is empty', () => {
      expect(() => Stage.New('')).toThrow('Stage must be defined.')
    })

    it('should throw error when value is only whitespace', () => {
      expect(() => Stage.New('   ')).toThrow('Stage must be defined.')
    })

    it('should throw error for invalid stage', () => {
      expect(() => Stage.New('invalid_stage')).toThrow(
        `Invalid stage. Must be one of: ${validStages.join(', ')}`
      )
    })
  })

  describe('Edge Cases', () => {
    it('should handle mixed case input', () => {
      const stage = Stage.New('Pre_Mvp')

      expect(stage.getValue()).toBe('pre_mvp')
    })

    it('should handle input with extra spaces', () => {
      const stage = Stage.New('  POST_LAUNCH  ')

      expect(stage.getValue()).toBe('post_launch')
    })

    it('should handle input with tabs and newlines', () => {
      const stage = Stage.New('\tidea\n')

      expect(stage.getValue()).toBe('idea')
    })
  })
})
