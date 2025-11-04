// Storage interface for future use
// This app is currently stateless and doesn't require data persistence
// Storage can be added later if needed for features like saving reports, user preferences, etc.

export interface IStorage {
  // Add storage methods here as needed
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage if needed
  }
}

export const storage = new MemStorage();
