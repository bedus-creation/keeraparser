# Keera Parser
Keera Parser is a SaaS platform designed to extract structured data from PDF documents and convert them into a predefined JSON format. Currently, it supports parsing resumes/CVs into structured JSON. It’s built using Laravel and leverages the Gemini LLM.

### Features
* Supports parsing of multiple PDF files into a structured JSON format
* Customizable JSON output structure
* REST API available for integration
* Built-in rate limiting for API usage
* Stripe integration for payments

### Technologies
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

add environment files:
```dotenv
GEMINI_API_KEY=

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

STRIPE_KEY=your-stripe-key
STRIPE_SECRET=your-stripe-secret
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### Stripe Setup
Forward the stripe events to webhooks
```shell
stripe listen --forward-to http://keera-docs.test/stripe/webhook --api-key sk_test_51REFNkRBEjHNz432LBV03zN4LIaxK3ejg9dsnSAEqyEZT8SEaBQj6iXiV3moc7Z1EYWtA0MX2mjwOAycipGrq04T00cTZBcGwW
```
and Copy the webhook_secret to .env file.
