import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { CheckCircle2, ArrowRight } from "lucide-react";

const LearnMorePage = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="grid-background"></div>

      {/* Hero Section */}
      <section className="w-full pt-12 md:pt-24 lg:pt-32 text-center">
        <div className="container mx-auto px-4 md:px-6 space-y-6">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl gradient-title animate-gradient">
            Unlock Your Career Potential with AI
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            ElevateAI is more than just a tool; it&apos;s your personal career
            strategist. We leverage cutting-edge artificial intelligence to
            provide you with the insights and resources you need to stand out in
            today&apos;s competitive job market.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="px-8 animate-bounce">
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Deep Dive Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            A Closer Look at Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple Steps to Success</h2>
            <p className="text-muted-foreground">
              Our streamlined process makes career advancement intuitive and
              effective.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {howItWorks.map((step, index) => (
              <Card
                key={index}
                className="bg-background/50 border-2 border-transparent hover:border-primary transition-colors"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why ElevateAI Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ElevateAI?</h2>
            <p className="text-muted-foreground">
              We provide the data-driven edge you need to navigate your career
              path with confidence.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Data-Driven Insights</h4>
                  <p className="text-muted-foreground">
                    Make informed decisions with weekly updated market trends,
                    salary data, and in-demand skill reports for over 50
                    industries.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Personalized to You</h4>
                  <p className="text-muted-foreground">
                    Our AI algorithms tailor every piece of content—from resumes
                    to interview questions—based on your unique industry,
                    experience, and skills.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Secure and Private</h4>
                  <p className="text-muted-foreground">
                    Your professional data is yours. We use robust Firebase
                    authentication and industry-standard encryption to keep your
                    information safe.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-12 md:py-24">
        <div className="mx-auto py-24 rounded-lg animate-gradient bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Take Control of Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Stop guessing and start strategizing. Join ElevateAI today and
              build the future you deserve.
            </p>
            <Link href="/sign-up" passHref>
              <Button size="lg" variant="secondary" className="h-11 mt-5">
                Sign Up/In Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMorePage;
