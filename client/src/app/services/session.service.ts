import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() {}

  setItem(key: string, value: any) {
    const jsonValue = JSON.stringify(value);
    sessionStorage.setItem(key, jsonValue);
  }

  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
