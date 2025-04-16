import CheckoutForm from '@/pages/billing/checkout-form';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_bti1lv9qLyKDQnksfZOKmTxc');

interface Intent {
    client_secret: string;
}

export default function Billing({ intent }: { intent: Intent }) {
    const fetchClientSecret = async () => {
        return intent.client_secret;
    };

    return (
        <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <CheckoutForm />
        </CheckoutProvider>
    );
}
