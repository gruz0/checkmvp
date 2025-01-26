# ADR: Introduce “Draft” Stage Before “Concept” Stage

## 1. Title

**Decision**: Add a “Draft” stage (via a wizard) to gather more structured information before submitting a “Concept.”

## 2. Context

- Currently, the user provides a single free-form text (“concept idea”) that goes directly to `/api/concepts` for initial analysis.
- Users often submit incomplete or vague statements, leading to high rates of “requires_changes” or “not-well-defined” responses.
- We want to guide the user through a more structured approach to ensure clarity and reduce rework.

## 3. Decision

1. **Add a New “Draft” Stage**:

   - A wizard with multiple steps to gather the basic idea, target audience, problem details, and day-to-day usage scenario.
   - Each step can provide immediate feedback (heuristics or minimal OpenAI calls) to improve clarity.

2. **Compile Draft → Submit as Concept**:

   - When the user completes the wizard, the frontend compiles all draft details into a single statement.
   - This compiled draft is posted to the existing `/api/concepts` for initial validation.

3. **Proceed to “Idea” Stage for Deep Analysis**:
   - If the user’s concept is well-defined enough, they can request detailed analysis (the “Idea” stage), which may involve more intensive GPT calls.

## 4. Status

**Approved**. We will implement this ASAP to improve user flow and data quality.

## 5. Consequences

- **Pros**:
  - More accurate and complete user input.
  - Reduced back-and-forth for clarifications.
  - Potential cost savings by reserving detailed GPT analysis for well-defined concepts.
- **Cons**:
  - Slightly longer onboarding process (an extra step for the wizard).
  - Additional UI complexity and design work.

## 6. Next Steps

1. Implement a **wizard** interface for drafting ideas.
2. Store the user’s draft in the database (`/api/drafts` endpoint).
3. Allow the user to finalize and submit the draft as a “concept” for initial analysis (`/api/concepts`).
4. If desired, progress to deeper analysis via the “idea” stage (`/api/ideas`).
