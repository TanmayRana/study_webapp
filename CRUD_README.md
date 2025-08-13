# CRUD System Documentation

This document describes the complete CRUD (Create, Read, Update, Delete) system implemented for both MainTitle and Content entities in the Next.js application.

## Overview

The system provides:

- **MainTitle Management**: Categories that can contain multiple content items
- **Content Management**: Individual content items with title, text, and optional MainTitle association
- **Redux Integration**: Centralized state management using Redux Toolkit
- **API Routes**: RESTful endpoints for all CRUD operations
- **UI Components**: Modern, responsive interfaces for data management
- **MongoDB Integration**: Data persistence with Mongoose ODM and population
- **TypeScript**: Full type safety throughout the application

## Data Models

### MainTitle Schema

```typescript
{
  title: String (required),
  contents: [ObjectId] (references Content documents),
  createdAt: Date,
  updatedAt: Date
}
```

### Content Schema

```typescript
{
  title: String (required),
  mainTitle: ObjectId (optional, references MainTitle document),
  content: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### MainTitle Routes

#### GET `/api/maintitles`

- **Purpose**: Fetch all main titles with populated content references
- **Response**: Array of MainTitle objects with populated contents
- **Features**:
  - Sorted by creation date (newest first)
  - Graceful population error handling
  - Returns unpopulated data if population fails

#### POST `/api/maintitles`

- **Purpose**: Create a new main title
- **Body**: `{ title: string, contents?: string[] }`
- **Response**: Created MainTitle object (attempts to populate contents)
- **Validation**: Title must be non-empty string

#### GET `/api/maintitles/[id]`

- **Purpose**: Fetch a single main title by ID
- **Response**: MainTitle object with populated contents
- **Features**: Graceful population error handling

#### PUT `/api/maintitles/[id]`

- **Purpose**: Update an existing main title
- **Body**: `{ title?: string, contents?: string[] }`
- **Response**: Updated MainTitle object (attempts to populate contents)
- **Validation**: Title must be non-empty string

#### DELETE `/api/maintitles/[id]`

- **Purpose**: Delete a main title
- **Response**: Success message

### Content Routes

#### GET `/api/contents`

- **Purpose**: Fetch all content items
- **Response**: Array of Content objects with populated mainTitle references
- **Features**:
  - Sorted by creation date (newest first)
  - Populates mainTitle with title field
  - Graceful population error handling

#### POST `/api/contents`

- **Purpose**: Create a new content item
- **Body**: `{ title: string, content: string, mainTitle?: string }`
- **Response**: Created Content object (attempts to populate mainTitle)
- **Validation**: Both title and content must be non-empty strings

#### GET `/api/contents/[id]`

- **Purpose**: Fetch a single content item by ID
- **Response**: Content object with populated mainTitle
- **Features**: Graceful population error handling

#### PUT `/api/contents/[id]`

- **Purpose**: Update an existing content item
- **Body**: `{ title?: string, content?: string, mainTitle?: string }`
- **Response**: Updated Content object (attempts to populate mainTitle)
- **Validation**: Both title and content must be non-empty strings

#### DELETE `/api/contents/[id]`

- **Purpose**: Delete a content item
- **Response**: Success message

## Redux Store Structure

### MainTitle Slice

- **State**: `mainTitles`, `loading`, `error`, `selectedMainTitle`, `editingId`
- **Actions**: `fetchMainTitles`, `createMainTitle`, `updateMainTitle`, `deleteMainTitle`
- **Selectors**: `selectMainTitles`, `selectMainTitleLoading`, `selectMainTitleError`

### Content Slice

- **State**: `contents`, `loading`, `error`, `selectedContent`, `editingId`
- **Actions**: `fetchContents`, `createContent`, `updateContent`, `deleteContent`
- **Selectors**: `selectContents`, `selectContentLoading`, `selectContentError`

## UI Components

### MainTitleManager

- **Location**: `/admin/maintitle`
- **Features**:
  - Create, edit, delete main titles
  - Display content count for each title
  - Dialog-based editing interface
  - Responsive card layout

### ContentManager

- **Location**: `/admin/content`
- **Features**:
  - Create, edit, delete content items
  - Rich text editing with title and content fields
  - MainTitle selection dropdown (optional association)
  - Card-based display with creation/update dates and MainTitle info
  - Dialog-based editing interface

### ReduxExample

- **Purpose**: Demonstrates Redux state access
- **Features**: Shows total counts and content information

## Admin Dashboard

### Main Dashboard (`/admin`)

- **Navigation Cards**: Main Titles, Content Management, User Management, Analytics, Settings
- **Active Routes**: Main Titles and Content Management are fully functional
- **Future Routes**: User Management, Analytics, and Settings are placeholder cards

## Error Handling

### Population Errors

- **Graceful Degradation**: If content or mainTitle population fails, the system continues to work
- **Fallback Data**: Returns unpopulated objects instead of crashing
- **Logging**: Population errors are logged as warnings for debugging

### API Errors

- **Consistent Response Format**: All endpoints return `{ success: boolean, data?: any, error?: string }`
- **HTTP Status Codes**: Proper status codes for different error types
- **User-Friendly Messages**: Clear error messages for frontend display

## Usage Examples

### Creating a Content with MainTitle Association

```typescript
// Create content with optional mainTitle association
const contentResponse = await createContent(
  "Sample Content",
  "This is sample content text",
  "mainTitleId123" // Optional MainTitle ID
);
```

### Creating a MainTitle with Content

```typescript
// First create content
const contentResponse = await createContent(
  "Sample Content",
  "This is sample content text"
);
const contentId = contentResponse.data._id;

// Then create main title with content reference
const mainTitleResponse = await createMainTitle("Sample Title", [contentId]);
```

### Fetching Populated Data

```typescript
const mainTitles = await fetchMainTitles();
// Each mainTitle.contents will be populated Content objects (if population succeeds)
// If population fails, contents will be ObjectId strings

const contents = await fetchContents();
// Each content.mainTitle will be populated MainTitle objects (if population succeeds)
// If population fails, mainTitle will be ObjectId string
```

## File Structure

```
lib/
├── Schemas/
│   ├── index.ts          # Model registration and exports
│   ├── ContentSchema.ts  # Content Mongoose schema with mainTitle reference
│   └── MainTitleSchema.ts # MainTitle Mongoose schema
├── api/
│   ├── contents.ts       # Content API utility functions
│   └── maintitles.ts     # MainTitle API utility functions
├── store/
│   ├── index.ts          # Redux store configuration
│   ├── hooks.ts          # Typed Redux hooks
│   ├── providers.tsx     # Redux Provider wrapper
│   └── slices/
│       ├── contentSlice.ts    # Content Redux slice
│       └── mainTitleSlice.ts  # MainTitle Redux slice
└── types/
    └── maintitle.ts      # TypeScript interfaces

app/
├── api/
│   ├── contents/
│   │   ├── route.ts      # Content CRUD endpoints
│   │   └── [id]/route.ts # Content individual operations
│   └── maintitles/
│       ├── route.ts      # MainTitle CRUD endpoints
│       └── [id]/route.ts # MainTitle individual operations
└── (admin)/admin/
    ├── page.tsx          # Main admin dashboard
    ├── maintitle/page.tsx # MainTitle management page
    └── content/page.tsx  # Content management page

components/
├── MainTitleManager.tsx  # MainTitle CRUD interface
├── ContentManager.tsx    # Content CRUD interface with MainTitle selection
└── ReduxExample.tsx     # Redux state demonstration
```

## Key Features

- **MongoDB population for related data**
- **Bidirectional relationships**: Content can reference MainTitle, MainTitle can contain Content arrays
- **Graceful Degradation**: System works even when content or mainTitle population fails
- **Redux Toolkit integration** with async thunks
- **TypeScript type safety** throughout
- **Responsive UI** with Shadcn/ui components
- **Error handling** at all levels
- **Consistent API patterns** across all endpoints
- **Admin dashboard** with navigation
- **Real-time state updates** via Redux
- **Optional associations**: Content can exist without MainTitle association
