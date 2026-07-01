import { Injectable, signal } from '@angular/core';

export interface SavedTemplate {
  id: string;
  name: string;
  items: any[];   // BulkItem[]
}

@Injectable({ providedIn: 'root' })
export class TemplatesService {

  private templates = signal<SavedTemplate[]>([]);

  constructor() {
    // Load from local storage if exists
    const saved = localStorage.getItem('orderTemplates');
    if(saved) this.templates.set(JSON.parse(saved));
  }

  get all() {
    return this.templates();
  }

  saveTemplate(name: string, items: any[]) {
    const data: SavedTemplate = {
      id: crypto.randomUUID(),
      name,
      items: structuredClone(items)
    };
    this.templates.update(v => [...v, data]);
    this.persist();
  }

  deleteTemplate(id: string) {
    this.templates.update(v => v.filter(t => t.id !== id));
    this.persist();
  }

  getTemplate(id: string): SavedTemplate | undefined {
    return this.templates().find(t => t.id === id);
  }

  persist() {
    localStorage.setItem('orderTemplates', JSON.stringify(this.templates()));
  }
}
