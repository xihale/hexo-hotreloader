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

If it's not working, try to refresh the page once again.

If it still not working, please try to restart the server or [open an issue](https://github.com/xihale/hexo-hotreloader/issues)
