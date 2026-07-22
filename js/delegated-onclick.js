// Delegates existing inline onclick attributes to event listeners at runtime.
// This centralizes onclick execution in try/catch wrappers and prevents certain parser-time issues
// when code is generated dynamically. It preserves behavior but logs errors instead of letting
// an exception kill page scripts.

document.addEventListener('DOMContentLoaded', function() {
    try {
        const els = Array.from(document.querySelectorAll('[onclick]'));
        els.forEach(el => {
            try {
                const code = el.getAttribute('onclick');
                if (!code) return;
                // Remove the attribute to avoid double execution or CSP issues
                el.removeAttribute('onclick');
                // Create a wrapper function that receives the event
                const handler = new Function('event', `try{ ${code} }catch(e){ console.error('delegated onclick error:', e); }`);
                el.addEventListener('click', function(event) {
                    try { handler.call(this, event); }
                    catch (e) { console.error('delegated click handler failed:', e); }
                });
            } catch (e) {
                console.warn('failed to delegate an onclick:', e);
            }
        });
    } catch (e) {
        console.warn('delegated-onclick init failed:', e);
    }
});
