/**
 * CloudFront Function: URL Rewrite for Static Export
 *
 * Rewrites extensionless locale paths to their .html equivalents.
 * Required because Next.js static export generates en.html, ta.html
 * but users access /en and /ta paths.
 *
 * Examples:
 *   /en     -> /en.html
 *   /ta     -> /ta.html
 *   /en/    -> /en.html
 *   /ta/    -> /ta.html
 */
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Rewrite locale paths to .html files
    // Match /en or /en/ or /ta or /ta/
    if (uri === '/en' || uri === '/en/') {
        request.uri = '/en.html';
    } else if (uri === '/ta' || uri === '/ta/') {
        request.uri = '/ta.html';
    }

    return request;
}
