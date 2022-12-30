/**
 * 自定义时间触发器
 * @param el 触发源
 * @param eventName 实践名
 * @param detail
 */

export function customEventTrigger(el: HTMLElement | Window | Document, eventName: string, detail?: any) {
  const supportCustomEvent = typeof window.CustomEvent === 'function';
  let event;
  if (supportCustomEvent) {
    event = new CustomEvent(eventName, { detail });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, detail);
  }

  el.dispatchEvent(event);
}
