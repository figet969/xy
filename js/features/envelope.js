/* Modified envelope rendering to avoid inline onclick and use data attributes + event delegation
   - Replace inline onclick="viewEnvLetter('outbox','...')" / delete buttons with data attributes
   - Add an envelope event handler initializer `initEnvelopeEventHandlers` which binds click handlers via delegation
   - Escapes inserted text content to avoid breaking HTML
*/

// --- Helper: escape HTML for safe insertion when using template strings ---
function escapeHtml(s) {
    if (!s && s !== 0) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Existing variables and functions remain. We only change renderOutboxList/renderInboxList to use data-* attributes

