# Draft Stage Diagram

Below is an **extended Mermaid sequence diagram** that illustrates the entire flow with a **four-step draft wizard**, partial calls to OpenAI for suggestions, and ultimately transitioning into the **Concept** and **Idea** stages. It shows how each step of the draft is saved, possibly enhanced by AI feedback, and then finalized into a concept for validation. If needed, the user proceeds to deeper “idea” analysis and can generate a PDF at the end.

```mermaid
sequenceDiagram
    participant C as Customer
    participant FE as Frontend
    participant BE as Backend
    participant AI as OpenAI
    participant DB as Database
    participant PDF as PDF Generator

    Note over C,FE: The user begins Draft Wizard

    alt Step 1: Concept Overview
        C->>FE: Enter draft info (overview)
        FE->>BE: POST /api/drafts/step1
        BE->>DB: Store partial draft (Step 1 data)
        opt Request AI feedback
            BE->>AI: Provide draft data (step 1)
            AI-->>BE: Return suggestions & clarifications
        end
        BE-->>FE: Return partial feedback
        FE-->>C: Display suggestions & updated draft preview
    end

    alt Step 2: Target Audience
        C->>FE: Enter target audience details
        FE->>BE: POST /api/drafts/step2
        BE->>DB: Update draft (Step 2 data)
        opt Request AI feedback
            BE->>AI: Provide draft data (steps 1 & 2)
            AI-->>BE: Return suggestions & clarifications
        end
        BE-->>FE: Return partial feedback
        FE-->>C: Display suggestions & updated draft preview
    end

    alt Step 3: Problem Statement
        C->>FE: Enter problem details
        FE->>BE: POST /api/drafts/step3
        BE->>DB: Update draft (Step 3 data)
        opt Request AI feedback
            BE->>AI: Provide draft data (steps 1,2 & 3)
            AI-->>BE: Return suggestions & clarifications
        end
        BE-->>FE: Return partial feedback
        FE-->>C: Display suggestions & updated draft preview
    end

    alt Step 4: Usage Context
        C->>FE: Enter day-to-day usage scenario
        FE->>BE: POST /api/drafts/step4
        BE->>DB: Update draft (Step 4 data)
        opt Request AI feedback
            BE->>AI: Provide all draft data (steps 1-4)
            AI-->>BE: Return suggestions & clarifications
        end
        BE-->>FE: Return partial feedback
        FE-->>C: Display final draft preview
    end

    Note over FE,BE: Draft is complete, user can now finalize

    C->>FE: Finalize draft into a concept
    FE->>BE: POST /api/concepts (compiled from draft)
    BE->>DB: Create new Concept entry
    BE->>AI: Initial concept analysis (4o-mini or similar)
    AI-->>BE: Return problem evaluation & suggestions
    BE->>DB: Store concept analysis
    BE-->>FE: Return concept evaluation
    FE-->>C: Display concept report & suggestions

    alt Customer proceeds with deeper analysis (Idea Stage)
        C->>FE: Request detailed idea analysis
        FE->>BE: POST /api/ideas
        par Parallel AI Analysis
            BE->>AI: Value proposition analysis
            BE->>AI: Market analysis
            BE->>AI: Target audience analysis
            BE->>AI: Competitor analysis
            BE->>AI: SWOT analysis
            BE->>AI: Product naming
            BE->>AI: Elevator pitches
            BE->>AI: Marketing ideas
        end
        AI-->>BE: Return all idea-level analyses
        BE->>DB: Store complete idea analysis
        BE-->>FE: Return detailed report
        FE-->>C: Display interactive full report

        opt Download PDF
            C->>FE: Request PDF
            FE->>BE: GET /api/ideas/{id}/pdf
            BE->>PDF: Generate PDF report
            PDF-->>BE: PDF binary data
            BE-->>FE: Return PDF file
            FE-->>C: Prompt user to download
        end
    end
```

## Diagram Explanation

1. **Draft Wizard (Steps 1–4)**

   - The user moves through four sequential steps:
     1. **Concept Overview**
     2. **Target Audience**
     3. **Problem Statement**
     4. **Usage Context**
   - After each step, the frontend sends the updated partial draft to the backend, which stores it in the database.
   - Optionally, the backend can call OpenAI (the cheaper model) to get immediate suggestions or clarifications.
   - The user sees feedback in real-time, refining their draft until it’s complete.

2. **Finalizing the Draft Into a Concept**

   - Once all steps are completed, the user clicks “Finalize” (or similar).
   - The combined draft data is posted to `POST /api/concepts` to create a **Concept** record in the database.
   - The backend calls OpenAI again for an initial concept analysis (classification, suggestions, clarity scores, etc.).
   - The system returns an evaluation report to the frontend, where the user can see if their concept is “well-defined” or needs further refinement.

3. **Idea Stage (Advanced Analysis)**

   - If the user wants more in-depth research or advanced insights (e.g., competitor analysis, market sizing), they proceed with the **Idea** stage.
   - The backend issues multiple, parallel AI calls (potentially to a more expensive model) for specific analyses (market, target audience, product naming, etc.).
   - The user receives a comprehensive **full report** once everything is compiled.

4. **PDF Generation**
   - Optionally, the user can download a PDF of the full report at the Idea stage.
   - The backend calls a PDF generator service, returns the binary, and the frontend provides the file to the user.

### Key Takeaways

- Each wizard step can incorporate **on-the-fly** AI suggestions.
- You only do the more **expensive** or detailed analysis once the concept is clarified.
- This **staged** approach ensures higher-quality data and saves on API costs.
- The user’s experience is more **guided** and less prone to confusion or incomplete inputs.
