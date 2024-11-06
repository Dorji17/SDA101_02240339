class CustomCard extends HTMLElement {
    constructor() {
      super();
      
      // Attach shadow DOM
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Create a template for the card structure
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          /* Styling using CSS custom properties */
          .card {
            background-color: var(--card-background, #fff);
            border: 1px solid var(--card-border-color, #ddd);
            border-radius: var(--card-border-radius, 10px);
            box-shadow: var(--card-shadow, 0 4px 8px rgba(0, 0, 0, 0.1));
            overflow: hidden;
            font-family: Arial, sans-serif;
            max-width: 300px;
            color: #333;
          }
          .header, .content, .footer {
            padding: 16px;
          }
          .header {
            font-size: 1.25em;
            font-weight: bold;
            color: var(--header-color, #333);
          }
          .content {
            color: var(--content-color, #555);
          }
          .footer {
            text-align: right;
            font-size: 0.9em;
            color: var(--footer-color, #777);
            border-top: 1px solid var(--card-border-color, #ddd);
          }
        </style>
  
        <!-- Card structure with named slots -->
        <div class="card">
          <div class="header">
            <slot name="header">Default Header</slot>
          </div>
          <div class="content">
            <slot name="content">Default Content</slot>
          </div>
          <div claslos="footer">
            <slot name="footer">Default Footer</slot>
          </div>
        </div>
      `;
  
      // Append template content to the shadow DOM
      shadow.appendChild(template.content.cloneNode(true));
    }
  }
  
  // Define the custom element
  customElements.define('custom-card', CustomCard);

  class ToggleButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = localStorage.getItem('toggleState') === 'on';  // Load initial state from localStorage
      this.render();
    }
  
    connectedCallback() {
      this.shadowRoot.querySelector('button').addEventListener('click', this.toggle.bind(this));
    }
  
    toggle() {
      this.state = !this.state;
      localStorage.setItem('toggleState', this.state ? 'on' : 'off');  // Save state to localStorage
      this.dispatchEvent(new CustomEvent('toggle-changed', { detail: { state: this.state } }));
      this.render();
    }
  
    render() {
      const color = this.state ? 'green' : 'red';
      const text = this.state ? 'ON' : 'OFF';
  
      this.shadowRoot.innerHTML = `
        <style>
          button {
            padding: 15px 30px;
            font-size: 20px;
            border: none;
            border-radius: 5px;
            color: white;
            background-color: ${color};
            cursor: pointer;
            transition: background-color 0.3s;
          }
        </style>
        <button>${text}</button>
      `;
    }
  }
  
  customElements.define('toggle-button', ToggleButton);