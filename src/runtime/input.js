// The only owner of gesture timers/listeners. Legacy command mappings receive this scope.
export class Gesture {
  constructor() { this.cancelled = false; this.releasing = false; this.repeating = false; this.timers = new Set(); this.cleanup = []; }
  onRelease(fn) { this.cleanup.push(fn); }
  setInterval(fn, delay) {
    if (this.cancelled) return undefined;
    const timer = setInterval(() => { if (!this.cancelled) { this.repeating = true; try { fn(); } finally { this.repeating = false; } } }, delay);
    this.timers.add(timer); return timer;
  }
  finish() {
    if (this.cancelled) return;
    this.cancelled = true;
    this.timers.forEach(clearInterval); this.timers.clear();
    this.releasing = true;
    for (const fn of this.cleanup.splice(0)) fn();
    this.releasing = false;
  }
}
export class InputController {
  constructor(root, dispatch, isHidden) {
    this.root = root; this.dispatch = dispatch; this.isHidden = isHidden;
    this.listeners = [];
    this.listen(root, 'pointerdown', event => this.start(event));
    this.listen(root, 'keydown', event => { if (['Enter',' '].includes(event.key)) { event.preventDefault(); if (!event.repeat) this.start(event); } });
    this.listen(root, 'keyup', event => { if (['Enter',' '].includes(event.key)) { event.preventDefault(); this.end(event, true); } });
    this.listen(root.ownerDocument, 'keyup', event => {
      if (this.active?.key && event.key === this.active.key) this.end(event,true);
    });
    this.listen(root, 'focusout', event => {
      if (this.active?.key && event.target === this.active.button && !this.active.button.contains(event.relatedTarget)) this.cancel();
    });
    this.listen(root, 'click', event => {
      const button = event.target.closest?.('button');
      if (!button || this.isHidden(button) || button.disabled) return;
      event.preventDefault();
      // Native pointer/keyboard clicks follow events already handled above. detail=0 covers AT.
      if (button === this.suppressButton && Date.now() < this.suppressUntil) { this.suppressButton = undefined; return; }
      if (event.detail === 0) this.dispatch(button.id, 'click', new Gesture());
    });
    this.listen(root.ownerDocument, 'pointerup', event => this.end(event, true));
    this.listen(root.ownerDocument, 'pointercancel', event => this.end(event, false));
    this.listen(root, 'lostpointercapture', event => this.end(event, false));
    this.listen(root.ownerDocument.defaultView, 'blur', () => this.cancel());
    this.listen(root.ownerDocument, 'visibilitychange', () => { if (root.ownerDocument.hidden) this.cancel(); });
  }
  listen(target, type, fn) { target.addEventListener(type, fn); this.listeners.push(() => target.removeEventListener(type, fn)); }
  start(event) {
    const button = event.target.closest?.('button');
    if (!button || this.isHidden(button) || button.disabled || this.active || event.button > 0 || event.isPrimary === false) return;
    event.preventDefault();
    const gesture = new Gesture();
    this.suppressButton = undefined;
    this.active = { button, pointerId: event.pointerId, key: event.key, gesture, held: false };
    if (event.pointerId !== undefined) { try { button.setPointerCapture(event.pointerId); } catch { /* document listeners still capture release */ } }
    this.timer = setTimeout(() => {
      if (!this.active || gesture.cancelled) return;
      this.active.held = true; this.dispatch(button.id, 'hold', gesture);
    }, 500);
  }
  end(event, activate) {
    const active = this.active;
    if (!active || event?.pointerId !== undefined && event.pointerId !== active.pointerId || event?.key && event.key !== active.key) return;
    this.active = undefined; clearTimeout(this.timer);
    this.suppressButton = active.button;
    this.suppressUntil = Date.now() + 1000;
    if (activate && !active.held) this.dispatch(active.button.id, 'click', active.gesture);
    // Completed taps must run even if waiting on another service. Only hold/repeat queues cancel.
    if (active.held || !activate) active.gesture.finish();
    if (active.pointerId !== undefined) { try { active.button.releasePointerCapture(active.pointerId); } catch { /* capture can already be lost */ } }
  }
  cancel() { this.end(undefined, false); }
  destroy() { this.cancel(); this.listeners.splice(0).forEach(remove => remove()); }
}
