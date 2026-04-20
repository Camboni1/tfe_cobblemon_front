import { env } from '@/lib/config/env';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
    method?: HttpMethod;
    body?: unknown;
    params?: Record<string, string | number | boolean | undefined | null>;
}

function buildUrl(path: string, params?: FetchOptions['params']): string {
    const url = new URL(`${env.apiBaseUrl}${path}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.set(key, String(value));
            }
        });
    }
    return url.toString();
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const { method = 'GET', body, params } = options;

    const response = await fetch(buildUrl(path, params), {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error = await response.text().catch(() => 'Erreur inconnue');
        throw new Error(`API ${method} ${path} → ${response.status}: ${error}`);
    }

    // 204 No Content
    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}