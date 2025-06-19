# App

CV App is a React project, where I want to put together the knowledge and skills I've been learning in the UI/UX side of things, the project will cover the following areas:

- Accessibility
- Responsive Design
- Error handling: **validation** / **messages**
- Animations and transitions
- Component design

## UX

CV App is a **dynamic** and **interactive** web application that allows you build a cv/resume. It is a test ground for playing and experimenting. I want the app to be **intuitive**, **simple**, **not limitative**, and self explaining.

- Try cv rendering on typing
- Add cv rendering on submit
- Allow to edit filled inputs
- Save cv as draw, that prevails on reloads
- Save cv designs, within the app
- Dowloand cv designs as pdf
- Allow to clear and reset to a default state

## UI Design

I want it to look **modern** and **minimalist**, I want to incorpore a **colorful** palette, modern **gradients**, smooth **animations** and **transitions**. I want the **components** of the UI to _stand out_, and be recognizable as they all come together for a beautiful UI.

### Visual requirements

- Colorful palette
- Modern gradients
- Descriptive icons
- Smooth animations and transitions
- UI components stand out

### Page structure

The app has a landing page, that leads (with a cool transition) to the main screen, with two main sections, the first to input the cv information and the latter to display a live view of the cv.
The page is structured with the following sections:

- Landing page
- Header
- CV Info
- CV Live Preview

## Accessibility

I want to incorpore accessibility features, making the page semantic, keyboard accessible, and meaningful in guiding the user of what it is required to do.

- Semantic html
- Compatible with assistive technologies
- Keyboard navigation, tab order, hidden content
- Accessible colors and contrast ratio
- Meaningful text
- Alternative text
- Highlight required fields, links in new tab
- Accessible and structured forms
- WAI-ARIA (_No_ ARIA is better than _bad_ ARIA)
- Aria: label, labelledby, describedby and hidden
- Favor user preferences and settings
- WCAG

## Responsive Design

Make it responsive. Suitable for mobile, tablets and desktop devices. Prioritizing natural html resposivenes, flexible items, and effective and efficient use of media queries.

- Mobile, Tablet and Desktop support
- Favor natural responsiveness, min-height, max-width, avoiding heights
- Use of relative units: rem, em, percentages and viewport units

## Error handling: validation / messages

Validate user input, implementing real-time validation on selected components, to favor user experience and minimize renders

- Validate user input
- Real-time validation on selected sensible components
- Meaningful feedback: clear descriptive messages, descriptive colors, and meaningful placement

## Animations and transitions

Use animation to boost the user experience, providing value not only by how they look, but as a tool to guide the user through your interface

- Visual pleasing transitions, looks sick
- Instructive animations, to guide the user
- Action-driven animations, represent actions

## Component design

Practice with the different React concepts, design the UI in a declarative manner, favor Components, manage state, sync controlled, create forms combining controlled and uncontrolled input fields, all in all to achieve a pleasing user experience.

- Combine controlled and uncontrolled input fields
- Controlled components, driven by props, configured by parent
- Optimize states
- - Identify the different component states
- - Determine the triggers
- - Represent states in state variables
- - Remove non-essential state variables
- - Add handlers for setting the state values
