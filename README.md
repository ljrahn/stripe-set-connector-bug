# Stripe Error: TypeError: element.setConnector is not a function

## Steps to reproduce

- `npm install`
- `npm run server`
- `npm run dev`
- Enter a valid stripe secret key, stripe publishable key, and connected account id, then click `Show Payments Component`

## Behavior

First time clicking `Show Payments Component` TypeError: element.setConnector gets thrown. You can close the error, and the component will show. If you uncheck and recheck the checkbox, the error does not appear.

NOTE: that dev server mounts components twice, so two network requests get performed. If you run in production (`npm run build && npm run start`) the error doesn't occur.
