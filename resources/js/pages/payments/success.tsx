import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from '@/lib/utils';
import { Payment } from '@/pages/payments/types';
import { Link } from '@inertiajs/react';
import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from '@/components/ui/button'
export default function Success({payment}: { payment: Payment }) {
    return (
        <div className="container mx-auto max-w-md px-4 py-12">
            <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-800">Payment Successful</AlertTitle>
                <AlertDescription className="text-green-700">Your payment has been processed successfully.</AlertDescription>
            </Alert>

            <Card>
                <CardHeader>
                    <CardTitle>Order Confirmation</CardTitle>
                    <CardDescription>Thank you for your purchase!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Plan:</span>
                            <span className="font-medium capitalize">{payment.plan}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount Paid:</span>
                            <span className="font-medium">{payment.total_amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">{payment.created_at}</span>
                        </div>
                        <div className="pt-4">
                            <p className="text-muted-foreground text-sm">A confirmation email has been sent to your email address.</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Link href="/api-keys"  className={cn(buttonVariants({ 'variant': 'default'}), 'w-full')}>
                        Setup API
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
