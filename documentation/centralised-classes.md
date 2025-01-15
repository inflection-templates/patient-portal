# Centralizing Classes into `app.css` with Tailwind CSS

In Tailwind CSS, you can use the `@apply` directive to move common utility classes into a centralized `app.css` file. This can help reduce clutter in your HTML files and maintain a cleaner structure for styling.

## Steps to Centralize Classes

**Create component file name Card.svelte**

```Card.svlete

<div class="card">
  <h2 class="heading">About us</h2>
  <button class="btn">Click Me</button>
</div>

```

**use above code classes into app.css and style them**

```app.css

.card {
  @apply p-4 bg-white shadow-lg rounded-lg;
}
.heading{
    @apply text-base text-center;
}
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600;
}


```
