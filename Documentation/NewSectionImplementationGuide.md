# New Section Implementation Guide

This document outlines the step-by-step process for implementing new sections in CheckMVP, based on the successful implementation of the Two-Week Testing Plan section.

## 1. Domain Design

### 1.1 Create Interface Definitions

- Define all required interfaces in the domain layer
- Ensure proper typing for all properties
- Consider immutability requirements
- Example: `CoreAssumption`, `DailyPlan`, `KeyMetrics` interfaces

### 1.2 Create Domain Class

- Implement the domain class with proper validation
- Add static factory method (New)
- Implement getter methods
- Ensure immutability
- Example: `TestingPlan.ts`

### 1.3 Write Domain Tests

- Create comprehensive test suite
- Cover all validation cases
- Test immutability
- Test getter methods
- Example: `TestingPlan.test.ts`

## 2. AI Integration

### 2.1 Create Prompt File

```
/prompts/testing-plan.txt
- Define the expected output structure
- Include examples and context
- Specify validation requirements
- Add error handling instructions
```

### 2.2 Implement Evaluator

- Create evaluator service class
- Implement prompt handling
- Add response parsing
- Handle error cases
- Example: `TestingPlanEvaluator.ts`

### 2.3 Add Event Subscriber

- Create event subscriber for the new section
- Implement evaluation logic
- Add domain object creation
- Handle persistence
- Example: `TestingPlanEvaluationSubscriber.ts`

## 3. UI Implementation

### 3.1 Create Component Structure

```typescript
/app/ideas/[id]/components/Section{Name}.tsx
- Implement component layout
- Add loading states
- Handle data display
- Include error handling
```

### 3.2 Style Components

- Add Tailwind CSS classes
- Ensure responsive design
- Implement dark mode support
- Follow existing design patterns

### 3.3 Add to Parent Component

- Import new section component
- Add to layout
- Handle data fetching
- Manage state if needed

## 4. Testing & Validation

### 4.1 Unit Tests

- Test domain logic
- Test evaluator service
- Test event subscriber
- Ensure high coverage

### 4.2 Integration Tests

- Test API endpoints
- Test UI components
- Verify data flow
- Check error handling

### 4.3 Manual Testing

- Verify UI rendering
- Check responsive design
- Test dark mode
- Validate user interactions

## 5. Documentation

### 5.1 Update PRD

- Add new section details
- Document features
- Update specifications
- Include examples

### 5.2 Update Technical Docs

- Document domain model
- Add API documentation
- Include implementation notes
- Update diagrams

### 5.3 Update Roadmap

- Mark feature as completed
- Add related future enhancements
- Update timeline
- Document impact

## Best Practices

1. **Domain First Approach**

   - Start with domain model
   - Focus on validation rules
   - Ensure type safety
   - Maintain immutability

2. **Test Coverage**

   - Write tests first
   - Cover edge cases
   - Test error scenarios
   - Verify immutability

3. **UI Consistency**

   - Follow design patterns
   - Reuse components
   - Maintain responsiveness
   - Support dark mode

4. **Documentation**

   - Document as you go
   - Include examples
   - Update all relevant docs
   - Add implementation notes
