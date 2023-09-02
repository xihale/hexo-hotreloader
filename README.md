# hexo-hotReloader

## Start up

### How it works

When you use `hexo s` or `hexo server` and enabled it,
it will run a websocket server(default port is `3000`) and insert the javascript code to every page

### Install

```shell
npm i hexo-hotreload
```

### Enable it

in `config.yaml`
```yml
hotreload:
  enable: true
  port: 3007
```

### Bugs

If it's not working, you can try to modifly your content or run `hexo clean` to trigger the hexo's uploader event.

If it's still not working, refresh the page and server then try again.
