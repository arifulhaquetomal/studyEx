import Hero from '../components/home/Hero';
import Testimonials from '../components/home/Testimonials';
import SuccessStories from '../components/home/SuccessStories';
import StatsCounter from '../components/home/StatsCounter';
import AboutSection from '../components/home/AboutSection';
import Services from '../components/home/Services';
import Destinations from '../components/home/Destinations';
import UniversityMarquee from '../components/home/UniversityMarquee';
import SocialFeed from '../components/home/SocialFeed';
import ContactSection from '../components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Testimonials />
      <SuccessStories />
      <StatsCounter />
      <AboutSection />
      <Services />
      <Destinations />
      <UniversityMarquee />
      <SocialFeed />
      <ContactSection />
    </>
  );
}
