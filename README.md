# Safe Tape Runner

A tape runner that always exits with code `0`. This allows us to play nice on Windows and keep our npm scripts composable. 

Exiting with the right code should be the reporters job anyway.

### But what about CI?

See the [usage section](https://github.com/MadLittleMods/safe-tape-runner#usage). Just pipe to a reporter like [`tap-spec`](https://www.npmjs.com/package/tap-spec).


## Latest version: `v0.1.3`

### [Changelog](https://github.com/MadLittleMods/safe-tape-runner/blob/master/CHANGELOG.md)

### Install

`npm install safe-tape-runner --save-dev`


# Usage

```
safe-tape-runner test.js
```

If you pipe to a reporter like [`tap-spec`](https://www.npmjs.com/package/tap-spec), it will exit with the proper code, `0` for passing and `1` for failing.
```
safe-tape-runner test.js | tap-spec
```

You can also use glob patterns because we pass through to [`babel-tape-runner`](babel-tape-runner):
```
safe-tape-runner lib/**/__tests__/*-test.js
```

## Usage in `package.json`


`package.json`
```json
{
  "scripts": {
    "test": "npm run test-unformatted | tap-spec",
    "test-unformatted": "safe-tape-runner ./tests/test.js"
  },
}
```


# Testing

`npm test`
