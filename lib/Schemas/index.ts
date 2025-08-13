// Import and register all schemas in the correct order
import "./ContentSchema";
import "./MainTitleSchema";

// Re-export the models
export { default as Content } from "./ContentSchema";
export { default as MainTitle } from "./MainTitleSchema";

