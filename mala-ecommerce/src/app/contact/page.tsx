"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Input, Select } from "@/components/ui";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Facebook,
  Instagram,
  Send,
  CheckCircle2
} from "lucide-react";

const INQUIRY_TYPES = [
  { value: "general", label: "General Inquiry" },
  { value: "order", label: "Order Status" },
  { value: "return", label: "Returns & Exchanges" },
  { value: "custom", label: "Custom Order" },
  { value: "wholesale", label: "Wholesale Inquiry" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
          alt="Contact MALA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        <div className="container relative flex h-full items-center">
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Get in Touch
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              We&apos;d Love to Hear From You
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Have a question or need assistance? Our team is here to help you with anything you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold">Contact Information</h2>
                <p className="mt-2 text-muted-foreground">
                  Reach out to us through any of these channels.
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="mt-1 text-muted-foreground">+92 300 123 4567</p>
                  <p className="text-sm text-muted-foreground">+92 91 123 4567</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]/10">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-medium">WhatsApp</h3>
                  <p className="mt-1 text-muted-foreground">+92 300 123 4567</p>
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Chat with us →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="mt-1 text-muted-foreground">hello@mala.pk</p>
                  <p className="text-sm text-muted-foreground">support@mala.pk</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Store Address</h3>
                  <p className="mt-1 text-muted-foreground">
                    GT Road, Near City Center<br />
                    Nowshera, Khyber Pakhtunkhwa<br />
                    Pakistan
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="mt-1 text-muted-foreground">
                    Monday - Saturday: 10:00 AM - 9:00 PM<br />
                    Sunday: 2:00 PM - 8:00 PM
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-medium">Follow Us</h3>
                <div className="mt-3 flex gap-3">
                  <a
                    href="https://facebook.com/mala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/mala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-bold">Message Sent!</h3>
                    <p className="mt-2 text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button
                      className="mt-6"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({
                          name: "",
                          email: "",
                          phone: "",
                          inquiryType: "",
                          message: "",
                        });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl font-bold">Send Us a Message</h2>
                    <p className="mt-2 text-muted-foreground">
                      Fill out the form below and we&apos;ll respond as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label="Full Name"
                          name="name"
                          placeholder="Enter your name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          label="Email Address"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          placeholder="03XX-XXXXXXX"
                          value={formState.phone}
                          onChange={handleChange}
                        />
                        <Select
                          label="Inquiry Type"
                          name="inquiryType"
                          placeholder="Select inquiry type"
                          options={INQUIRY_TYPES}
                          value={formState.inquiryType}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Message</label>
                        <textarea
                          name="message"
                          placeholder="How can we help you?"
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        isLoading={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="border-t border-border">
        <div className="container py-16">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold">Visit Our Store</h2>
            <p className="mt-2 text-muted-foreground">
              Come visit us at our flagship store in Nowshera
            </p>
          </div>
          <div className="mt-8 aspect-video overflow-hidden rounded-lg border border-border bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104674.87556668568!2d71.93445069726562!3d34.010703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917b90f0e79cf%3A0xa816b2637558a72d!2sNowshera%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1702000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MALA Store Location"
            />
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="bg-secondary/30 py-16">
        <div className="container text-center">
          <h2 className="font-serif text-2xl font-bold">Have More Questions?</h2>
          <p className="mt-2 text-muted-foreground">
            Check out our frequently asked questions for quick answers.
          </p>
          <Button className="mt-6" variant="outline">
            View FAQs
          </Button>
        </div>
      </section>
    </div>
  );
}
