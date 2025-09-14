/**
 * Utility functions for date formatting
 */

export function formatDate(dateString: string | null | undefined, options?: Intl.DateTimeFormatOptions): string {
  if (!dateString) {
    return "Date unknown";
  }

  try {
    // Handle ISO date strings and ensure proper parsing
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC" // Ensure consistent formatting across timezones
    };

    return date.toLocaleDateString("en-US", { ...defaultOptions, ...options });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
}

export function formatShortDate(dateString: string | null | undefined): string {
  return formatDate(dateString, {
    month: "short",
    day: "numeric"
  });
}

export function formatDateTime(dateString: string | null | undefined): string {
  return formatDate(dateString, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
