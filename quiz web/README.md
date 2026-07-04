# Quiz App

A simple browser-based quiz: pick your settings on the home page, answer questions with an optional
per-question timer, and see your score + timing stats on the results page.

No backend needed — everything runs client-side using `localStorage` to pass data between pages.

## Running locally
Just open `index.html` in a browser, or serve the folder with any static server
(e.g. VS Code's "Live Server" extension) so `localStorage` behaves consistently.

## Editing questions
Add/edit entries in `question.js`. Each question looks like:
```js
{
  question: "What is 2 + 2?",
  options: ["3", "4", "5", "22"],
  answer: 1 // index of the correct option (0-based)
}
```

## Deployment
Hosted for free on GitHub Pages — see repo settings or the setup guide shared alongside this project.
