/** Only public transport types. No framework or server dependencies. */
export interface ApiResponse<T> { data: T; }

export interface DemoCourse {
  id: string;
  name: string;
  category: string;
  teachingMode: 'group' | 'private';
  minAge: number;
  maxAge: number;
  durationMinutes: number;
  priceCents: number;
  description: string;
}

export interface HealthStatus {
  status: 'ok';
  service: 'lemiao-api';
  database: 'not_configured' | 'connected';
  dataSource: 'demo';
}
