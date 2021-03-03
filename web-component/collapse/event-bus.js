class EventBus {
  constructor() {
    this.events = {};
  }

  on(evtName, handler) {
    if (!this.events[evtName]) this.events[evtName] = [];
    this.events[evtName].push(handler);
  }

  emit(evtName, ...args) {
    this.events[evtName] &&
      this.events[evtName].forEach((handler) => {
        handler.apply(null, args);
      });
  }

  cancel(evtName, handler) {
    this.events[evtName] &&
      (this.events[evtName] = this.events[evtName].filter((h) => h !== handler));
  }
}

export default EventBus;
