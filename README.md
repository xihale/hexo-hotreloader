# hexo-hotReloader

## Start up

### How it works
When you use `hexo s` or `hexo server` and enabled it,
it will run a websocket server on port 3000 and insert the javascript code to every page

> When you deploy, you should clean it, because there was its cache code.

### Install

```shell
npm i hexo-hotreload
```

### Enable it
in `config.yaml`
```yml
hotreload:
  enable: true
```
