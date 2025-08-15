import { createContext } from "react";

/**
 * Create PathContext to store the currentPath of the page the user is currently on.
 * This will be used to check if a link is partially active outside of Gatsby Link
 * components.
 * 
 * Default value: "/"
 */
export const PathContext = createContext("/");