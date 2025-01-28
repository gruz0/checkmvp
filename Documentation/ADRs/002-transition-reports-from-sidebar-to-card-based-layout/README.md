# ADR: Transition from Sidebar + Single Scrolling Layout to Card-Based Layout

**Date:** January 26, 2025  
**Status:** Proposed (Pending review)

---

## 1. Context

Our current user interface for the report page consists of:

1. A **sidebar** with a menu of sections (e.g., Context, Market Analysis, Competitors, etc.).
2. A **long, scrolling content area** to the right, where each section is collapsible.

However, **user feedback** and **internal observations** have shown:

- The sidebar acts more like a simple Table of Contents, offering minimal functionality.
- Having so many sections collapsed into one page creates a “wall of content,” which can overwhelm the user.
- It’s not visually clear which sections are still loading, which are disabled, or which are ready for viewing.

---

## 2. Decision

### Summary

We will replace the existing sidebar + single scroll design with **a card-based layout**, where each report section appears as a **card** on a dedicated “home” or “overview” page. Users will click on these cards to navigate to a **dedicated page** for that section’s content.

### Key Elements

1. **Cards for Each Section**

   - Each card displays:
     - An icon representing the section.
     - The section’s title (e.g., “Market Analysis”).
     - A brief description or summary of what the section contains.
   - Each card can display **status indicators** (disabled, loading, loaded) to inform users about content availability.

2. **Dedicated Section Pages**

   - Clicking on a card opens a new page (or dynamically loads content in the main area) dedicated to that section.
   - This reduces clutter on the main screen and allows deeper focus on a single section’s content.

3. **Eliminate Redundant Sidebar**

   - The sidebar is replaced by the card-based overview. Users can navigate from the overview, which is more user-friendly and visually appealing.

4. **Optional “All-in-One” View (Future Consideration)**
   - For users who prefer reading everything in one place, a toggle or “expand all” link may be considered in the future.

---

## 3. Reasoning

1. **Improved User Experience**

   - Each section is easier to identify and understand at a glance.
   - Users can choose which section to view without scrolling through a long page.

2. **Better Scalability**

   - As new report sections are added, new cards can easily be introduced without overloading a single page.

3. **Clarity of Loading States**

   - Cards can display clear “loading,” “disabled,” or “complete” states.
   - Users understand immediately which sections are ready or still in progress.

4. **Flexibility for Future Enhancements**

   - Each section page can evolve independently, adding specialized tools or interactive elements without cluttering a single master page.

5. **Modern Look & Feel**
   - Card-based UIs are a popular pattern, offering a clean, modular design that resonates with many users.

---

## 4. Alternatives Considered

1. **Maintain Sidebar and Collapsible Sections**

   - Pros: Users can see all sections on one page.
   - Cons: Results in a cluttered, long page. The sidebar remains underutilized.

2. **Tabbed Interface**

   - Pros: Could keep sections in a single view with quick switching.
   - Cons: If the number of sections is large, tabs can become unwieldy. Also, tabs don’t convey partial states as clearly as cards can.

3. **Modal-Based Access**
   - Pros: Quick popup for each section’s details.
   - Cons: Large content in modals can hamper usability, and modals can become unwieldy for in-depth reading.

---

## 5. Consequences

1. **Implementation Complexity**

   - Switching from a single-page collapsible approach to multiple pages or dynamic card loading introduces changes in routing.
   - Additional effort for tracking loading states for each card.

2. **User Familiarity Shift**

   - Returning users might need a short adaptation period to the new layout. Proper onboarding or tooltips may be necessary.

3. **Enhanced Maintainability**

   - Each section’s code and layout can be isolated, reducing complexity.
   - Easier to iterate on each section’s design and functionality independently.

4. **Future Expandability**
   - As more sections are added, the main overview remains manageable.
   - Cards can be rearranged or grouped without reworking the entire page layout.
