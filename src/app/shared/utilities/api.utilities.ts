/**
 * Replaces placeholders in a URL template with actual values.
 * Example:
 *   buildUrl('provider/{id}/name/{name}', { id: 123, name: 'abc' })
 *   => 'provider/123/name/abc'
 */
export function buildUrl(template: string, params: Record<string, string | number>): string {
    return template.replace(/{(\w+)}/g, (_, key) => {
        if (params[key] === undefined) {
            throw new Error(`Missing value for URL parameter: ${key}`);
        }
        return encodeURIComponent(String(params[key]));
    });
}