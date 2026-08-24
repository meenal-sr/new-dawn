//global imports here
import lazysizes from 'lazysizes';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/respimg/ls.respimg';
//lazyload image dependencies
lazysizes.cfg.loadMode = 1; //init lazyload

window.debounce = function(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
};

window.trapFocusHandlers = {};

window.removeTrapFocus = function(elementToFocus = null) {
  document.removeEventListener('focusin', window.trapFocusHandlers.focusin);
  document.removeEventListener('focusout', window.trapFocusHandlers.focusout);
  document.removeEventListener('keydown', window.trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
};

window.trapFocus = function(handlers, elementToFocus = handlers.container) {
  var elements = handlers.container.querySelectorAll(
    'summary, a[href], button:enabled, [tabindex]:not([tabindex^="-"]), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe'
  );
  var first = elements[0];
  var last = elements[elements.length - 1];

  window.removeTrapFocus();

  window.trapFocusHandlers.focusin = (event) => {
    if (event.target !== handlers.container && event.target !== last && event.target !== first) return;
    document.addEventListener('keydown', window.trapFocusHandlers.keydown);
  };

  window.trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', window.trapFocusHandlers.keydown);
  };

  window.trapFocusHandlers.keydown = function(event) {
    if (event.code.toUpperCase() !== 'TAB') return;
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }
    if ((event.target === handlers.container || event.target === first) && event.shiftKey) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', window.trapFocusHandlers.focusout);
  document.addEventListener('focusin', window.trapFocusHandlers.focusin);

  if (elementToFocus) elementToFocus.focus();
};

// Expose them locally for this file just in case
const debounce = window.debounce;
const trapFocus = window.trapFocus;
const removeTrapFocus = window.removeTrapFocus;

document.addEventListener('DOMContentLoaded', () => {


    
})