function port(value: unknown, fallback: number, name: string): number {
  if (value === undefined || value === '') return fallback;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1 || number > 65535) throw new Error(`${name} must be an integer from 1 to 65535`);
  return number;
}

export function validateEnvironment(env: Record<string, unknown>) {
  const keys = ['MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_DATABASE', 'MYSQL_USER', 'MYSQL_PASSWORD'];
  const configured = keys.some(key => typeof env[key] === 'string' && String(env[key]).length > 0);
  if (configured) {
    for (const key of ['MYSQL_HOST', 'MYSQL_DATABASE', 'MYSQL_USER']) {
      if (typeof env[key] !== 'string' || !String(env[key]).trim()) throw new Error(`Incomplete database configuration: ${key} is required`);
    }
  }
  return {
    ...env, PORT: port(env.PORT, 3000, 'PORT'), HOST: env.HOST || '127.0.0.1',
    MYSQL_PORT: port(env.MYSQL_PORT, 3306, 'MYSQL_PORT'), DATABASE_CONFIGURED: configured
  };
}
