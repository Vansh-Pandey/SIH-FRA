import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import Boxes from "../components/ui/background-boxes";

const DSS = () => {
    const [selectedHolder, setSelectedHolder] = useState(null);
    const [analysisType, setAnalysisType] = useState("individual");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [filterScheme, setFilterScheme] = useState("all");
    const [priorityLevel, setPriorityLevel] = useState("all");

    // Mock FRA holders data
    const fraHolders = [
        {
            id: 1,
            name: "Rajesh Kumar",
            village: "Mandi Town",
            district: "Mandi",
            landSize: 15.5,
            waterIndex: 3.2,
            soilQuality: "Poor",
            income: "Below ₹2L/year",
            familySize: 6,
            electricity: "Available",
            irrigation: "Rainfed",
            livestock: 4,
            schemes: {
                eligible: ["DAJGUA", "Jal Shakti", "PM-KUSUM", "MGNREGA"],
                enrolled: ["MGNREGA"],
                recommended: ["DAJGUA", "Jal Shakti", "PM-KUSUM"]
            }
        },
        {
            id: 2,
            name: "Priya Sharma",
            village: "Kullu Valley",
            district: "Kullu",
            landSize: 22.3,
            waterIndex: 6.8,
            soilQuality: "Good",
            income: "₹2-5L/year",
            familySize: 4,
            electricity: "Available",
            irrigation: "Canal",
            livestock: 8,
            schemes: {
                eligible: ["PM-KUSUM", "Soil Health Card", "Kisan Credit Card"],
                enrolled: ["Soil Health Card"],
                recommended: ["PM-KUSUM", "Kisan Credit Card"]
            }
        },
        {
            id: 3,
            name: "Amit Singh",
            village: "Shimla Rural",
            district: "Shimla",
            landSize: 8.7,
            waterIndex: 4.1,
            soilQuality: "Moderate",
            income: "Below ₹2L/year",
            familySize: 5,
            electricity: "Intermittent",
            irrigation: "Rainfed",
            livestock: 3,
            schemes: {
                eligible: ["DAJGUA", "Jal Shakti", "PMAY-G", "PM-KUSUM"],
                enrolled: ["PMAY-G"],
                recommended: ["DAJGUA", "Jal Shakti", "PM-KUSUM"]
            }
        },
        {
            id: 4,
            name: "Neha Verma",
            village: "Solan",
            district: "Solan",
            landSize: 12.1,
            waterIndex: 2.8,
            soilQuality: "Poor",
            income: "Below ₹2L/year",
            familySize: 7,
            electricity: "Not Available",
            irrigation: "Rainfed",
            livestock: 5,
            schemes: {
                eligible: ["DAJGUA", "Jal Shakti", "Saubhagya", "PM-KUSUM", "MGNREGA"],
                enrolled: [],
                recommended: ["Jal Shakti", "Saubhagya", "DAJGUA"]
            }
        },
        {
            id: 5,
            name: "Vikram Thakur",
            village: "Chamba",
            district: "Chamba",
            landSize: 18.9,
            waterIndex: 5.5,
            soilQuality: "Good",
            income: "₹2-5L/year",
            familySize: 4,
            electricity: "Available",
            irrigation: "Well",
            livestock: 10,
            schemes: {
                eligible: ["PM-KUSUM", "Animal Husbandry", "Kisan Credit Card"],
                enrolled: ["Animal Husbandry"],
                recommended: ["PM-KUSUM", "Kisan Credit Card"]
            }
        }
    ];

    // Priority interventions data
    const priorityInterventions = [
        {
            id: 1,
            intervention: "Borewell Installation",
            scheme: "Jal Shakti Abhiyan",
            targetVillages: ["Mandi Town", "Solan"],
            beneficiaries: 45,
            priority: "Critical",
            waterIndex: "< 3.5",
            estimatedCost: "₹12.5L",
            timeline: "3-4 months",
            impact: "High - Will benefit 45 families with reliable water source"
        },
        {
            id: 2,
            intervention: "Solar Pump Installation",
            scheme: "PM-KUSUM",
            targetVillages: ["Shimla Rural", "Mandi Town"],
            beneficiaries: 32,
            priority: "High",
            waterIndex: "3.5 - 5.0",
            estimatedCost: "₹8.2L",
            timeline: "2-3 months",
            impact: "Medium-High - Sustainable irrigation for 32 farmers"
        },
        {
            id: 3,
            intervention: "Dairy Cooperative Setup",
            scheme: "DAJGUA",
            targetVillages: ["Chamba", "Kullu Valley"],
            beneficiaries: 28,
            priority: "High",
            waterIndex: "N/A",
            estimatedCost: "₹15.8L",
            timeline: "6-8 months",
            impact: "High - Economic upliftment through organized dairy sector"
        },
        {
            id: 4,
            intervention: "Electricity Connection",
            scheme: "Saubhagya",
            targetVillages: ["Solan"],
            beneficiaries: 18,
            priority: "Critical",
            waterIndex: "N/A",
            estimatedCost: "₹3.6L",
            timeline: "1-2 months",
            impact: "Critical - Basic amenity for 18 families"
        },
        {
            id: 5,
            intervention: "Soil Testing & Amendment",
            scheme: "Soil Health Card",
            targetVillages: ["Mandi Town", "Solan", "Shimla Rural"],
            beneficiaries: 56,
            priority: "Medium",
            waterIndex: "N/A",
            estimatedCost: "₹2.1L",
            timeline: "1 month",
            impact: "Medium - Improved crop yield through informed farming"
        }
    ];

    const handleAnalyze = (holder) => {
        setSelectedHolder(holder);
        setIsAnalyzing(true);

        setTimeout(() => {
            setIsAnalyzing(false);

            // Generate AI-enhanced recommendations
            const aiRecommendations = {
                eligibilityScore: Math.floor(Math.random() * 30) + 70,
                topSchemes: holder.schemes.recommended,
                criticalNeeds: generateCriticalNeeds(holder),
                actionPlan: generateActionPlan(holder),
                financialProjection: {
                    currentIncome: holder.income,
                    projectedIncome: holder.income === "Below ₹2L/year" ? "₹3-4L/year" : "₹6-8L/year",
                    timeframe: "2-3 years"
                },
                priorityScore: calculatePriorityScore(holder)
            };

            setRecommendations(aiRecommendations);
        }, 2000);
    };

    const generateCriticalNeeds = (holder) => {
        const needs = [];
        if (holder.waterIndex < 4.0) needs.push("Water Access");
        if (holder.soilQuality === "Poor") needs.push("Soil Improvement");
        if (holder.electricity !== "Available") needs.push("Electricity");
        if (holder.irrigation === "Rainfed") needs.push("Irrigation");
        if (holder.income === "Below ₹2L/year") needs.push("Income Enhancement");
        return needs;
    };

    const generateActionPlan = (holder) => {
        const plan = [];

        if (holder.waterIndex < 4.0) {
            plan.push({
                action: "Install Borewell/Tubewell",
                scheme: "Jal Shakti Abhiyan",
                timeline: "Immediate (0-3 months)",
                priority: "Critical"
            });
        }

        if (holder.schemes.recommended.includes("DAJGUA")) {
            plan.push({
                action: "Register for Dairy Cooperative",
                scheme: "DAJGUA",
                timeline: "Short-term (3-6 months)",
                priority: "High"
            });
        }

        if (holder.schemes.recommended.includes("PM-KUSUM")) {
            plan.push({
                action: "Apply for Solar Pump",
                scheme: "PM-KUSUM",
                timeline: "Medium-term (6-12 months)",
                priority: "High"
            });
        }

        if (holder.soilQuality === "Poor") {
            plan.push({
                action: "Soil Testing & Treatment",
                scheme: "Soil Health Card",
                timeline: "Immediate (0-1 month)",
                priority: "Medium"
            });
        }

        return plan;
    };

    const calculatePriorityScore = (holder) => {
        let score = 0;
        if (holder.waterIndex < 4.0) score += 30;
        if (holder.income === "Below ₹2L/year") score += 25;
        if (holder.electricity !== "Available") score += 20;
        if (holder.soilQuality === "Poor") score += 15;
        if (holder.familySize > 5) score += 10;
        return score;
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "Critical": return "text-red-400 bg-red-500/20 border-red-500/30";
            case "High": return "text-orange-400 bg-orange-500/20 border-orange-500/30";
            case "Medium": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
            default: return "text-blue-400 bg-blue-500/20 border-blue-500/30";
        }
    };

    const filteredInterventions = priorityInterventions.filter(intervention => {
        if (priorityLevel !== "all" && intervention.priority !== priorityLevel) return false;
        if (filterScheme !== "all" && intervention.scheme !== filterScheme) return false;
        return true;
    });

    return (
        <div className="relative w-full min-h-screen bg-slate-900 flex flex-col items-center pt-20 pb-12 overflow-y-auto">
            <Boxes className="absolute inset-0 z-0" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-20 text-center px-4 mb-8"
            >
                <h1 className="md:text-5xl text-3xl text-white font-bold">
                    Decision Support <span className="text-blue-500">System</span>
                </h1>
                <p className="mt-2 text-lg text-neutral-300">
                    AI-Enhanced scheme recommendations and priority interventions
                </p>
            </motion.div>

            {/* Analysis Type Selector */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-20 flex gap-4 mb-8"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setAnalysisType("individual");
                        setSelectedHolder(null);
                        setRecommendations(null);
                    }}
                    className={cn(
                        "px-6 py-3 rounded-xl font-bold transition-all",
                        analysisType === "individual"
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                            : "bg-white/10 text-neutral-300 hover:bg-white/20"
                    )}
                >
                    Individual Analysis
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setAnalysisType("community");
                        setSelectedHolder(null);
                        setRecommendations(null);
                    }}
                    className={cn(
                        "px-6 py-3 rounded-xl font-bold transition-all",
                        analysisType === "community"
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                            : "bg-white/10 text-neutral-300 hover:bg-white/20"
                    )}
                >
                    Priority Interventions
                </motion.button>
            </motion.div>

            <div className="relative z-20 w-full max-w-7xl px-4">
                <AnimatePresence mode="wait">
                    {analysisType === "individual" ? (
                        <motion.div
                            key="individual"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex gap-6"
                        >
                            {/* FRA Holders List */}
                            <div className="w-1/3 space-y-4">
                                <h2 className="text-xl font-bold text-white mb-4">FRA Holders</h2>
                                {fraHolders.map((holder) => (
                                    <motion.div
                                        key={holder.id}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        onClick={() => handleAnalyze(holder)}
                                        className={cn(
                                            "bg-black/40 backdrop-blur-xl border rounded-2xl p-4 cursor-pointer transition-all",
                                            selectedHolder?.id === holder.id
                                                ? "border-blue-500 shadow-lg shadow-blue-500/30"
                                                : "border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-white font-bold">{holder.name}</h3>
                                                <p className="text-sm text-neutral-400">{holder.village}, {holder.district}</p>
                                            </div>
                                            <div className={cn(
                                                "px-2 py-1 rounded-full text-xs font-medium",
                                                holder.waterIndex < 4 ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
                                            )}>
                                                WI: {holder.waterIndex}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 text-xs">
                                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                                                {holder.landSize} acres
                                            </span>
                                            <span className={cn(
                                                "px-2 py-1 rounded",
                                                holder.income === "Below ₹2L/year"
                                                    ? "bg-orange-500/20 text-orange-300"
                                                    : "bg-green-500/20 text-green-300"
                                            )}>
                                                {holder.income}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Analysis Results */}
                            <div className="flex-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-y-auto" style={{ maxHeight: '700px' }}>
                                {isAnalyzing ? (
                                    <div className="h-full flex flex-col items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
                                        />
                                        <p className="text-white font-medium text-lg">Analyzing Data...</p>
                                        <p className="text-neutral-400 text-sm mt-2">Processing eligibility and recommendations</p>
                                    </div>
                                ) : selectedHolder && recommendations ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white">{selectedHolder.name}</h2>
                                                <p className="text-neutral-400">{selectedHolder.village}, {selectedHolder.district}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-blue-400">{recommendations.eligibilityScore}%</div>
                                                <p className="text-xs text-neutral-400">Eligibility Score</p>
                                            </div>
                                        </div>

                                        {/* Priority Score */}
                                        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-red-300 mb-1">Priority Score</p>
                                                    <p className="text-2xl font-bold text-white">{recommendations.priorityScore}/100</p>
                                                </div>
                                                <div className={cn(
                                                    "px-4 py-2 rounded-full font-bold",
                                                    recommendations.priorityScore > 70 ? "bg-red-500/30 text-red-300" :
                                                        recommendations.priorityScore > 40 ? "bg-orange-500/30 text-orange-300" :
                                                            "bg-yellow-500/30 text-yellow-300"
                                                )}>
                                                    {recommendations.priorityScore > 70 ? "CRITICAL" :
                                                        recommendations.priorityScore > 40 ? "HIGH" : "MEDIUM"}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Current Status Grid */}
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                                <p className="text-xs text-neutral-400 mb-1">Land Size</p>
                                                <p className="text-lg font-bold text-white">{selectedHolder.landSize} acres</p>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                                <p className="text-xs text-neutral-400 mb-1">Water Index</p>
                                                <p className={cn(
                                                    "text-lg font-bold",
                                                    selectedHolder.waterIndex < 4 ? "text-red-400" : "text-green-400"
                                                )}>{selectedHolder.waterIndex}/10</p>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                                <p className="text-xs text-neutral-400 mb-1">Soil Quality</p>
                                                <p className="text-lg font-bold text-white">{selectedHolder.soilQuality}</p>
                                            </div>
                                        </div>

                                        {/* Critical Needs */}
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                Critical Needs Identified
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {recommendations.criticalNeeds.map((need, i) => (
                                                    <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-medium">
                                                        {need}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Recommended Schemes */}
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Top Recommended Schemes
                                            </h3>
                                            <div className="space-y-2">
                                                {recommendations.topSchemes.map((scheme, i) => (
                                                    <div key={i} className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">
                                                                {i + 1}
                                                            </div>
                                                            <span className="text-white font-medium">{scheme}</span>
                                                        </div>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="px-4 py-1 bg-blue-500 text-white rounded-lg text-sm font-medium"
                                                        >
                                                            Apply Now
                                                        </motion.button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Plan */}
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                Prioritized Action Plan
                                            </h3>
                                            <div className="space-y-3">
                                                {recommendations.actionPlan.map((action, i) => (
                                                    <div key={i} className="bg-black/30 rounded-lg p-4 border-l-4 border-blue-500">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <p className="text-white font-medium">{action.action}</p>
                                                                <p className="text-sm text-blue-400">{action.scheme}</p>
                                                            </div>
                                                            <span className={cn(
                                                                "px-2 py-1 rounded-full text-xs font-medium",
                                                                getPriorityColor(action.priority)
                                                            )}>
                                                                {action.priority}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-neutral-400">{action.timeline}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Financial Projection */}
                                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
                                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                                Income Projection
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-green-300 mb-1">Current Income</p>
                                                    <p className="text-xl font-bold text-white">{recommendations.financialProjection.currentIncome}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-green-300 mb-1">Projected Income</p>
                                                    <p className="text-xl font-bold text-white">{recommendations.financialProjection.projectedIncome}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-green-300 mt-3">
                                                Expected timeframe: {recommendations.financialProjection.timeframe}
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4"
                                        >
                                            <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </motion.div>
                                        <p className="text-white font-medium text-lg mb-2">Select an FRA Holder</p>
                                        <p className="text-neutral-400 text-sm">Click on any holder to get AI-powered recommendations and analysis</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="community"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* Filters */}
                            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex gap-4">
                                <div className="flex-1">
                                    <label className="text-sm text-neutral-400 mb-2 block">Filter by Scheme</label>
                                    <select
                                        value={filterScheme}
                                        onChange={(e) => setFilterScheme(e.target.value)}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all" className="bg-slate-800">All Schemes</option>
                                        <option value="Jal Shakti Abhiyan" className="bg-slate-800">Jal Shakti Abhiyan</option>
                                        <option value="PM-KUSUM" className="bg-slate-800">PM-KUSUM</option>
                                        <option value="DAJGUA" className="bg-slate-800">DAJGUA</option>
                                        <option value="Saubhagya" className="bg-slate-800">Saubhagya</option>
                                        <option value="Soil Health Card" className="bg-slate-800">Soil Health Card</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm text-neutral-400 mb-2 block">Filter by Priority</label>
                                    <select
                                        value={priorityLevel}
                                        onChange={(e) => setPriorityLevel(e.target.value)}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all" className="bg-slate-800">All Priorities</option>
                                        <option value="Critical" className="bg-slate-800">Critical</option>
                                        <option value="High" className="bg-slate-800">High</option>
                                        <option value="Medium" className="bg-slate-800">Medium</option>
                                    </select>
                                </div>
                            </div>

                            {/* Statistics Cards */}
                            <div className="grid grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-2xl p-4">
                                    <p className="text-sm text-red-300 mb-1">Critical Priority</p>
                                    <p className="text-3xl font-bold text-white">
                                        {priorityInterventions.filter(i => i.priority === "Critical").length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-2xl p-4">
                                    <p className="text-sm text-orange-300 mb-1">High Priority</p>
                                    <p className="text-3xl font-bold text-white">
                                        {priorityInterventions.filter(i => i.priority === "High").length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-4">
                                    <p className="text-sm text-blue-300 mb-1">Total Beneficiaries</p>
                                    <p className="text-3xl font-bold text-white">
                                        {priorityInterventions.reduce((sum, i) => sum + i.beneficiaries, 0)}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl p-4">
                                    <p className="text-sm text-green-300 mb-1">Total Budget</p>
                                    <p className="text-3xl font-bold text-white">₹42.2L</p>
                                </div>
                            </div>

                            {/* Interventions List */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    Priority Interventions ({filteredInterventions.length})
                                </h2>

                                {filteredInterventions.length === 0 ? (
                                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
                                        <p className="text-neutral-400 text-lg">No interventions match the selected filters</p>
                                    </div>
                                ) : (
                                    filteredInterventions.map((intervention, index) => (
                                        <motion.div
                                            key={intervention.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-bold text-white">{intervention.intervention}</h3>
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-full text-sm font-bold border",
                                                            getPriorityColor(intervention.priority)
                                                        )}>
                                                            {intervention.priority}
                                                        </span>
                                                    </div>
                                                    <p className="text-blue-400 font-medium mb-2">{intervention.scheme}</p>
                                                    <p className="text-neutral-400 text-sm">{intervention.impact}</p>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-6 py-2 bg-blue-500 text-white rounded-xl font-medium"
                                                >
                                                    Initiate
                                                </motion.button>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                                    <p className="text-xs text-neutral-400 mb-1">Beneficiaries</p>
                                                    <p className="text-lg font-bold text-white">{intervention.beneficiaries}</p>
                                                </div>
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                                    <p className="text-xs text-neutral-400 mb-1">Estimated Cost</p>
                                                    <p className="text-lg font-bold text-green-400">{intervention.estimatedCost}</p>
                                                </div>
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                                    <p className="text-xs text-neutral-400 mb-1">Timeline</p>
                                                    <p className="text-lg font-bold text-white">{intervention.timeline}</p>
                                                </div>
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                                    <p className="text-xs text-neutral-400 mb-1">Water Index</p>
                                                    <p className="text-lg font-bold text-blue-400">{intervention.waterIndex}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm text-neutral-400 mb-2">Target Villages:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {intervention.targetVillages.map((village, i) => (
                                                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                                                            {village}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DSS;