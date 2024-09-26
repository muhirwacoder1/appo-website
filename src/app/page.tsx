'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import HyperText from "@/components/magicui/hyper-text";
import ShineBorder from "@/components/magicui/shine-border";
import { FaTwitter, FaFacebook, FaLinkedin, FaEnvelope, FaPhone, FaSun, FaMoon, FaBars, FaTimes, FaGooglePlay, FaApple, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Team member type
type TeamMember = {
  name: string;
  role: string;
  image: string;
  social: {
    twitter: string;
    facebook: string;
    linkedin: string;
  };
};

// Team member component
const TeamMember = ({ member }: { member: TeamMember }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={member.image}
        alt={member.name}
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
      <div className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-white text-xl font-bold">{member.name}</h3>
        <p className="text-gray-300">{member.role}</p>
        <div className="flex space-x-4 mt-2">
          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
            <FaTwitter size={20} />
          </a>
          <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
            <FaFacebook size={20} />
          </a>
          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
  });
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Nyirarukundo Grace",
      role: "CEO",
      image: "/team/pp.jpg",
      social: {
        twitter: "https://twitter.com/grace_nyirarukundo",
        facebook: "https://www.instagram.com/gracerubagengwa?igsh=YzNiazN5Y2I1d2ky",
        linkedin: "https://www.linkedin.com/in/grace-nyirarukundo-19841925a"
      }
    },
    {
      name: "Nikuze Prisca",
      role: "COO",
      image: "/team/Screenshot 2024-09-24 141139_enhanced.png",
      social: {
        twitter: "https://x.com/NikuzePrisca?s=08",
        facebook: "https://www.instagram.com/prisca_nikuze?igsh=YzNiazN5Y2I1d2ky",
        linkedin: "https://www.linkedin.com/in/nikuze-prisca-4342ba2a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      }
    },
    {
      name: "Rwakayiro David",
      role: "CTO",
      image: "/team/e6445656-e21d-4250-a64f-12513dd5cd37.jpeg",
      social: {
        twitter: "https://x.com/DavidRwakayiro",
        facebook: "https://www.facebook.com/david.rwakayiro.733",
        linkedin: "https://www.linkedin.com/in/david-rwakayiro-b0b1b128a"
      }
    },
    {
      name: "Alex Muhirwa",
      role: "Software Developer",
      image: "/team/WhatsApp Image 2024-08-03 at 10.56.42 PM.jpeg",
      social: {
        twitter: "https://x.com/AlexMuhirwa",
        facebook: "https://www.facebook.com/muhirwa.alex.07",
        linkedin: "https://www.linkedin.com/in/muhirwa-alex-64aa2b268/"
      }
    }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isContactSubmitted, setIsContactSubmitted] = useState(false);
  const [isJoinSubmitted, setIsJoinSubmitted] = useState(false);
  const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });
      if (response.ok) {
        setIsContactSubmitted(true);
        setTimeout(() => setIsContactSubmitted(false), 3000); // Reset after 3 seconds
        setContactForm({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    closeSidebar();
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
    closeSidebar();
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(joinForm),
      });
      if (response.ok) {
        setIsJoinSubmitted(true);
        setTimeout(() => setIsJoinSubmitted(false), 3000); // Reset after 3 seconds
        setJoinForm({ name: '', email: '' });
        setIsJoinModalOpen(false);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: waitlistEmail }),
      });
      if (response.ok) {
        setIsWaitlistSubmitted(true);
        setTimeout(() => setIsWaitlistSubmitted(false), 3000); // Reset after 3 seconds
        setWaitlistEmail('');
        setIsWaitlistModalOpen(false);
      } else {
        alert('Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Menubar className="flex justify-between items-center border-none bg-transparent py-2">
            <div className="flex items-center">
              <Image
                src="/images/Screenshot 2024-09-16 150314.png"
                alt="APPO Logo"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
            <nav className="hidden md:flex justify-center space-x-1">
              {["Home", "Products", "Partners", "Services", "Team", "About", "Contact"].map((item) => (
                <MenubarMenu key={item}>
                  <MenubarTrigger 
                    className="text-sm hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] rounded-md transition-colors px-3 py-2 cursor-pointer"
                    onClick={() => scrollToSection(item.toLowerCase())}
                  >
                    {item}
                  </MenubarTrigger>
                </MenubarMenu>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {mounted && (theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />)}
              </button>
              <MenubarMenu>
                <MenubarTrigger 
                  className="hidden md:block rounded-full bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm px-4 py-2 transition-colors cursor-pointer"
                  onClick={scrollToFooter}
                >
                  Contact Us
                </MenubarTrigger>
              </MenubarMenu>
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <FaBars size={16} />
              </button>
            </div>
          </Menubar>
        </div>
      </header>

      {/* Sidebar for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-4">
              <button
                onClick={closeSidebar}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                aria-label="Close menu"
              >
                <FaTimes size={16} />
              </button>
              <nav className="mt-8 space-y-4">
                {["Home", "Products", "Partners", "Services", "Team", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.toLowerCase());
                    }}
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="block py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={closeSidebar}
                >
                  Contact Us
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
        <section id="home" className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
          <div className="mb-12 max-w-4xl text-center">
            <HyperText
              text="Advancing possibilities"
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              duration={1500}
            />
            <HyperText
              text="in prosthetics and orthotics"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
              duration={1500}
            />
          </div>
          
          <p className="text-lg sm:text-xl mb-10 max-w-2xl text-center">
            Don&apos;t let diabetes unlock your feet. Get smart insoles now, click the button below to join the movement.
          </p>
          
          <button 
            onClick={() => setIsJoinModalOpen(true)}
            className="group relative px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out rounded-full overflow-hidden mb-20 border-2 border-blue-500 hover:border-purple-500"
          >
            <span className="relative z-10 text-blue-500 group-hover:text-white">
              Join Us
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
          </button>
        </section>

        {/* Updated Services Section with ShineBorder */}
        <section id="services" className="w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ShineBorder borderRadius={12} color={["#4F46E5", "#9333EA"]} className="w-full">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Custom Smart Insoles Fabrication</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  At APPO we are experts in smart insoles, and other assistive devices fabrication. Get assessed, casted and own your smart insoles.
                </p>
              </div>
            </ShineBorder>

            <ShineBorder borderRadius={12} color={["#4F46E5", "#9333EA"]} className="w-full">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Personalized Care</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every client is unique with his/her condition. At APPO LTD we treat you personally, and ensure the confidentiality of your information.
                </p>
              </div>
            </ShineBorder>

            <ShineBorder borderRadius={12} color={["#4F46E5", "#9333EA"]} className="w-full">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Real-Time Data Tracking and Follow-up</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our smart insoles have standardized sensors that track important data in real-time and give alerts whenever critical information, like development of diabetic foot ulcers, is found.
                </p>
              </div>
            </ShineBorder>
          </div>
        </section>

        {/* Updated Partners Section */}
        <section id="partners" className="w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-4">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Partners
          </motion.h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-12">
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-1 bg-white dark:bg-gray-800 rounded-lg">
                <Image
                  src="/logos/university-of-rwanda-logo.jpeg"
                  alt="University of Rwanda"
                  width={200}
                  height={100}
                  className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-1 bg-white dark:bg-gray-800 rounded-lg">
                <Image
                  src="/logos/alx-logo.png"
                  alt="ALX"
                  width={200}
                  height={100}
                  className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* New Team Section */}
        <section id="team" className="w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </section>

        {/* New About Us Section */}
        <section id="about" className="w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            About Us
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
                Smart Insoles for Diabetic Patients
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                At APPO LTD, we&apos;ve revolutionized diabetic care with our smart insoles. These innovative devices are equipped with cutting-edge sensors designed to:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li>Identify and track diabetic foot ulcers</li>
                <li>Monitor general health status of individuals with diabetes</li>
                <li>Provide real-time health data</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our smart insoles feature pressure sensors, temperature sensors, and SPO2 sensors for comprehensive health monitoring. They are designed to be comfortable, waterproof, and affordable, making advanced care accessible to all.
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg transform rotate-3"></div>
                <Image
                  src="/images/761539131118528029-removebg.png"
                  alt="APPO Smart Insoles"
                  width={500}
                  height={500}
                  className="relative rounded-lg object-cover shadow-lg transform -rotate-3 transition-transform hover:rotate-0 duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* New Products Section */}
        <section id="products" className="w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Our Products
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our innovative smart insoles app is on its way. Join our waitlist to be the first to know when it&apos;s available!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setIsWaitlistModalOpen(true)}
                className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                <FaGooglePlay className="mr-2" size={24} />
                <span>Play Store</span>
              </button>
              <button 
                onClick={() => setIsWaitlistModalOpen(true)}
                className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                <FaApple className="mr-2" size={24} />
                <span>App Store</span>
              </button>
            </div>
          </div>
        </section>

        {/* Message Us Section */}
        <section id="contact" className="w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Message Us
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
            <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  {isContactSubmitted ? <FaCheckCircle size={20} /> : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer ref={footerRef} className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <motion.div 
              className="mb-8 md:mb-0 text-center md:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Contact Us
              </h3>
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.a 
                  href="mailto:appoltd8@gmail.com" 
                  className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope className="mr-3 text-blue-500 group-hover:animate-bounce" />
                  <span className="text-lg">appoltd8@gmail.com</span>
                </motion.a>
                <motion.a 
                  href="tel:+250784131200" 
                  className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhone className="mr-3 text-blue-500 group-hover:animate-bounce" />
                  <span className="text-lg">+250 784 131 200</span>
                </motion.a>
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaTwitter size={32} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/muhirwa-alex-64aa2b268/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaLinkedin size={32} />
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div 
            className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p>© {new Date().getFullYear()} APPO LTD. All rights reserved.</p>
            <p className="mt-2">Innovating for a healthier future.</p>
          </motion.div>
        </div>
      </footer>

      {/* Join Us Modal */}
      <Transition appear show={isJoinModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsJoinModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Join Us
                  </Dialog.Title>
                  <form onSubmit={handleJoinSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="join-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                      <input
                        type="text"
                        id="join-name"
                        value={joinForm.name}
                        onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="join-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        id="join-email"
                        value={joinForm.email}
                        onChange={(e) => setJoinForm({...joinForm, email: e.target.value})}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {isJoinSubmitted ? <FaCheckCircle size={20} /> : 'Join'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Waitlist Modal */}
      <Transition appear show={isWaitlistModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsWaitlistModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 mb-4"
                  >
                    Join Our Waitlist
                  </Dialog.Title>
                  <form onSubmit={handleWaitlistSubmit} className="mt-4">
                    <div className="mb-4">
                      <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        id="waitlist-email"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {isWaitlistSubmitted ? (
                            <motion.div
                              key="check"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FaCheckCircle size={20} />
                            </motion.div>
                          ) : (
                            <motion.span
                              key="text"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              Join Waitlist
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
