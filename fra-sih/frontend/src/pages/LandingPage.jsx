"use client";
import React from "react";
import { BackgroundLines } from "../components/ui/background-lines";
import { motion } from "motion/react";
import { TracingBeam } from "../components/ui/tracing-beam";
import {
    DraggableCardBody,
    DraggableCardContainer,
} from "../components/ui/draggable-card";
import AnimatedTooltip from "../components/ui/animated-tooltip"
import people from "../data/team"
export default function LandingPage() {
    // FRA-related draggable cards data
    const fraCards = [
        {
            title: "Forest Mapping",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            className: "absolute top-10 left-[15%] rotate-[-8deg]",
        },
        {
            title: "AI Analytics",
            image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            className: "absolute top-40 left-[25%] rotate-[-12deg]",
        },
        {
            title: "GeoAI Detection",
            image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            className: "absolute top-5 left-[45%] rotate-[12deg]",
        },
        {
            title: "WebGIS Platform",
            image: "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80",
            className: "absolute top-32 left-[60%] rotate-[15deg]",
        },
        {
            title: "Decision Support",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
            className: "absolute top-20 right-[25%] rotate-[5deg]",
        },
        {
            title: "Data Visualization",
            image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=800&q=80",
            className: "absolute top-24 left-[35%] rotate-[-10deg]",
        },
    ];

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black overflow-x-hidden">
            <BackgroundLines className="flex flex-col items-center justify-start w-full px-4 py-20 relative space-y-32">

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center text-center w-full h-screen mx-auto -mt-20">
                    <div className="flex flex-col items-center justify-center text-center w-full h-screen px-4">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 
                            dark:from-neutral-100 dark:to-neutral-400 text-5xl md:text-6xl lg:text-8xl font-sans 
                            py-2 md:py-4 font-bold tracking-tight"
                        >
                            FRA ATLAS
                        </motion.h1>

                        <motion.p
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                            className="max-w-4xl mx-auto text-lg md:text-xl text-neutral-700 dark:text-neutral-300 
                            mt-6 mb-10 leading-relaxed font-medium"
                        >
                            Development of AI-powered FRA Atlas and WebGIS-based Decision Support System (DSS) for
                            Integrated Monitoring of Forest Rights Act (FRA) Implementation.
                            <span className="block mt-2 text-base md:text-lg text-neutral-600 dark:text-neutral-400">
                                States: Madhya Pradesh, Tripura, Odisha, Telangana
                            </span>
                        </motion.p>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 
                                text-white font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 
                                transition-all duration-300 border border-blue-400/20"
                            >
                                Explore Atlas
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-2xl bg-transparent border-2 border-neutral-300 
                                dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 font-semibold text-lg 
                                hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300"
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Interactive Cards Section */}
                <div className="w-full max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                            Explore Our Technology Stack
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Drag and explore the key components that power our AI-driven FRA monitoring system
                        </p>
                    </motion.div>

                    <DraggableCardContainer className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-700">
                        <motion.p
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute top-1/2 mx-auto max-w-md -translate-y-3/4 text-center text-2xl 
                            font-bold text-neutral-500 md:text-3xl dark:text-neutral-600 z-0"
                        >
                            Intelligent Forest Rights Management through AI Innovation
                        </motion.p>

                        {fraCards.map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                                animate={{ opacity: 1, scale: 1, rotate: parseFloat(card.className.match(/rotate-\[([^\]]+)\]/)?.[1] || '0') }}
                                transition={{ delay: 0.8 + (index * 0.1), duration: 0.6, ease: "easeOut" }}
                            >
                                <DraggableCardBody className={card.className}>
                                    <div className="relative group">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="pointer-events-none relative z-10 h-64 w-64 md:h-80 md:w-80 object-cover 
                                            rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 
                                            border-4 border-white dark:border-neutral-800"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                                                      rounded-2xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <h3 className="absolute bottom-4 left-4 right-4 text-center text-xl md:text-2xl font-bold 
                                                     text-white z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 
                                                     transform translate-y-2 group-hover:translate-y-0">
                                            {card.title}
                                        </h3>
                                    </div>
                                </DraggableCardBody>
                            </motion.div>
                        ))}
                    </DraggableCardContainer>
                    <div className="w-full flex justify-center mt-12 mb-6">
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            <AnimatedTooltip items={people} scale={2} />
                        </div>
                    </div>


                </div>

                {/* Content Section with TracingBeam */}
                <TracingBeam className="w-full max-w-6xl">
                    <div className="max-w-4xl mx-auto antialiased pt-8 relative pb-16 space-y-24">

                        {/* Proposed Solution */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col lg:flex-row items-center gap-12"
                        >
                            <div className="lg:w-1/2 space-y-6">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full 
                                             text-sm w-fit px-6 py-3 mb-6 font-semibold shadow-lg"
                                >
                                    Proposed Solution
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
                                    Hybrid AI + GeoAI–powered FRA Decision Support System
                                </h3>
                                <ul className="space-y-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-400">
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Digitizes FRA claims using OCR + NER, stored in PostGIS DB.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Maps assets via AI models (U-Net, RF, NDVI/NDWI).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Visualizes insights in an interactive FRA Atlas & WebGIS.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Recommends CSS schemes via Explainable DSS.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Ensures transparent + scalable policy delivery.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="lg:w-1/2">
                                <motion.div
                                    whileHover={{ scale: 1.03, rotateY: 5 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                >
                                    <img
                                        src="/flowcharts/flowchart.jpg"
                                        alt="AI Mapping Technology"
                                        className="rounded-2xl shadow-2xl object-contain w-full h-80 border border-neutral-200 dark:border-neutral-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-2xl" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Problem Addressing */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col lg:flex-row-reverse items-center gap-12"
                        >
                            <div className="lg:w-1/2 space-y-6">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full 
                                             text-sm w-fit px-6 py-3 mb-6 font-semibold shadow-lg"
                                >
                                    Problem Solution
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
                                    Addressing Critical Challenges
                                </h3>
                                <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-400">
                                    Overcomes fragmented, non-digitized FRA records, lack of asset integration,
                                    and absence of a centralized system by creating a real-time FRA Atlas
                                    with scheme-layering intelligence for comprehensive forest rights management.
                                </p>
                            </div>
                            <div className="lg:w-1/2">
                                <motion.div
                                    whileHover={{ scale: 1.03, rotateY: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                >
                                    <img
                                        src="/flowcharts/risks.jpg"
                                        alt="Data Integration Flow"
                                        className="rounded-2xl shadow-2xl object-cover w-full h-80 border border-neutral-200 dark:border-neutral-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tl from-green-500/20 to-transparent rounded-2xl" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Innovation */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col lg:flex-row items-center gap-12"
                        >
                            <div className="lg:w-1/2 space-y-6">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full 
                                             text-sm w-fit px-6 py-3 mb-6 font-semibold shadow-lg"
                                >
                                    Innovation & Uniqueness
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
                                    Cutting-Edge Technology Stack
                                </h3>
                                <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-400">
                                    Hybrid AI + Rule-based DSS, GeoAI-driven asset detection, Explainable AI dashboards,
                                    participatory mobile feedback, and predictive modeling for proactive planning
                                    make it a first-of-its-kind comprehensive forest rights management solution.
                                </p>
                            </div>
                            <div className="lg:w-1/2">
                                <motion.div
                                    whileHover={{ scale: 1.03, rotateY: 5 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=800&q=80"
                                        alt="Innovation Technology"
                                        className="rounded-2xl shadow-2xl object-cover w-full h-80 border border-neutral-200 dark:border-neutral-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-2xl" />
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </TracingBeam>

                {/* Call-to-Action Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center py-20"
                >



                </motion.div>

            </BackgroundLines>
        </div>
    );
}



