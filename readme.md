### Stripe Setup
Forward the stripe events to webhooks
```shell
stripe listen --forward-to http://keera-docs.test/stripe/webhook --api-key sk_test_51REFNkRBEjHNz432LBV03zN4LIaxK3ejg9dsnSAEqyEZT8SEaBQj6iXiV3moc7Z1EYWtA0MX2mjwOAycipGrq04T00cTZBcGwW
```
and Copy the webhook_secret to .env file.
