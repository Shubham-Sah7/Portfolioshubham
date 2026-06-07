"use client";

import React, { useState } from 'react';
import { ChevronDownIcon, MenuIcon, XIcon, DownloadIcon } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import SmartMCB, { MCBState } from './SmartMCB';
import MCBMobileApp from './MCBMobileApp';

const Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={className} {...props}>{children}</button>
);


export default function SmartMCBPage() {
  // State for mobile menu and product dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileProductOpen, setIsMobileProductOpen] = React.useState(false);

  // Add this state at the top of your SmartMCBPage component:
const [isDesktopProductOpen, setIsDesktopProductOpen] = useState(false);

  const [mcbState, setMCBState] = useState<MCBState>({
  mcb: false
});

const toggleMCB = () => {
  setMCBState((prevState: MCBState) => ({
    mcb: !prevState.mcb
  }));
};
  
  // Applications data
  const applications = [
    {
      title: "Industrial Manufacturing",
      description: "Manage and monitor power distribution across factory floor machinery",
      image: "/Images/factory.jpeg"
    },
    {
      title: "Street Lighting",
      description: "Automate street light operations based on time and ambient light conditions",
      image: "/Images/street_ligts.jpg"
    },
    {
      title: "High Mast Lights",
      description: "Remote control for large outdoor lighting installations",
      image: "/Images/must_lights.png"
    },
    {
      title: "Agriculture",
      description: "Automate and optimize irrigation, lighting, and equipment for smart farming solutions",
      image: "/Images/agriculture.png"
    },
  ];

  // MCB types
  const mcbTypes = [
    {
      title: "2-Pole Smart MCB",
      description: "Single-phase MCB with load capacity of 20A, 32A, or 40A",
      image: "/Images/2POLE.png"
    },
    {
      title: "2-Pole with RTC",
      description: "Single-phase MCB with Real-Time Clock for timing functions",
      image: "/Images/2POLE_RTC.png"
    },
    {
      title: "4-Pole Smart MCB",
      description: "Three-phase MCB with load capacity of 40A, 63A, or 100A",
      image: "/Images/4POLE.png"
    },
    {
      title: "4-Pole with RTC",
      description: "Three-phase MCB with Real-Time Clock for advanced scheduling",
      image: "/Images/4POLE_RTC.png"
    },
  ];

  // Specifications data
  const specifications = [
    { name: "Dimensions", value: "90mm × 70mm × 45mm" },
    { name: "Rated Current", value: "10A, 20A, 32A, 40A, 63A, 100A options" },
    { name: "Rated Voltage", value: "230V AC, 50Hz" },
    { name: "Connectivity", value: "Wi-Fi 2.4GHz" },
    { name: "Operating Temperature", value: "-25°C to +65°C" },
    { name: "App Compatibility", value: "iOS & Android" },
    { name: "Voice Assistant", value: "Works with Amazon Alexa, Google Assistant" },
    { name: "Installation", value: "DIN rail mounting" },
    { name: "Protection", value: "Overload, short-circuit, under/over voltage" },
    { name: "Operating Distance", value: "Up to 30 meters from Wi-Fi router" },
  ];

  return (
    <div className="bg-[#edf2fb] flex flex-row justify-center w-full">
      <div className="bg-[#edf2fb] overflow-hidden w-full max-w-[1728px] relative">
        {/* Navigation Bar */}
        {/* Navigation Bar */}
<header className="flex w-full h-[65px] items-start gap-2.5 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px] py-[15px] fixed top-0 left-0 bg-[#edf2fb] border-b border-[#080a30]/20 z-50">
  <div className="flex w-full items-center justify-between relative">
    <div className="flex items-center gap-2">
      <Link href="/">
        <Image
          className="w-6 h-6"
          alt="Abhiyantrik Logo"
          src="/Images/Abhiyantrik_Logo.png"
          width={24}
          height={24}
        />
      </Link>
      <Link href="/">
        <span className="hidden sm:block font-medium text-[#080a30] text-base">
          Abhiyantrik Solutions Pvt Ltd
        </span>
      </Link>
    </div>

    <nav className="hidden md:flex items-center gap-6 lg:gap-[70px]">
      {/* Products dropdown with click handler for tablets */}
      <div className="relative">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setIsDesktopProductOpen(!isDesktopProductOpen)}
        >
          <span className="font-medium text-[#080a30] text-base">
            Products
          </span>
          <ChevronDownIcon className={`h-6 w-6 transition-transform duration-200 ${isDesktopProductOpen ? 'rotate-180' : ''}`} />
        </div>
        {/* Modified dropdown menu with explicit visibility control */}
        <div 
          className={`fixed left-0 right-0 top-[65px] bg-[#edf2fb] border-b border-[#080a30]/20 overflow-hidden 
            ${isDesktopProductOpen 
              ? 'opacity-100 scale-y-100' 
              : 'opacity-0 scale-y-0 pointer-events-none'} 
            transition-all duration-300 origin-top z-40`}
        >
          <div className="container mx-auto py-8 px-4">
            <div className="flex justify-center items-baseline gap-16 flex-wrap">
              <Link href="/smart-touch-switch" className="group/product">
                <div className="flex flex-col items-center text-center transition-all duration-200 hover:translate-y-[-8px]">
                  <div className="relative mb-4 overflow-hidden rounded-lg p-2">
                    <Image 
                      src="/Images/smart_touch_switch_menu.png" 
                      alt="Smart touch switch" 
                      className="w-52 h-auto object-contain transition-transform duration-300 group-hover/product:scale-110"
                      width={208}
                      height={150}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover/product:opacity-100 rounded-lg transition-opacity duration-200"></div>
                  </div>
                  <span className="text-sm font-medium text-[#080a30] whitespace-nowrap">Smart Touch Switch</span>
                </div>
              </Link>
              
              <Link href="/smart-mcb" className="group/product">
                <div className="flex flex-col items-center text-center transition-all duration-200 hover:translate-y-[-8px]">
                  <div className="relative mb-4 overflow-hidden rounded-lg p-2">
                    <Image 
                      src="/Images/smart_MCB_menu.png" 
                      alt="Smart MCB" 
                      className="w-44 h-auto object-contain transition-transform duration-300 group-hover/product:scale-110"
                      width={176}
                      height={150}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover/product:opacity-100 rounded-lg transition-opacity duration-200"></div>
                  </div>
                  <span className="text-sm font-medium text-[#080a30] whitespace-nowrap">Smart MCB</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <span className="font-medium text-[#080a30] text-base">
        <a href="#footer" className="font-medium text-[#080a30] text-base cursor-pointer">
          Support
        </a>
      </span>
      <span className="font-medium text-[#080a30] text-base">
        <a href="#footer" className="font-medium text-[#080a30] text-base cursor-pointer">
          About us
        </a>
      </span>
    </nav>

    <Link href="/#contact-form">
      <Button className="h-[34px] bg-[#080a30] rounded-[11px] text-[#edf2fb] hover:bg-[#080a30]/90 font-medium">
        Contact Us
      </Button>
    </Link>

    {/* Mobile Menu Button */}
    <div className="block md:hidden">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <XIcon className="h-6 w-6 text-[#080a30]" />
        ) : (
          <MenuIcon className="h-6 w-6 text-[#080a30]" />
        )}
      </button>
    </div>

    {/* Mobile Side Menu */}
    <div
      className={`fixed md:hidden top-[65px] right-0 h-screen w-64 bg-[#edf2fb] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col p-4">
        {/* Products dropdown in mobile menu */}
        <div className="mb-4">
          <button
            onClick={() => setIsMobileProductOpen(!isMobileProductOpen)}
            className="flex items-center justify-between w-full py-2 font-medium text-[#080a30] text-base"
          >
            <span>Products</span>
            <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isMobileProductOpen ? "rotate-180" : ""}`} />
          </button>
          
          {/* Products submenu with images */}
          <div className={`overflow-hidden transition-all duration-300 ${isMobileProductOpen ? "max-h-80 mt-2" : "max-h-0"}`}>
            <div className="pl-4 space-y-4">
              <Link href="/smart-touch-switch" className="block py-1 font-medium text-[#080a30] text-sm">
                <div className="flex flex-col items-start">
                  <div className="relative mb-2 overflow-hidden rounded-lg">
                    <Image 
                      src="/Images/smart_touch_switch_menu.png" 
                      alt="Smart touch switch" 
                      className="w-32 h-auto object-contain"
                      width={128}
                      height={100}
                    />
                  </div>
                  <span>Smart Touch Switch</span>
                </div>
              </Link>
              <Link href="/smart-mcb" className="block py-1 font-medium text-[#080a30] text-sm">
                <div className="flex flex-col items-start">
                  <div className="relative mb-2 overflow-hidden rounded-lg">
                    <Image 
                      src="/Images/smart_MCB_menu.png" 
                      alt="Smart MCB" 
                      className="w-28 h-auto object-contain"
                      width={112}
                      height={100}
                    />
                  </div>
                  <span>Smart MCB</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Support link */}
        <a href="#footer" className="py-2 mb-4 font-medium text-[#080a30] text-base">
          Support
        </a>
        
        {/* About us link */}
        <a href="#footer" className="py-2 mb-4 font-medium text-[#080a30] text-base">
          About us
        </a>
        
        {/* Contact us button */}
        <Link href="/#contact-form">
          <Button className="h-[34px] bg-[#080a30] rounded-[11px] text-[#edf2fb] hover:bg-[#080a30]/90 font-medium mt-4">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  </div>
</header>

        {/* Hero Section */}
        <section className="pt-[85px] px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px] mb-16">
          {/* Title */}
          <div className="text-center my-6">
            <h1 className="text-5xl md:text-7xl font-medium text-[#080a30]">
              Smart <span className="font-extrabold">MCB</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#080a30] max-w-2xl mx-auto mt-4">
              Ultimate Control, Maximum Safety!
            </p>
          </div>
          
          {/* Image */}
          <div className="max-w-4xl mx-auto mb-8">
            <Image 
              src="/Images/MCB_front.png" 
              alt="Smart MCB Device" 
              className="w-full h-auto object-contain"
              width={800}
              height={600}
            />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/#contact-form">
              <Button className="bg-[#080a30] text-white px-8 py-6 text-lg hover:bg-[#080a30]/90 rounded-xl">
                Contact to Place Order
              </Button>
            </Link>
            <a href="/Brochure/smart_MCB_Brochure.pdf" download="smart MCB brochure.pdf">
              <Button className="bg-white border border-[#080a30] text-[#080a30] px-8 py-6 text-lg hover:bg-gray-100 rounded-xl flex items-center gap-2">
                <DownloadIcon size={20} />
                Download Brochure
              </Button>
            </a>
          </div>
        </section>

{/* Interactive MCB Demo Section */}
<section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px] bg-[#edf2fb]">
  <div className="max-w-7xl mx-auto">
    <div className="rounded-3xl overflow-hidden">
      <div className="py-12 px-6 md:px-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#080a30]">
            Smart MCB in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Experience our Smart MCB technology. Toggle the MCB to see it in action with synchronized control from your mobile app.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Smart MCB Component with Video Animation */}
          <div className="w-full md:w-1/2 lg:w-3/5">
            <SmartMCB 
              mcbState={mcbState} 
              onMCBToggle={toggleMCB}
            />
          </div>
          
          {/* Mobile App */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
            <MCBMobileApp 
              mcbState={mcbState.mcb}
              toggleMCB={toggleMCB}
            />
          </div>
        </div>
        
        {/* Added margin-top for separation */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#080a30] text-center mb-10">
            Automation 
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {/* Countdown Timer Section - Side by side layout for md+ screens */}
                                <div className="bg-[#0a0e3a] rounded-xl p-8 text-white">
                                  <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="md:w-1/2 mb-6 md:mb-0 md:pr-4">
                                      <h3 className="text-3xl font-bold mb-4">Countdown Timer</h3>
                                      <p>
                                        Need to turn off your Appliance after a certain time? Simply set a countdown timer, and the <span className="font-bold">Smart Touch Switch</span> will handle the rest!
                                      </p>
                                    </div>
                                    <div className="md:w-1/2 flex justify-center">
                                      <Image 
                                        src="/Images/Timer_comp.png" 
                                        alt="Countdown Timer Interface" 
                                        className="max-h-[240px] w-auto object-contain"
                                        width={200}
                                        height={240}
                                      />
                                    </div>
                                  </div>
                                </div>
          
                                {/* Routine Section - Side by side layout for md+ screens */}
                                <div className="bg-[#0a0e3a] rounded-xl p-8 text-white">
                                  <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="md:w-1/2 mb-6 md:mb-0 md:pr-4">
                                      <h3 className="text-3xl font-bold mb-4">Routine</h3>
                                      <p>
                                        Set up daily or weekly schedules for lights, fans and appliances to turn on or off automatically. Perfect for <span className="font-bold">managing energy usage</span> and convenience!
                                      </p>
                                    </div>
                                    <div className="md:w-1/2 flex justify-center">
                                      <Image 
                                        src="/Images/routine_comp.png" 
                                        alt="Routine Interface" 
                                        className="max-h-[240px] w-auto object-contain"
                                        width={200}
                                        height={240}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Key Features Section - Using consistent background */}
        {/* Key Features Section - Updated with new design */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px] bg-[#edf2fb]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#080a30] mb-4">
                Smart Features, Smarter Living
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our Smart MCB combines traditional circuit protection with modern smart home technology
              </p>
            </div>
            
            {/* New feature layout with image and text - Updated with better spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="flex justify-center items-center">
                <Image 
                  src="/Images/MCB_mobile.png" 
                  alt="Smart MCB Mobile Control" 
                  className="max-h-[500px] w-auto object-contain"
                  width={400}
                  height={500}
                />
              </div>
              <div className="grid grid-cols-1 gap-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-5 p-5 rounded-xl transition-shadow">
                    <Image 
                      src="/Images/wifi_icon.png" 
                      alt="WiFi Icon" 
                      className="w-12 h-12 mt-1 object-contain flex-shrink-0"
                      width={48}
                      height={48}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-[#080a30] mb-2">Effortlessly connects via WiFi</h3>
                      <p className="text-gray-600 leading-relaxed">Connect your smart MCB to your home network with ease and manage it from your smartphone</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 p-5 rounded-xl transition-shadow">
                    <Image 
                      src="/Images/globe_icon.png" 
                      alt="Global Icon" 
                      className="w-12 h-12 mt-1 object-contain flex-shrink-0"
                      width={48}
                      height={48}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-[#080a30] mb-2">Global monitoring & control</h3>
                      <p className="text-gray-600 leading-relaxed">Monitor and manage your smart MCB from anywhere in the world with internet access</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 p-5 rounded-xl transition-shadow">
                    <Image 
                      src="/Images/automation_icon.png" 
                      alt="Automation Icon" 
                      className="w-12 h-12 mt-1 object-contain flex-shrink-0"
                      width={48}
                      height={48}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-[#080a30] mb-2">Custom automation scheduling</h3>
                      <p className="text-gray-600 leading-relaxed">Create personalized automation routines for your electrical circuits based on time, day, or other triggers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 p-5 rounded-xl transition-shadow">
                    <Image 
                      src="/Images/smart_nation_app_icon.png" 
                      alt="Smart Nation App Icon" 
                      className="w-12 h-12 mt-1 object-contain flex-shrink-0"
                      width={48}
                      height={48}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-[#080a30] mb-2">Smart Nation mobile app</h3>
                      <p className="text-gray-600 leading-relaxed">Download our intuitive app for iOS & Android to take full control of your smart MCB ecosystem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

{/* RetroFit Mechanism Section */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px] bg-[#edf2fb]">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl overflow-hidden">
              <div className="py-12 px-6 md:px-10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#080a30]">
                    RetroFit mechanism transforms your <br className="hidden md:block" /> 
                     manual MCB into Smart MCB
                  </h2>
                </div>
                
                <div className="flex justify-center mb-10">
                  <Image 
                    src="/Images/retrofit.png" 
                    alt="RetroFit mechanism transformation diagram" 
                    className="w-full max-w-4xl h-auto object-contain rounded-xl border border-gray-200"
                    width={1200}
                    height={800}
                  />
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    Upgrade your existing electrical infrastructure without the need for complex rewiring 
                    or replacement. Our RetroFit technology seamlessly integrates with standard MCBs to 
                    provide smart functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* Product Types Section */}
<section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px] bg-[#]">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-[#080a30] mb-4">
        Smart MCB Types
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Choose the right Smart MCB for your specific needs
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {mcbTypes.map((type, index) => (
        <div key={index} className="bg-[#ffffff] border border-gray-200 rounded-xl overflow-hidden h-full">
          <div className="p-6 flex flex-col h-full">
            <div className="flex-1">
              <div className="bg-[#edf2fb] border border-blue-100 rounded-md p-4 flex items-center justify-center mb-4 h-64">
                <Image 
                  src={type.image} 
                  alt={type.title} 
                  className="max-h-48 object-contain"
                  width={200}
                  height={200}
                />
              </div>
              <h3 className="text-2xl font-bold text-[#080a30] mb-2">{type.title}</h3>
              <p className="text-gray-600 line-clamp-3">{type.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Applications Section - Using consistent background */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px] bg-[#edf2fb]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#080a30] mb-4">
                Applications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Smart MCB powers a wide range of applications across residential, commercial, and industrial sectors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {applications.map((app, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl h-80 shadow-md">
                  <Image 
                    src={app.image} 
                    alt={app.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={600}
                    height={320}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{app.title}</h3>
                    <p className="text-white/80">{app.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications - Updated with tabular layout */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px] bg-[#edf2fb]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#080a30] mb-4">
                Technical Specifications
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built with precision and reliability for optimal performance
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full border-collapse">
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-4 px-6 border-t border-gray-200 font-medium text-gray-700 w-1/2">
                        {spec.name}
                      </td>
                      <td className="py-4 px-6 border-t border-gray-200 text-[#080a30] w-1/2">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                * All specifications are subject to change without prior notice. Please contact our technical team for the most up-to-date information.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px] bg-[#edf2fb]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#080a30] mb-6">
              Ready to Upgrade Your Electrical System?
            </h2>
            <p className="text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
              Join the Smart Nation revolution. Control, monitor, and optimize your electrical circuits from anywhere.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/#contact-form">
                <Button className="bg-[#080a30] text-white px-8 py-6 text-lg hover:bg-[#080a30]/90 rounded-xl">
                  Contact to Place Order
                </Button>
              </Link>
              <Link 
                href="/Brochure/smart_MCB_Brochure.pdf" 
                download="smart MCB brochure.pdf"
              >
                <Button className="bg-white border border-[#080a30] text-[#080a30] px-8 py-6 text-lg hover:bg-gray-100 rounded-xl flex items-center gap-2">
                  <DownloadIcon size={20} />
                  Download Brochure
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer - Changed to gradient background */}
<footer id="footer" className="mt-16 md:mt-[120px] w-full">
  <div className="w-full bg-gradient-to-b from-[#080a30] to-black py-12">
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[145px]">
      {/* Top section with logo and footer navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Company logo and info */}
        <div className="md:col-span-1 lg:col-span-2">
          <div className="flex items-center mb-4">
            <Image
              className="w-8 h-8 mr-3"
              alt="Abhiyantrik Logo"
              src="/Images/Abhiyantrik_Logo_white.png"
              width={200}
              height={50}
            />
            <span className="font-medium text-white text-lg">
              Abhiyantrik Solutions Pvt Ltd
            </span>
          </div>
          <p className="text-gray-300 mb-6 max-w-md">
            Leading the way in smart home and <span className="font-medium">industrial automation solutions</span> for homes, offices, factories, and businesses across India.
          </p>
          <div className="flex space-x-4">
            {/* Social media icons */}
            <a href="#" aria-label="Facebook">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        {/* Products */}
        <div>
          <h3 className="font-medium text-white text-lg mb-4">Products</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-white">Smart Touch Switch</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Smart MCB</a></li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h3 className="font-medium text-white text-lg mb-4">Support</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Installation Guide</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Download Brochure</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Contact Support</a></li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <h3 className="font-medium text-white text-lg mb-4">Company</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Partners</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
          </ul>
        </div>
      </div>
      {/* Address and contact info */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-white text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p>2nd Floor, KLE CTIE Tech Park, KLE Technological University</p>
              <p>Campus, Vidya Nagar, Hubballi, Karnataka 580031</p>
              <p className="mt-3">Founder: Akshaykumar Sunagar</p>
              <p>Email: abhiyantrikgroup@gmail.com</p>
              <p>Phone: +91 7795119205</p>
              <p>Website: www.abhiyantriksolutions.in</p>
            </address>
          </div>
          <div>
            <h3 className="font-medium text-white text-lg mb-4">Business Hours</h3>
            <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-300">Sunday: Closed</p>
          </div>
        </div>
      </div>
      
      {/* REMOVED: Newsletter signup section */}
      
      {/* Bottom copyright and links */}
      <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-300 mb-4 md:mb-0">
          © 2025 Abhiyantrik Solutions. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </div>
  </div>
</footer>
      </div>
    </div>
  );
}