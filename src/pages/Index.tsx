
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedVenues from "@/components/FeaturedVenues";
import ArticlesSection from "@/components/ArticlesSection";
import EventsSection from "@/components/EventsSection";
import JoinCTA from "@/components/JoinCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedVenues />
        <ArticlesSection />
        <EventsSection />
        <JoinCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
