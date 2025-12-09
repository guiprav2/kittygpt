# Webfoundry Agents Guide (`AGENTS.md`)

This guide explains how **projects inside Webfoundry** are structured and how to use its features.

---

## 📌 General Guidelines

* In Webfoundry, a div right under body is the page root, not body itself. Make sure all page content is wrapped inside that root div.
* Always use `let`, never `const`.
* Ignore webfoundry/{scripts,templates}.json, they're fully managed by Webfoundry.
* Never put long JavaScript or script tags in HTML, always put them in a controller and call using wf-onattach or other event handler attributes.
* Event handlers must be JavaScript expressions, never statements (if needed use an IIFE).
* When calling post('ctrl.action') inside an event handler such as wf-onclick, wf-oninput, etc: Don't use await, those handlers are not async functions.
* wf-value already wires two-way binding—never add wf-oninput, wf-onchange, or wf-onkeydown on that same element for setting the binding. If you need to react to Enter, wf-onkeydown is OK.
* `_1` is a special variable only available in wf-onattach and wf-ondetach. Other event handlers only have `event`. And bindings have no special variables besides globals and wf-map scoped variables.

---

## 📂 Project Structure

```
project/
 ├─ controllers/   # Controller classes (state + actions)
 ├─ pages/         # HTML files (edited in Webfoundry’s visual editor or directly)
 ├─ media/         # Project media (optional, add subdirs if desired)
 └─ AGENTS.md      # This file
```

* **controllers/**: one class per file, default export.
* **pages/**: HTML entrypoints, can contain bindings (`wf-if`, `wf-map`, `wf-on*`, `{{...}}`).
* **images/**: assets referenced from pages or controllers.

---

## 🧩 Controllers

Example:

```js
// controllers/App.js
export default class App {
  state = { input: '', items: [], warn: false };

  actions = {
    addItem: () => {
      this.state.items.push({ name: 'foo', value: 42 });
    },
  };
}
```

* **State**: global, e.g. `state.app.input`.
* **Actions**: call via `post('app.addItem')`.
* **Direct state mutation** is allowed, but use actions if side effects are desirable.

---

## 🖇 Bindings & Directives

Webfoundry templates support **declarative bindings**:

### Mustache Text

```html
<span>Hello {{state.app.input}}</span>
```

### Property bindings

```html
<input wf-src="state.app.src">
<input wf-alt="state.app.alt">
<input wf-value="state.app.input">
<input wf-checked="state.app.checked">
<input wf-disabled="state.app.disabled">
```

### Conditional Rendering (`wf-if`)

```html
<div wf-if="state.app.warn">Warning!</div>
```

### List Rendering (`wf-map`)

```html
<div wf-map="x of state.app.items">{{x.name}}: {{x.value}}</div>
```

### Event Handlers (`wf-on*`)

```html
<button wf-onclick="post('app.addItem')">Add</button>
```

* Any DOM event can be bound by replacing `*` with the event name (`wf-oninput`, `wf-onchange`, etc.).
* The attribute value is a JS expression executed when the event fires.

### Special Lifecycle Events

```html
<div wf-onattach="console.log('attached', _1)" wf-ondetach="console.log('detached', _1)"></div>
```

* `wf-onattach`: runs when element is attached to DOM, \_1 is the element.
* `wf-ondetach`: runs when element is removed from DOM, \_1 is the element.
* Use for initialization/cleanup logic.

---

## 🔄 Lifecycle & Rendering

* Pages under `pages/` are loaded and routed automatically by Webfoundry’s App class.
* HTML gets compiled into reactive DOM; state changes trigger updates.
* Agents should not re-render manually; mutate state or call actions instead.

---

## 🌍 Scope & Expressions

* Bindings and directives can access any controller state: `state.<controller>.<field>`.
* `wf-map` introduces loop variables usable in mustache bindings.
* `post()` should only be used in event handlers, not in reactive bindings.

---

## 🎨 Styling

* Tailwind utility classes are always available.
* Google Fonts can be injected via `gfont-[Font_Name]` classes.
* Use `wf-class` for dynamic class binding.

---

## ⚡ Cross-Controller Usage

* It is valid to reference any controller’s state or call any action from anywhere.
* Example:

  ```html
  <div wf-if="state.user.loggedIn">Welcome {{state.user.name}}</div>
  <button wf-onclick="post('settings.toggleTheme')">Switch Theme</button>
  ```

---

## 💾 Persistence

* State is **not persisted automatically**.
* Persistence must be implemented explicitly in controllers or imported modules.

---

## 🧭 Best Practices

* **Mutate state directly** when only UI updates are needed.
* **Use actions** when updates have side effects or should be explicit.
* Avoid manual DOM manipulation; rely on bindings/directives.
* Do not perform cleanups/optimizations unless explicitly required.

---

## 📌 Quick Reference

* **Access state**: `state.<controller>.<field>`
* **Call action**: `post('<controller>.<action>', ...args)`
* **Text binding**: `{{expr}}`
* **Two-way binding**: `<input wf-value="...">`
* **Conditionals**: `wf-if="expr"`
* **Lists**: `wf-map="x of expr"`
* **Events**: `wf-on<event>="expr"`
* **Lifecycle hooks**: `wf-onattach`, `wf-ondetach`
* **Pages**: live in `pages/`, must include `<script type="module" src="../webfoundry/head.js"></script>` in `<head>`
