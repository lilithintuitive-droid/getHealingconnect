import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Code, Zap, Users, Award, Star, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Award className="w-3 h-3 mr-1" />
                  13+ Years Experience
                </Badge>
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                  Transform Your Business with
                  <span className="text-primary block mt-2">Custom Web Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                  From simple fixes to complex applications, I craft high-performance web solutions 
                  that drive growth and deliver exceptional user experiences.
                </p>
              </div>

              {/* Key Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">50+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">100% Client Satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">Remote Worldwide</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-get-started">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  data-testid="button-view-work"
                  onClick={() => document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </Button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <Badge variant="outline">Live Project</Badge>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Full-Stack Development</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-2 bg-primary/20 rounded"></div>
                        <div className="h-2 bg-primary/40 rounded"></div>
                        <div className="h-2 bg-primary rounded"></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>React • TypeScript • Node.js</span>
                        <span className="text-green-600 font-medium">Deployed ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Services Tailored to Your Needs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you need quick fixes or complex applications, I offer flexible packages 
              designed to fit your budget and timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <Card className="relative hover-elevate">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Quick Fixes</CardTitle>
                  <Badge variant="outline">$25-150</Badge>
                </div>
                <CardDescription>Perfect for small updates and fixes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Bug fixes & updates
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Minor feature additions
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    UI/UX improvements
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    24-48 hour turnaround
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Professional Package */}
            <Card className="relative border-primary hover-elevate">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Professional Sites</CardTitle>
                  <Badge>$800-2000</Badge>
                </div>
                <CardDescription>Complete websites and web applications</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Custom design & development
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Database integration
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Admin dashboards
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    2-4 week delivery
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Enterprise Package */}
            <Card className="relative hover-elevate">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Complex Apps</CardTitle>
                  <Badge variant="outline">$1500-3500</Badge>
                </div>
                <CardDescription>Advanced applications and platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Multi-user platforms
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Payment processing
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    API integrations
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Ongoing support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/contact">
              <Button variant="outline" data-testid="button-discuss-project">
                Discuss Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="featured-work" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real projects, real results. See how I've helped businesses transform 
              their digital presence and achieve their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* HealingConnect Case Study */}
            <Card className="overflow-hidden hover-elevate">
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-8 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">Full-Stack Platform</Badge>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">HealingConnect</h3>
                  <p className="text-muted-foreground mb-4">
                    Holistic practitioner marketplace with appointment booking, 
                    payment processing, and review system.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">React</Badge>
                    <Badge variant="outline" className="text-xs">Node.js</Badge>
                    <Badge variant="outline" className="text-xs">PostgreSQL</Badge>
                    <Badge variant="outline" className="text-xs">Stripe</Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">150+</div>
                      <div className="text-xs text-muted-foreground">Practitioners</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-xs text-muted-foreground">Bookings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9★</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" data-testid="button-view-healingconnect">
                    View Case Study
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* More Projects Card */}
            <Card className="flex flex-col justify-center items-center p-8 text-center border-dashed hover-elevate">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">More Success Stories</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Discover how I've helped businesses of all sizes achieve their digital transformation goals.
              </p>
              <Button variant="outline" data-testid="button-view-portfolio">
                View Full Portfolio
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Dancing Butterfly?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              13+ years of experience, Community Development degree, and a track record 
              of delivering exceptional results for clients worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Lightning Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Efficient processes and proven methodologies ensure your project 
                is delivered on time, every time.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Client-Centric Approach</h3>
              <p className="text-sm text-muted-foreground">
                Your success is my priority. I work closely with you to understand 
                your needs and exceed expectations.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Proven Track Record</h3>
              <p className="text-sm text-muted-foreground">
                50+ successful projects, 100% client satisfaction, and expertise 
                across multiple industries and technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the 50+ businesses that have already transformed their digital presence. 
            Let's discuss your project and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-start-project-footer">
                Start Your Project Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" data-testid="button-learn-more">
              Learn More About My Process
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}