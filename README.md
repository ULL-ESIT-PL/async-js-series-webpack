Take a look at the function `loadScript(src)`, that loads a script with the given `src`:

```js
    function loadScript(src) {
      // creates a <script> tag and append it to the page
      // this causes the script with given src to start loading and run when complete
      let script = document.createElement('script');
      script.src = src;
      document.head.append(script);
    }
```

It appends to the document the new, dynamically created, tag `<script src="…">` with given `src`. The browser automatically starts loading it and executes when complete.

We can use this function like this:

    // load and execute the script at the given path
    loadScript('/my/script.js');

The script is executed “asynchronously”, as it starts loading now, but runs later, when the function has already finished.

If there’s any code below `loadScript(…)`, it doesn’t wait until the script loading finishes.

    loadScript('/my/script.js');
    // the code below loadScript
    // doesn't wait for the script loading to finish
    // ...

Let’s say we need to use the new script as soon as it loads. It declares new functions, and w


https://webpack.js.org/guides/getting-started/

https://www.npmjs.com/package/async-es

https://javascript.info/callbacks

https://webpack.js.org/configuration/dev-server/