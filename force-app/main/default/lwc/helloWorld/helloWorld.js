import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track time = '';
  @track date = '';
  @track day = '';

  connectedCallback() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000); // Update every second
  }

  updateClock() {
    const now = new Date();
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsDay = { weekday: 'long' };

    this.time = now.toLocaleTimeString();
    this.date = now.toLocaleDateString(undefined, optionsDate);
    this.day = now.toLocaleDateString(undefined, optionsDay);
  }
}