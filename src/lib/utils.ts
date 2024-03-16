import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const URL = `${(import.meta.env.VITE_NODE_ENV==="development") ? "http://localhost:8080": ""}`
export const LOCAL_STORAGE_ACCESS_TOKEN = "lc-access-token"
