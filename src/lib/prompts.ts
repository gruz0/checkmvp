import fs from 'fs'
import path from 'path'

// Directory where the prompt files are located
const promptsDirectory = path.join(process.cwd(), 'prompts')

/**
 * Get the content of a specific prompt by its slugified name.
 * @param {string} promptName - The name of the prompt (slugified).
 * @returns {string} - The content of the prompt.
 */
export const getPromptContent = (promptName: string): string | null => {
  try {
    const filePath = path.join(promptsDirectory, `${promptName}.txt`)

    // FIXME: Remove this rule:
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const fileContent = fs.readFileSync(filePath, 'utf8')

    return fileContent
  } catch (error) {
    console.error(`Error reading file: ${promptName}.txt`, error)
    return null
  }
}
