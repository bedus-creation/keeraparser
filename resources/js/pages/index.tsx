import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { BarChart, CheckCircle, Code, FileUp, Globe, Shield, XCircle } from 'lucide-react';
import JapaneseResumeImage from '../../images/japanese-resume-to-json.png';

export default function Index() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-between py-4">
                    <div className="flex items-center gap-2 text-xl font-bold">
                        <FileUp className="h-6 w-6" />
                        <span>ResumeAI</span>
                    </div>
                    <nav className="hidden gap-6 md:flex">
                        <Link href="#features" className="text-sm font-medium underline-offset-4 hover:underline">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-sm font-medium underline-offset-4 hover:underline">
                            How It Works
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium underline-offset-4 hover:underline">
                            Pricing
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium underline-offset-4 hover:underline">
                            Log in
                        </Link>
                        <Button asChild>
                            <Link href="/register">Start Free Trial</Link>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section
                    className="py-12 md:py-24 lg:py-20"
                    style={{ background: 'linear-gradient(to left, rgb(6 156 255 / 67%), rgb(255 197 0 / 0%))' }}
                >
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Extract data from resumes in seconds
                                    </h1>
                                    <p className="text-muted-foreground max-w-[600px] md:text-xl">
                                        Our AI-powered resume parser extracts key information from resumes and CVs with high accuracy, saving you
                                        hours of manual work.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button size="lg" asChild>
                                        <Link href="/register">Start Free Trial</Link>
                                    </Button>
                                    {/*Undo for som*/}
                                    {/*<Button size="lg" variant="outline" asChild>*/}
                                    {/*    <Link href="#demo">See it in action</Link>*/}
                                    {/*</Button>*/}
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px]">
                                    <img src={JapaneseResumeImage} alt="Resume parsing illustration" className="object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need</h2>
                                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our resume parser extracts all the important information from resumes and CVs, making it easy to find the right
                                    candidates.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <Globe className="text-primary mb-2 h-10 w-10" />
                                    <CardTitle>Multilingual Support</CardTitle>
                                    <CardDescription>Parse resumes in multiple languages with high accuracy.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">
                                        Our AI can extract data from resumes in English, Spanish, French, German, Chinese, Japanese, and many more
                                        languages.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Code className="text-primary mb-2 h-10 w-10" />
                                    <CardTitle>JSON Output</CardTitle>
                                    <CardDescription>Get structured data in clean, standardized JSON format.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">
                                        All parsed resume data is delivered in well-structured JSON format that's easy to integrate with your existing
                                        systems.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <BarChart className="text-primary mb-2 h-10 w-10" />
                                    <CardTitle>Custom JSON Schema</CardTitle>
                                    <CardDescription>Define your own JSON format to match your specific needs.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">
                                        Configure custom JSON schemas to ensure the parsed data fits perfectly with your existing workflows and
                                        systems.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section id="how-it-works" className="bg-muted py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">How It Works</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple 3-step process</h2>
                                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our platform makes it easy to extract and organize resume data in just a few clicks.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                            <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                                    1
                                </div>
                                <h3 className="text-xl font-bold">Upload</h3>
                                <p className="text-muted-foreground text-center">
                                    Upload resumes in bulk or individually in PDF, DOCX, or TXT formats.
                                </p>
                            </div>
                            <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                                    2
                                </div>
                                <h3 className="text-xl font-bold">Parse</h3>
                                <p className="text-muted-foreground text-center">
                                    Our AI automatically extracts and organizes all the important information.
                                </p>
                            </div>
                            <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                                    3
                                </div>
                                <h3 className="text-xl font-bold">Analyze</h3>
                                <p className="text-muted-foreground text-center">
                                    Search, filter, and analyze the parsed data to find the best candidates.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                            <div className="flex items-center justify-center">
                                <div className="relative h-[350px] w-full md:h-[450px]">
                                    <img
                                        src="/placeholder.svg?height=450&width=450"
                                        alt="JSON and multilingual support illustration"
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                                        Advanced Features
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Multilingual & Custom JSON</h2>
                                    <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Our platform goes beyond basic resume parsing with powerful language support and customizable data formats.
                                    </p>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                                            <CheckCircle className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">30+ Languages Supported</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Our AI can parse resumes in most major languages, making it perfect for international recruitment.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                                            <CheckCircle className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Standardized JSON Format</h3>
                                            <p className="text-muted-foreground text-sm">
                                                All data is delivered in clean, well-structured JSON that's ready for your applications.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                                            <CheckCircle className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Custom JSON Schema Builder</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Define exactly how you want your data structured with our intuitive schema builder.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="pricing" className="bg-muted py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">Pricing</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, transparent pricing</h2>
                                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Choose the plan that's right for you and start parsing resumes today.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Free</CardTitle>
                                    <CardDescription>Try core features</CardDescription>
                                    <div className="mt-4 text-4xl font-bold">$0</div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>50 parses</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>7 Days Trial</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Try core features</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>No Credit Card Required</span>
                                        </li>
                                        <li className="flex items-center">
                                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                            <span>No API Call</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" asChild>
                                        <Link href="/register">Get Started</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card className="border-primary">
                                <CardHeader>
                                    <div className="bg-primary text-primary-foreground mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-semibold">
                                        Popular
                                    </div>
                                    <CardTitle>Starter</CardTitle>
                                    <CardDescription>For small teams, startups, or individual recruiters</CardDescription>
                                    <div className="mt-4 text-4xl font-bold">$19</div>
                                    <p className="text-muted-foreground text-sm">per month</p>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>500 parses/month</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Advanced data extraction</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Search and filter</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Priority support</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Multilingual support (10+ languages)</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Basic custom JSON schemas</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" asChild>
                                        <a href="/billing?plan=starter">Get Started</a>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Enterprise</CardTitle>
                                    <CardDescription>For recruitment agencies, HR platforms, or job marketplaces</CardDescription>
                                    <div className="mt-4 text-4xl font-bold">$99</div>
                                    <p className="text-muted-foreground text-sm">per month</p>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>5000 parses/month</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Custom integrations</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Advanced analytics</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Dedicated account manager</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>SLA guarantees</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>All languages supported (30+)</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                            <span>Advanced custom JSON schemas</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" asChild>
                                        <a href="/billing?plan=pro">Get Started</a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="border-t py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to get started?</h2>
                                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Join thousands of companies that use our resume parser to streamline their hiring process.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button size="lg" asChild>
                                    <Link href="/signup">Try for free</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/contact">Contact Sales</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t py-6 md:py-0">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <div className="flex items-center gap-2 font-bold">
                        <FileUp className="h-5 w-5" />
                        <span>ResumeAI</span>
                    </div>
                    <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
                        &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/*TODO: add terms and Privacy */}
                        {/*<Link href="/terms" className="text-muted-foreground text-sm underline-offset-4 hover:underline">*/}
                        {/*    Terms*/}
                        {/*</Link>*/}
                        {/*<Link href="/privacy" className="text-muted-foreground text-sm underline-offset-4 hover:underline">*/}
                        {/*    Privacy*/}
                        {/*</Link>*/}
                    </div>
                </div>
            </footer>
        </div>
    );
}
