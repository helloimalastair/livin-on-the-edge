# Livin' on the Edge

Based on [Dinesh Pandiyan](https://twitter.com/flexdinesh)'s [Blogster Sleek](https://github.com/flexdinesh/blogster/tree/main/templates/sleek).

This time we're doing it open source. Still a work in progress, so don't be surprised if everything gets shifted around a ton.

I would note too that this repo is open source, which means you can fork it and use it for your own site, though I wouldn't _exactly_ recommend doing that. This repo is heavily customized from the original, and pretty opinionated, so check out Blogster if you would like to start your own.

## Deployment

This site is deployed using [Cloudflare Pages](https://pages.cloudflare.com/). It's a pretty cool service, and I would recommend it if you're looking for a free static site host.

Commands:

```sh
$ pnpm build
# The above command will log a Style Hash value. Save this, it will be important later.
$ pnpm run deploy
```

## Rules

- [Custom Domain Redirect](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)
- HTML Header Addition
  Because Pages doesn't allow you to set custom headers based on `Content-Type`, we have to add a [Response Header Transform Rule](https://dash.cloudflare.com/?to=/:account/:zone/rules/transform-rules/modify-response-header/new). Here's the rule(replace `www.goalastair.com` with your own domain):

```
(http.host eq "www.goalastair.com" and http.response.content_type.media_type eq "text/html")
```

And here's the headers to add:

- `content-security-policy`(Replace `HASH` with the Style Hash from above):

```
"default-src 'none'; script-src 'self' 'sha256-FKtXG4kEbTJAOvAMHspGJQUMjmZzyhu5qJHf3lm+xuc='; style-src 'self' 'HASH'; img-src 'self'; font-src 'self'; upgrade-insecure-requests; block-all-mixed-content; base-uri 'self'; manifest-src 'self'"
```

- `permissions-policy`:

```
accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()
```

- `referrer-policy`:

```
strict-origin-when-cross-origin
```

**NOTE:** The CSP header should be updated _every time_ you change the fonts used in the site.
