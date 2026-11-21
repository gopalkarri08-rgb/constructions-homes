# Constructions.homes

Independent guidance for people building an independent house in India. The public site explains the problem and shows the eight stages as glimpses. The standards, checklists, and red flags open only for a logged-in member whose plan covers that stage.

## Membership setup

Run the SQL migration, then set the environment variables below in `.env.local` and in the Vercel project. The app builds without them. Missing Supabase keys show “Accounts are not connected yet”. Missing Razorpay keys show “Payments coming soon”.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key, used in the browser and for the user session. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only. Writes memberships and the payment log. Never expose it to the client. |
| `RAZORPAY_KEY_ID` | Razorpay key id (`rzp_test_…` in test mode). Sent to Checkout only after a server route creates an order. |
| `RAZORPAY_KEY_SECRET` | Server-only. Creates orders and subscriptions, and checks payment signatures. |
| `RAZORPAY_WEBHOOK_SECRET` | Server-only. Verifies `X-Razorpay-Signature` on the webhook. |
| `RAZORPAY_MONTHLY_PLAN_ID` | Razorpay plan id for the ₹999 monthly subscription. |

### Database migration

In the Supabase SQL editor, or with the Supabase CLI, run:

`supabase/migrations/20261121120000_membership.sql`

That creates `profiles`, `memberships`, and `payments`. Row level security lets a user read only their own rows. There are no insert or update policies for signed-in users. Membership and payment writes go through the service role. A profile row is created by a security-definer trigger from the name and location collected at email signup.

### Supabase redirect URLs

In Supabase: Authentication → URL configuration.

- Site URL: `https://constructions.homes` (use `http://localhost:3000` for local work)
- Redirect URLs:
  - `http://localhost:3000/auth/callback`
  - `https://constructions.homes/auth/callback`
  - `https://*.vercel.app/auth/callback`

Email confirmation and password reset both return to `/auth/callback`. Google sign-in uses the same callback. In Authentication → Providers, enable Google and add the Google client id and secret. Until that is done, the Google button explains that it is not turned on and email login still works.

### Razorpay

Create a test-mode key pair and a monthly plan for ₹999. Put the plan id in `RAZORPAY_MONTHLY_PLAN_ID`.

Webhook URL:

`https://constructions.homes/api/razorpay/webhook`

For a Vercel preview, use that deployment’s host with the same path. The webhook secret in the Razorpay dashboard must match `RAZORPAY_WEBHOOK_SECRET`.

Subscribe the endpoint to these events:

- `payment.captured`
- `subscription.activated`
- `subscription.charged`
- `subscription.cancelled`
- `subscription.completed`
- `subscription.halted`

`payment.captured` is a backup for the Full Project Pass and stage-wise orders. Subscription events activate, extend, and cancel the monthly plan. The handler ignores duplicate payment and event ids.

The monthly subscription is created with 60 billing cycles so it continues until the member cancels. Cancel on the account page stops it at the end of the current period.

## Scripts

```bash
npm install
npm run dev
npm run build
```
