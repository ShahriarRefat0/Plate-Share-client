import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useTheme from '../hooks/useTheme';

import Hero from '../Components/Hero';

import OurMission from '../Components/OurMission';
import HowItWorks from '../Components/HowItWorks';
import FeaturedFoods from '../Components/FeaturedFoods';
import LoadingSpinner from '../Components/LoadingSpinner';

import ServicesSection from '../Components/ServicesSection';
import CategoriesSection from '../Components/CategoriesSection';
import HighlightsSection from '../Components/HighlightsSection';
import StatisticsSection from '../Components/StatisticsSection';
import TestimonialsSection from '../Components/TestimonialsSection';
import BlogSection from '../Components/BlogSection';
import NewsletterCTA from '../Components/NewsletterCTA';
import FAQCTA from '../Components/FAQCTA';





const Home = () => {
  const [loading, setLoading] = useState(false)

  const { theme } = useTheme();

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <Hero></Hero>
      <FeaturedFoods></FeaturedFoods>
      <HowItWorks></HowItWorks>
      <OurMission></OurMission>
      <ServicesSection />
      <CategoriesSection />
      <HighlightsSection />
      <StatisticsSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterCTA />
      
      

    </div>
  );
};

export default Home;