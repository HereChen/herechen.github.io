/**
 * load js
 */
const load = (path, {
  isCss = false,
  callback = () => {}
}  = {}) => {
  const doc = document;
  let e;
  if (isCss || /\.css$/.test(path)) {
    // load css
    e = doc.createElement('link');
    e.href = path;
    e.rel = 'stylesheet';
  } else {
    // load js
    e = doc.createElement('script');
    e.src = path;
    e.async = true;
  }

  e.onload = e.onerror = e.onbeforeload = (ev) => {
    callback(ev);
  }

  doc.head.appendChild(e);
}

/**
 * prefetch page
 */
export const loadInstantClick = () => {
  load('https://cdn.jsdelivr.net/npm/instantclick@3.1.0-2/dist/instantclick.min.js', {
    callback: () => {
      InstantClick.init();
    }
  });
}

/**
 * load font
 */
export const loadGoogleFont = () => {
  load('https://fonts.googleapis.com/css?family=Noto+Sans+SC:400,700|Noto+Sans:400,700&display=swap', { isCss: true })
}

/**
 * change title when user switch to another page.
 */
export const changeTitleAfterPageHidden = ({
  visibleTitle = document.title,
  hiddenTitle = '(●—●) ha, catch you'
} = {}) => {
  if (typeof document.addEventListener !== "undefined" && typeof document.hidden !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        document.title = hiddenTitle;
      } else {
        document.title = visibleTitle;
      }
    }, false);
  }
}
