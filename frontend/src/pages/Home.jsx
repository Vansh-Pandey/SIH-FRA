import Boxes from "../components/ui/background-boxes";
import React from "react";
import { cn } from "../lib/utils";

const Home = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900 flex flex-col items-center pt-28">
      {/* Boxes Background */}
      <Boxes className="absolute inset-0 z-0" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4">
        <h1 className={cn("md:text-6xl text-4xl text-white font-bold")}>
          Welcome to <span className="text-blue-500">FRA ATLAS</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-300">
          Explore AI Mapping, DSS, and interactive visualizations.
        </p>
      </div>
    </div>
  );
};

export default Home;
