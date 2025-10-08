import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import Boxes from "../components/ui/background-boxes";
import * as THREE from "three";

const AboutUs = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Vidyans Sankalp",
      role: "Team Lead",
      image: "./team/vidyans.png",
      bio: "Leading the squad while juggling code, caffeine, and campus life.",
      expertise: ["Forest Rights Act", "Community Development", "Policy Making"],
      achievements: "Organized 3 hackathons at IIT Mandi",
      email: "vidyans@gmail.com",
      phone: "XXXXXXXXXXXXX",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Vansh Pandey",
      role: "Team member",
      image: "./team/vansh.png",
      bio: "Turning complex datasets into brainy insights with Python magic.",
      expertise: ["Machine Learning", "Geospatial Analysis", "Predictive Modeling"],
      achievements: "Built an AI model predicting student project outcomes",
      email: "vansh@gmail.com",
      phone: "XXXXXXXXXXXXX",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Paridhi Mittal",
      role: "Team member",
      image: "./team/paridhi.png",
      bio: "Coding ninja with a love for algorithms and late-night snacks.",
      expertise: ["GIS Mapping", "Remote Sensing", "Spatial Analysis"],
      achievements: "Developed a campus map app with 100% route accuracy",
      email: "paridhi@gmail.com",
      phone: "XXXXXXXXXXXXX",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Aman Jangir",
      role: "Team member",
      image: "./team/aman.png",
      bio: "Exploring data patterns while surviving on coffee and curiosity.",
      expertise: ["Community Engagement", "Scheme Implementation", "Field Operations"],
      achievements: "Helped organize 2 student community outreach events",
      email: "aman@gmail.com",
      phone: "XXXXXXXXXXXXX",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "Arnav Thakur",
      role: "Team member",
      image: "./team/arnav.png",
      bio: "Full-stack explorer—if it’s online, I’ve probably built it.",
      expertise: ["Hydraulics", "Irrigation Systems", "Water Conservation"],
      achievements: "Created an irrigation monitoring dashboard for the campus garden",
      email: "arnav@gmail.com",
      phone: "XXXXXXXXXXXXX",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 6,
      name: "Anushka Sinha",
      role: "Team member",
      image: "./team/anushka.jpg",
      bio: "AI enthusiast and caffeine-fueled problem solver of complex codes.",
      expertise: ["Crop Management", "Organic Farming", "Extension Services"],
      achievements: "Built a small ML model predicting crop yield in lab experiments",
      email: "anushka@gmail.com",
      phone: "XXXXXXXXXXXXX",
      color: "from-yellow-500 to-orange-500"
    }
  ];


  // Three.js 3D Background
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create rotating torus
    const torusGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0x4f46e5, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    sceneRef.current = { scene, camera, renderer, particlesMesh, torus };

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-slate-900">
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ opacity: 0.4 }}
      />

      {/* Animated Grid Background */}
      {/* <Boxes className="absolute inset-0 z-0" /> */}

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16 px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(59, 130, 246, 0.8)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Meet Our <span className="text-blue-500">Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-neutral-300 max-w-3xl mx-auto"
          >
            Dedicated professionals working towards empowering forest rights holders
            and building sustainable communities in Himachal Pradesh
          </motion.p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Team Members", value: "6+", icon: "👥" },
              { label: "Families Helped", value: "1000+", icon: "🏡" },
              { label: "Projects Completed", value: "50+", icon: "✅" },
              { label: "Years Experience", value: "15+", icon: "⭐" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Cards Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                onHoverStart={() => setHoveredCard(member.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => setSelectedMember(member)}
                className="relative cursor-pointer group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={cn(
                  "relative bg-black/40 backdrop-blur-xl border rounded-3xl p-6 transition-all duration-300",
                  hoveredCard === member.id
                    ? "border-blue-500 shadow-2xl shadow-blue-500/30"
                    : "border-white/10"
                )}>
                  {/* Gradient Overlay */}
                  <div className={cn(
                    "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br",
                    member.color
                  )} />

                  {/* Avatar */}
                  <motion.div
                    animate={hoveredCard === member.id ? {
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                    className="relative mx-auto w-32 h-32 mb-4"
                  >
                    <div className={cn(
                      "absolute inset-0 rounded-full bg-gradient-to-br blur-xl opacity-50",
                      member.color
                    )} />
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center border-2 border-white/20 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                  </motion.div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-white text-center mb-1">
                    {member.name}
                  </h3>
                  <p className={cn(
                    "text-sm font-medium text-center mb-3 bg-gradient-to-r bg-clip-text text-transparent",
                    member.color
                  )}>
                    {member.role}
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-4 line-clamp-2">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.expertise.slice(0, 2).map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* View More Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-full py-2 rounded-xl font-medium text-white transition-all bg-gradient-to-r",
                      member.color
                    )}
                  >
                    View Profile
                  </motion.button>

                  {/* Floating Badge */}
                  <motion.div
                    animate={hoveredCard === member.id ? {
                      y: [0, -10, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg"
                  >
                    #{index + 1}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="max-w-4xl mx-auto mt-20 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🌲
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-lg text-neutral-300 leading-relaxed">
            To empower forest rights holders through technology, data-driven insights,
            and community engagement, ensuring sustainable development and preservation
            of forest resources for future generations.
          </p>
        </motion.div>
      </div>

      {/* Detailed Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 90 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-blue-500/30 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-red-400 font-bold text-xl transition-colors"
              >
                ×
              </motion.button>

              {/* Profile Header */}
              <div className="flex items-start gap-6 mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative"
                >
                  <div className={cn(
                    "absolute inset-0 rounded-full bg-gradient-to-br blur-2xl",
                    selectedMember.color
                  )} />
                  <div className="relative w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center border-4 border-blue-500/30 overflow-hidden">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                </motion.div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className={cn(
                    "text-lg font-medium mb-3 bg-gradient-to-r bg-clip-text text-transparent",
                    selectedMember.color
                  )}>
                    {selectedMember.role}
                  </p>
                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={`mailto:${selectedMember.email}`}
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-sm transition-colors"
                    >
                      📧 Email
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={`tel:${selectedMember.phone}`}
                      className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg text-sm transition-colors"
                    >
                      📞 Call
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">📝</span> About
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span> Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.expertise.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className={cn(
                        "px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r",
                        selectedMember.color
                      )}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-4">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-2xl">🏆</span> Key Achievement
                </h3>
                <p className="text-yellow-200 font-medium">
                  {selectedMember.achievements}
                </p>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-neutral-400 mb-1">Email</p>
                    <p className="text-sm text-white font-medium">{selectedMember.email}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-neutral-400 mb-1">Phone</p>
                    <p className="text-sm text-white font-medium">{selectedMember.phone}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutUs;