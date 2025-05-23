export function applyAttributes(
  element: HTMLElement,
  attributes: Record<string, any>
) {
  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'function' && key.startsWith('on')) {
      // Convert "onClick" -> "click"
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else {
      if (key === 'style' && typeof value === 'object') {
        Object.entries(value).forEach(([styleKey, styleValue]) => {
          (element as HTMLElement).style[styleKey as any] = styleValue;
        });
        return;
      }

      element.setAttribute(key, value);
    }
  });
}
