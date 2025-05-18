import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Check, CheckCircle, Code, Globe, XCircle } from 'lucide-react';
import JapaneseResumeImage from '../../images/japanese-resume-to-json.png';
import Logo from '../../images/logo.png';

export default function Index() {
    return (
        <>
            <Head title="Extract data from resumes in seconds" />
            <div className="flex min-h-screen flex-col">
                <header className="border-b">
                    <div className="container mx-auto flex h-16 items-center justify-between py-4 px-4 md:px-6">
                        <div className="flex items-center gap-2 text-xl font-bold">
                            <img src={Logo} alt="Keera Parser! Parse Resume " className="object-contain h-[45px]" />
                            <span className="font-roboto-sans leading-tight">Keera Parser</span>
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
                                        <div className="space-y-4">
                                            <ul className="grid gap-3">
                                                <li className="flex items-start gap-2">
                                                    <Check className="h-5 w-5 bg-black text-white mt-0.5 rounded-full p-1" />
                                                    <span>Predefined AI prompt to parse Resume/CV.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Check className="h-5 w-5 bg-black text-white mt-0.5 rounded-full p-1" />
                                                    <span>Customize the JSON schema to fit your need.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Check className="h-5 w-5 bg-black text-white mt-0.5 rounded-full p-1" />
                                                    <span>Supports Image/Handwritten PDF with OCR</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Check className="h-5 w-5 bg-black text-white mt-0.5 rounded-full p-1" />
                                                    <span>Can extend to Parse any PDF documents to your JSON format.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Check className="h-5 w-5 bg-black text-white mt-0.5 rounded-full p-1" />
                                                    <span>REST API supports</span>
                                                </li>
                                            </ul>
                                        </div>
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
                                        <CardTitle>OCR supports</CardTitle>
                                        <CardDescription>Supports Image/Handwritten PDF</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">
                                            Our advance OCR engine supports handwritten/Image based PDF with high accuracy.
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
                                {/* Step 1 - Parser */}
                                <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6">
                                    <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                                        1
                                    </div>
                                    <h3 className="text-xl font-bold">Parser</h3>
                                    <p className="text-muted-foreground text-center">
                                        Configure your resume parser by forking the existing one and defining the JSON schema to suit your needs.
                                    </p>
                                </div>

                                {/* Step 2 - Playground */}
                                <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6">
                                    <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                                        2
                                    </div>
                                    <h3 className="text-xl font-bold">Playground</h3>
                                    <p className="text-muted-foreground text-center">
                                        Test and experiment with the parser to ensure the data is being parsed correctly.
                                    </p>
                                </div>

                                {/* Step 3 - API */}
                                <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6">
                                    <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                                        3
                                    </div>
                                    <h3 className="text-xl font-bold">API</h3>
                                    <p className="text-muted-foreground text-center">
                                        Integrate Keera Parser into your system using well-structured REST APIs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="pricing" className="py-12 md:py-24 lg:py-32">
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
                                        <CardDescription>Playground Access</CardDescription>
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
                                                <span>Playground Access</span>
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
                                                <span>Playground Access</span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                                <span>REST APIs</span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                                <span>Priority support</span>
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
                                                <span>Playground Access</span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                                <span>REST APIs</span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                                <span>Priority support</span>
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                                <span>Other PDF data extract supports</span>
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
                </main>
                <footer className="border-t py-6 md:py-0">
                    <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                        <div className="flex items-center gap-2 font-bold">
                            <AppLogo/>
                        </div>
                        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
                            &copy; {new Date().getFullYear()} Keera Parser. All rights reserved.
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
        </>
    );
}
