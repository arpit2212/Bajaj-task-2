# Dynamic Form Builder

A React TypeScript application that dynamically renders multi-section forms based on API data with validation and section navigation.

## Demo

[Live Demo](https://bajaj-task-2-bvqg.vercel.app/)

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="./public/Screenshot 2025-04-29 135741.png" alt="Project Structure"  />
  <img src="./public/Screenshot 2025-04-29 135641.png" alt="Code View"  />
  <img src="./public/Screenshot 2025-04-29 135615.png" alt="Form Implementation"  />
  <img src="./public/Screenshot 2025-04-29 135522.png" alt="API Integration"  />
  <img src="./public/Screenshot 2025-04-29 135341.png" alt="UI View" />
</div>

## Project Overview

This application allows students to:
1. Log in using their Roll Number and Name
2. Register via API call
3. Fetch a dynamic form structure
4. Render form fields dynamically based on API response
5. Validate inputs according to specified rules
6. Navigate between form sections
7. Submit collected form data

The application demonstrates:
- Dynamic form rendering
- Multi-section form navigation
- Field validation based on API metadata
- TypeScript integration with React
- Clean component architecture

## Features

- **User Authentication**: Simple login with Roll Number and Name
- **Dynamic Form Generation**: Forms are rendered based on API response
- **Multi-Section Navigation**: Navigate between form sections with prev/next buttons
- **Validation**: Dynamic validation based on form field metadata
- **Responsive Design**: Works on desktop and mobile devices
- **Type Safety**: Built with TypeScript for robust type checking

## Tech Stack

- **React**: Frontend library
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server

## Project Structure

```
MY-APP/
├── public/          # Static assets
├── src/             # Source files
│   ├── assets/      # Application assets
│   ├── components/  # Reusable components
│   │   ├── DynamicForm.tsx
│   │   ├── FormField.tsx
│   │   ├── FormSection.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── LoginForm.tsx
│   │   └── NavigationBar.tsx
│   ├── api.ts       # API integration
│   ├── App.css
│   ├── App.tsx      # Main application component
│   ├── index.css
│   ├── main.tsx     # Entry point
│   └── types.ts     # TypeScript type definitions
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/dynamic-form-builder.git
   cd dynamic-form-builder
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit `http://localhost:5173`

## API Integration

The application integrates with the following API endpoints:

1. **User Registration**:
   ```
   POST https://dynamic-form-generator-9rl7.onrender.com/create-user
   ```
   Payload:
   ```json
   {
     "rollNumber": "your_roll_number",
     "name": "your_name"
   }
   ```

2. **Fetch Form Structure**:
   ```
   GET https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=your_roll_number
   ```

## Form Structure

The API returns a form structure like this:

```typescript
interface FormResponse {
  message: string;
  form: {
    formTitle: string;
    formId: string;
    version: string;
    sections: FormSection[];
  };
}

interface FormSection {
  sectionId: number;
  title: string;
  description: string;
  fields: FormField[];
}

interface FormField {
  fieldId: string;
  type: "text" | "tel" | "email" | "textarea" | "date" | "dropdown" | "radio" | "checkbox";
  label: string;
  placeholder?: string;
  required: boolean;
  dataTestId: string;
  validation?: {
    message: string;
  };
  options?: Array<{
    value: string;
    label: string;
    dataTestId?: string;
  }>;
  maxLength?: number;
  minLength?: number;
}
```

## Implementation Details

### Components

1. **LoginForm**: Handles user authentication
2. **DynamicForm**: Main form controller that fetches and manages form data
3. **FormSection**: Renders a single section of the form
4. **FormField**: Renders individual form fields based on their type
5. **LoadingSpinner**: Displayed during API calls
6. **NavigationBar**: Simple navigation header

### Form Validation

- Each field is validated based on its metadata from the API
- Validation rules include:
  - Required fields
  - Min/Max length
  - Field-specific validations

### Section Navigation

- Users can navigate between sections using prev/next buttons
- Navigation to the next section is only allowed if the current section is valid
- The final section displays a submit button instead of next

## License

MIT

## Acknowledgements

- This project was created as part of a coding qualification task
- Thanks to the API provider for the dynamic form endpoints
