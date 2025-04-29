## Technologies
* PHP 8.3
* SQLite Database
* Redis for caching
* Stripe for Payment
* React with TypeScript
* Gemini as LLM Model with structure JSON response
* Scramble as an API Docs Generator

### Setup
Run the setup script
```shell
./bin/install.sh
```

add environtment files:

### Stripe Setup
Forward the stripe events to webhooks
```shell
stripe listen --forward-to http://keera-docs.test/stripe/webhook --api-key sk_test_51REFNkRBEjHNz432LBV03zN4LIaxK3ejg9dsnSAEqyEZT8SEaBQj6iXiV3moc7Z1EYWtA0MX2mjwOAycipGrq04T00cTZBcGwW
```
and Copy the webhook_secret to .env file.
