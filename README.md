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

```js
    // load and execute the script at the given path
    loadScript('/my/script.js');
```

The script is executed *asynchronously*, as it starts loading now, but runs later, when the function has already finished.

If there’s any code below `loadScript(…)`, it doesn’t wait until the script loading finishes.

```js
    loadScript('/my/script.js');
    // the code below loadScript
    // doesn't wait for the script loading to finish
    // ...
```

And so, if we want to load several scripts, each one using the functions defined in the former ones we have to express our dependencies introducing a callback argument and nesting the succesive callbacks inside the callbacks:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <p id="out"></p>
    <script>
      'use strict';
      let out = document.querySelector('p');

      function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;
      
        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));
      
        document.head.append(script);
      }
           
      loadScript('/script-1.js', (error, script) => {
        if (error) {
          console.error( error ); 
        } else {
          const message = `Cool!, the script '${script.src}' is loaded: "${hello()}"`;
          out.innerHTML = message;
          console.log(message);

          loadScript('/script-2.js', (error, script) => {
            if (error) {
              console.error( error ); 
            } else {
              const message = `Great!, the script '${script.src}' is loaded: "${world()}"`;
              out.innerHTML += `<br/>${message}`;
              console.log(message);
              loadScript('script-3.js', (error, script) => {
                if (error) {
                  console.error( error );
                } else {
                  const message = `Unbelievable!, the script '${script.src}' is loaded: "${ull()}"`;
                  out.innerHTML += `<br/>${message}`;
                  console.log(message);
                  // ...continue after all scripts are loaded 
                }
              });
            }
          })
        }
      });
      </script>      
  </body>  
</html>
```


https://webpack.js.org/guides/getting-started/

https://www.npmjs.com/package/async-es

https://javascript.info/callbacks

https://webpack.js.org/configuration/dev-server/