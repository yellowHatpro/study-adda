import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const URL = import.meta.env.VITE_HOST;
export const LOCAL_STORAGE_ACCESS_TOKEN = "lc-access-token";
export const USER_NO_ROOM_JOINED = "user has not joined any room yet";
export const NETWORK_ISSUE = "network issue";
