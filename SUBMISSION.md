# Submission Summary

## Track Chosen

- [x] Frontend Only

## GitHub Copilot Usage Summary

I used Copilot both for initial code generation and for iterative improvements, especially when refactoring or adding new features. Its suggestions helped streamline repetitive tasks and ensured adherence to Angular conventions. In this ssession, I also faced Copilot occasionally made mistakes, such as removing the component class while generating or updating code. I had to manually correct these issues to ensure the components worked as expected.

## Key Prompts Used
<!-- List 3-5 important prompts you used with your AI assistant -->

1. #codebase Understand folder structure and Create a table that displays the  following task fields. There could  be a multiple task to display in the table. 
  For.example : 
  "title": "New Task",
   "description": "Task description",
   "status": "todo",
   "createdAt": "2026-02-18T12:00:00.000Z"

2. Create a new task component and display it inside home compoent.
3. /fix The class 'HomeComponent' is listed in the declarations of the NgModule 'AppModule', but is not a directive, a component, or a pipe. Either remove it from the NgModule's declarations, or add an appropriate Angular decorator.

4. 1. Create the Button to add the task at the top right of the task component. 
   2. Clicking on the button display clicks works. 

5. 1. Create a reactive form which has the three fields title, description and status to add the task along with  Submit button. 
   2. Display reactive form only after clicking on Add Task button. 
   3. After submitting the form successfully Hide the reactive form and display the message for 3 seconds.
#codebase 
6. Create a angular directive Implement the drag and drop feature for reordering of the the task. 
7. #codebase 
    1. Add new field as a priority and due date. (Use default html date picker for due date)
    2. Priority could be "Low", "Medium" or "High" 
    3. And apply the validation if Due date of task is within 7 days then it should have priority as a "High"


 

## Design Decisions (optional)

- **Decision 1:** Implemented reactive forms instead of template-driven
  - **Reasoning:** 
    - Better type safety and more explicit, scalable form structure.
    - Easier to manage complex validation logic and dynamic form controls.

- **Decision 2:** Implemented Directive for drag and drop feature
  - **Reasoning:**
    - The drag-and-drop logic can be applied to any component or element by simply adding the directive.
    - Separation of concerns

## Time Breakdown

- Planning & Setup: [10 minutes]
- Core Implementation: [20-25 minutes]
- Additional Requirements (15-20-min mark)
