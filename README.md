# es6-promise-debounce
ensure a Promise-returning function is not called until it hasn't been called
for a certain amount of time.

[![build badge][]][build status]

[build status]: https://travis-ci.org/bollwyvl/es6-promise-debounce#
[build badge]: https://travis-ci.org/bollwyvl/es6-promise-debounce.svg

For implementations of the [ES6 Promise API](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-api):
- [`es6-promise`](https://github.com/jakearchibald/es6-promise)

Inspired by
- [`_.debounce`](http://underscorejs.org/#debounce)
- [`Qdebounce`](https://github.com/gre/Qdebounce)

and others.

## Usage
See [tests](./tests).

## Testing
```bash
npm install
npm test
```

## TODO
- repeat tests for other implementations:
  - native
  - Q
  - RSVP
  - Blubeird
  - etc.

## License

    The MIT License (MIT)

    Copyright (c) 2014 Nicholas Bollweg

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.