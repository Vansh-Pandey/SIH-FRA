import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapContainer, TileLayer, Polygon, Popup, useMap } from "react-leaflet";
import { cn } from "../lib/utils";
import Boxes from "../components/ui/background-boxes";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React-Leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map zoom/pan
function MapController({ selectedRegion }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedRegion) {
      map.flyTo(selectedRegion.data.coordinates, 14, { duration: 1 });
    }
  }, [selectedRegion, map]);
  
  return null;
}

const Atlas = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Real coordinates for Himachal Pradesh regions with polygon boundaries
  const regions = {
    mandi: {
      id: "mandi",
      name: "Mandi District",
      color: "#3b82f6",
      coordinates: [
        [31.7144, 76.9536],
        [31.7244, 76.9736],
        [31.7044, 76.9836],
        [31.6944, 76.9636],
        [31.7044, 76.9436]
      ],
      data: {
        landOwner: "Rajesh Kumar",
        size: "15.5 acres",
        landType: "Agricultural",
        claimStatus: "Approved",
        village: "Mandi Town",
        pattaNumber: "HP/MND/2024/001",
        timeline: {
          claimed: "Jan 15, 2024",
          surveyed: "Feb 10, 2024",
          approved: "Mar 5, 2024"
        },
        contract: {
          type: "Individual Forest Rights",
          duration: "Perpetual",
          restrictions: "No commercial logging"
        },
        coordinates: { lat: 31.7044, lng: 76.9636 },
        boundaries: "North: River Beas, South: NH-21, East: Village Road, West: Forest Area",
        soilType: "Loamy",
        waterSource: "Natural Stream",
        crops: ["Wheat", "Maize", "Vegetables"]
      }
    },
    kullu: {
      id: "kullu",
      name: "Kullu Valley",
      color: "#10b981",
      coordinates: [
        [31.9680, 77.0999],
        [31.9780, 77.1199],
        [31.9580, 77.1299],
        [31.9480, 77.1099],
        [31.9580, 77.0899]
      ],
      data: {
        landOwner: "Priya Sharma",
        size: "22.3 acres",
        landType: "Mixed Forest",
        claimStatus: "Under Review",
        village: "Kullu Valley",
        pattaNumber: "HP/KUL/2024/045",
        timeline: {
          claimed: "Feb 20, 2024",
          surveyed: "Mar 15, 2024",
          approved: "Pending"
        },
        contract: {
          type: "Community Forest Rights",
          duration: "99 years renewable",
          restrictions: "Sustainable harvesting only"
        },
        coordinates: { lat: 31.9580, lng: 77.1099 },
        boundaries: "North: Mountain Ridge, South: Beas River, East: Pine Forest, West: State Highway",
        soilType: "Sandy Loam",
        waterSource: "Multiple Springs",
        crops: ["Apple Orchards", "Timber Trees"]
      }
    },
    shimla: {
      id: "shimla",
      name: "Shimla Rural",
      color: "#f59e0b",
      coordinates: [
        [31.1148, 77.1634],
        [31.1248, 77.1834],
        [31.1048, 77.1934],
        [31.0948, 77.1734],
        [31.1048, 77.1534]
      ],
      data: {
        landOwner: "Amit Singh",
        size: "8.7 acres",
        landType: "Residential & Agricultural",
        claimStatus: "Approved",
        village: "Shimla Rural",
        pattaNumber: "HP/SML/2023/112",
        timeline: {
          claimed: "Oct 5, 2023",
          surveyed: "Nov 20, 2023",
          approved: "Dec 15, 2023"
        },
        contract: {
          type: "Individual Forest Rights",
          duration: "Perpetual",
          restrictions: "Construction limited to 200 sq meters"
        },
        coordinates: { lat: 31.1048, lng: 77.1734 },
        boundaries: "North: Village Commons, South: Private Land, East: Forest Road, West: Stream",
        soilType: "Clay Loam",
        waterSource: "Well & Rainwater",
        crops: ["Vegetables", "Fruit Trees", "Flowers"]
      }
    },
    solan: {
      id: "solan",
      name: "Solan District",
      color: "#8b5cf6",
      coordinates: [
        [30.9145, 77.0867],
        [30.9245, 77.1067],
        [30.9045, 77.1167],
        [30.8945, 77.0967],
        [30.9045, 77.0767]
      ],
      data: {
        landOwner: "Neha Verma",
        size: "12.1 acres",
        landType: "Forest Land",
        claimStatus: "Pending",
        village: "Solan",
        pattaNumber: "HP/SOL/2024/078",
        timeline: {
          claimed: "Mar 10, 2024",
          surveyed: "Apr 5, 2024",
          approved: "Pending"
        },
        contract: {
          type: "Community Forest Rights",
          duration: "50 years",
          restrictions: "No mining, selective logging permitted"
        },
        coordinates: { lat: 30.9045, lng: 77.0967 },
        boundaries: "North: National Highway, South: Cultivated Land, East: State Forest, West: Village",
        soilType: "Red Soil",
        waterSource: "Seasonal Stream",
        crops: ["Mushrooms", "Medicinal Plants", "Bamboo"]
      }
    },
    chamba: {
      id: "chamba",
      name: "Chamba Region",
      color: "#ec4899",
      coordinates: [
        [32.5656, 76.1161],
        [32.5756, 76.1361],
        [32.5556, 76.1461],
        [32.5456, 76.1261],
        [32.5556, 76.1061]
      ],
      data: {
        landOwner: "Vikram Thakur",
        size: "18.9 acres",
        landType: "Grazing Land",
        claimStatus: "Approved",
        village: "Chamba",
        pattaNumber: "HP/CHM/2023/034",
        timeline: {
          claimed: "Aug 12, 2023",
          surveyed: "Sep 18, 2023",
          approved: "Oct 25, 2023"
        },
        contract: {
          type: "Community Rights",
          duration: "Perpetual",
          restrictions: "Traditional grazing only, no fencing"
        },
        coordinates: { lat: 32.5556, lng: 76.1261 },
        boundaries: "North: Ridge Line, South: Village Path, East: Grazing Commons, West: River",
        soilType: "Mountain Soil",
        waterSource: "Natural Springs",
        crops: ["Grass", "Fodder", "Wild Herbs"]
      }
    }
  };

  const filteredRegions = Object.values(regions).filter(region =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    region.data.landOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    region.data.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Center of Himachal Pradesh
  const mapCenter = [31.1048, 77.1734];

  return (
    <div className="relative w-full min-h-screen bg-slate-900 flex flex-col items-center pt-20 pb-12 overflow-y-auto">
      <Boxes className="absolute inset-0 z-0" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 text-center px-4 mb-6"
      >
        <h1 className="md:text-5xl text-3xl text-white font-bold">
          FRA <span className="text-blue-500">Atlas</span>
        </h1>
        <p className="mt-2 text-lg text-neutral-300">
          Interactive land mapping with detailed ownership information
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 w-full max-w-md px-4 mb-6"
      >
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by region, owner, or village..."
            className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </motion.div>

      <div className="relative z-20 w-full max-w-7xl px-4 flex gap-6">
        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          style={{ height: '600px' }}
        >
          <MapContainer
            center={mapCenter}
            zoom={9}
            style={{ height: '100%', width: '100%', borderRadius: '24px' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapController selectedRegion={selectedRegion} />

            {/* Render land parcels */}
            {Object.values(regions).map((region) => (
              <Polygon
                key={region.id}
                positions={region.coordinates}
                pathOptions={{
                  color: region.color,
                  fillColor: region.color,
                  fillOpacity: 0.5,
                  weight: selectedRegion?.id === region.id ? 4 : 2
                }}
                eventHandlers={{
                  click: () => setSelectedRegion(region),
                  mouseover: (e) => {
                    e.target.setStyle({
                      fillOpacity: 0.7,
                      weight: 4
                    });
                  },
                  mouseout: (e) => {
                    e.target.setStyle({
                      fillOpacity: 0.5,
                      weight: selectedRegion?.id === region.id ? 4 : 2
                    });
                  }
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{region.name}</strong><br />
                    Owner: {region.data.landOwner}<br />
                    Size: {region.data.size}<br />
                    <button
                      onClick={() => setSelectedRegion(region)}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Polygon>
            ))}
          </MapContainer>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-96 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          style={{ height: '600px' }}
        >
          <div className="h-full overflow-y-auto p-6 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]">
            {selectedRegion ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedRegion.name}</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedRegion(null)}
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
                  >
                    ×
                  </motion.button>
                </div>

                {/* Status Badge */}
                <div className={cn(
                  "inline-flex px-3 py-1 rounded-full text-sm font-medium",
                  selectedRegion.data.claimStatus === "Approved"
                    ? "bg-green-500/20 text-green-300"
                    : selectedRegion.data.claimStatus === "Pending"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-orange-500/20 text-orange-300"
                )}>
                  {selectedRegion.data.claimStatus}
                </div>

                {/* Owner Info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-medium">Land Owner</span>
                  </div>
                  <p className="text-white font-bold text-lg">{selectedRegion.data.landOwner}</p>
                  <p className="text-sm text-neutral-400">Patta #: {selectedRegion.data.pattaNumber}</p>
                </div>

                {/* Basic Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-3">
                    <p className="text-xs text-blue-300 mb-1">Land Size</p>
                    <p className="text-lg font-bold text-white">{selectedRegion.data.size}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-3">
                    <p className="text-xs text-purple-300 mb-1">Land Type</p>
                    <p className="text-lg font-bold text-white">{selectedRegion.data.landType}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <p className="text-white font-medium">{selectedRegion.data.village}</p>
                  <p className="text-xs text-neutral-400 mt-1">
                    {selectedRegion.data.coordinates.lat}, {selectedRegion.data.coordinates.lng}
                  </p>
                </div>

                {/* Timeline */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-orange-400 mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Timeline</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Claimed:</span>
                      <span className="text-white">{selectedRegion.data.timeline.claimed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Surveyed:</span>
                      <span className="text-white">{selectedRegion.data.timeline.surveyed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Approved:</span>
                      <span className="text-white">{selectedRegion.data.timeline.approved}</span>
                    </div>
                  </div>
                </div>

                {/* Contract Details */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-pink-400 mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium">Contract Details</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-neutral-400">Type: </span>
                      <span className="text-white">{selectedRegion.data.contract.type}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Duration: </span>
                      <span className="text-white">{selectedRegion.data.contract.duration}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Restrictions: </span>
                      <span className="text-white">{selectedRegion.data.contract.restrictions}</span>
                    </div>
                  </div>
                </div>

                {/* Boundaries */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="text-sm font-medium">Boundaries</span>
                  </div>
                  <p className="text-sm text-neutral-300">{selectedRegion.data.boundaries}</p>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-neutral-400 mb-1">Soil Type</p>
                    <p className="text-sm font-medium text-white">{selectedRegion.data.soilType}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-neutral-400 mb-1">Water Source</p>
                    <p className="text-sm font-medium text-white">{selectedRegion.data.waterSource}</p>
                  </div>
                </div>

                {/* Crops */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="text-sm font-medium">Crops / Resources</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedRegion.data.crops.map((crop, i) => (
                      <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                        {crop}
                      </span>
                    ))}
                  </div>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </motion.div>
                <p className="text-white font-medium text-lg mb-2">Select a Region</p>
                <p className="text-neutral-400 text-sm">Click on any highlighted area on the map to view detailed land information</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 mt-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-7xl w-full mx-4"
      >
        <h3 className="text-white font-medium mb-3">Map Legend</h3>
        <div className="flex flex-wrap gap-4">
          {Object.values(regions).map((region) => (
            <div key={region.id} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: region.color }}
              />
              <span className="text-sm text-neutral-300">{region.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Atlas;