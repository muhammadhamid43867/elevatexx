import React from 'react';
import Hero from '../home/Hero';
import Services from '../home/Services';
import OurWork from '../home/OurWork';
import OurClients from '../home/OurClients';
import Testimonials from '../home/Testimonials';
import FAQ from '../home/FAQ';
import Contact from '../home/Contact';

const Home = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="work">
        <OurWork />
      </section>
      <section id="clients">
        <OurClients />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Home;