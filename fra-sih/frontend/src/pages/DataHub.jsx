import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import Boxes from "../components/ui/background-boxes";
import { useFileStore } from "../store/useFileUpload";
const DataHub = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fileType: "",
    fileName: "",
    description: "",
    region: "",
    dataSource: "",
  });
  const {
    uploadedFiles,  // This should contain all saved file metadata
    saveFileMetadata,
    getAllFiles,
    isSavingFile
  } = useFileStore();
  const [currentUploadedFile, setCurrentUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileMetadata = {
        fileName: file.name,
        fileType: file.name.split('.').pop(),
        fileSize: (file.size / 1024).toFixed(2) + " KB",
        originalName: file.name,
        ...formData
      };

      try {
        const savedFile = await saveFileMetadata(fileMetadata);

        setCurrentUploadedFile(file);
        setStep(3);

        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setExtractedData({
            villages: ["Rampur", "Solan", "Shimla Rural", "Mandi Town", "Kullu Valley"],
            pattaHolders: ["Rajesh Kumar", "Priya Sharma", "Amit Singh", "Neha Verma", "Vikram Thakur"],
            coordinates: [
              { lat: 31.7044, lng: 76.9636 },
              { lat: 31.1048, lng: 77.1734 },
              { lat: 31.6340, lng: 77.1892 },
              { lat: 31.7167, lng: 76.9300 },
              { lat: 31.9580, lng: 77.1099 }
            ],
            claimStatus: ["Approved", "Pending", "Approved", "Under Review", "Approved"],
            totalRecords: 5,
            fileSize: (file.size / 1024).toFixed(2) + " KB",
            uploadDate: new Date().toLocaleDateString(),
            additionalInfo: {
              landType: ["Agricultural", "Residential", "Forest", "Agricultural", "Commercial"],
              area: ["2.5 acres", "0.8 acres", "5.2 acres", "1.2 acres", "0.5 acres"]
            }
          });
        }, 2500);

      } catch (error) {
        console.error('Error saving file:', error);
      }
    }
  };
  useEffect(() => {
    getAllFiles();
  }, [getAllFiles]);

  const handleNextStep = () => {
    if (step === 1 && formData.fileType && formData.fileName) {
      setStep(2);
    } else if (step === 2 && formData.region && formData.dataSource) {
      fileInputRef.current?.click();
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      fileType: "",
      fileName: "",
      description: "",
      region: "",
      dataSource: "",
    });
    setUploadedFiles(null);
    setExtractedData(null);
  };

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
          Data <span className="text-blue-500">Hub</span>
        </h1>
        <p className="mt-2 text-lg text-neutral-300">
          Upload and extract FRA data with advanced AI processing
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <div className="relative z-20 flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((num) => (
          <React.Fragment key={num}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300",
                step >= num
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                  : "bg-gray-700 text-gray-400"
              )}
            >
              {num}
            </motion.div>
            {num < 3 && (
              <div
                className={cn(
                  "w-12 h-1 transition-all duration-300",
                  step > num ? "bg-blue-500" : "bg-gray-700"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 w-full max-w-4xl px-4"
      >
        <div
          className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
          style={{
            transform: "perspective(1000px) rotateX(2deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Step 1: File Information
                </h2>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">
                    File Type *
                  </label>
                  <select
                    name="fileType"
                    value={formData.fileType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="" className="bg-slate-800">Select file type</option>
                    <option value="csv" className="bg-slate-800">CSV</option>
                    <option value="excel" className="bg-slate-800">Excel (XLSX)</option>
                    <option value="json" className="bg-slate-800">JSON</option>
                    <option value="pdf" className="bg-slate-800">PDF</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">
                    File Name *
                  </label>
                  <input
                    type="text"
                    name="fileName"
                    value={formData.fileName}
                    onChange={handleInputChange}
                    placeholder="e.g., FRA_Claims_2024"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the data..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextStep}
                  disabled={!formData.fileType || !formData.fileName}
                  className={cn(
                    "w-full py-3 rounded-xl font-bold transition-all",
                    formData.fileType && formData.fileName
                      ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  )}
                >
                  Next Step
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Step 2: Data Details
                </h2>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">
                    Region *
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    placeholder="e.g., Himachal Pradesh, Mandi"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">
                    Data Source *
                  </label>
                  <select
                    name="dataSource"
                    value={formData.dataSource}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="" className="bg-slate-800">Select source</option>
                    <option value="government" className="bg-slate-800">Government Records</option>
                    <option value="survey" className="bg-slate-800">Field Survey</option>
                    <option value="ngo" className="bg-slate-800">NGO Data</option>
                    <option value="community" className="bg-slate-800">Community Submission</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-xl font-bold bg-gray-700 text-white hover:bg-gray-600 transition"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextStep}
                    disabled={!formData.region || !formData.dataSource}
                    className={cn(
                      "flex-1 py-3 rounded-xl font-bold transition-all",
                      formData.region && formData.dataSource
                        ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    Upload File
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Step 3: Processing & Results
                </h2>

                {currentUploadedFile && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">{currentUploadedFile.name}</p>
                          <p className="text-sm text-neutral-400">
                            {(currentUploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-white font-medium">Processing your data...</p>
                    <p className="text-sm text-neutral-400 mt-2">Extracting information from file</p>
                  </div>
                )}

                {!isProcessing && extractedData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-4">
                        <p className="text-sm text-blue-300 mb-1">Total Records</p>
                        <p className="text-2xl font-bold text-white">{extractedData.totalRecords}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4">
                        <p className="text-sm text-green-300 mb-1">File Size</p>
                        <p className="text-2xl font-bold text-white">{extractedData.fileSize}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                      <h3 className="text-lg font-bold text-white">Extracted Data</h3>

                      <div>
                        <p className="text-sm text-neutral-400 mb-2">Villages:</p>
                        <div className="flex flex-wrap gap-2">
                          {extractedData.villages.map((village, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                              {village}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-neutral-400 mb-2">Patta Holders:</p>
                        <div className="flex flex-wrap gap-2">
                          {extractedData.pattaHolders.map((holder, i) => (
                            <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                              {holder}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-neutral-400 mb-2">Claim Status:</p>
                        <div className="flex flex-wrap gap-2">
                          {extractedData.claimStatus.map((status, i) => (
                            <span
                              key={i}
                              className={cn(
                                "px-3 py-1 rounded-full text-sm",
                                status === "Approved"
                                  ? "bg-green-500/20 text-green-300"
                                  : status === "Pending"
                                    ? "bg-yellow-500/20 text-yellow-300"
                                    : "bg-orange-500/20 text-orange-300"
                              )}
                            >
                              {status}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-neutral-400 mb-2">Coordinates (Sample):</p>
                        <div className="bg-black/30 rounded-lg p-3 text-sm text-neutral-300 font-mono">
                          {extractedData.coordinates.slice(0, 3).map((coord, i) => (
                            <div key={i}>
                              {i + 1}. Lat: {coord.lat}, Lng: {coord.lng}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/30 transition"
                    >
                      Upload Another File
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        accept=".csv,.xlsx,.xls,.json,.pdf"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-20 w-full max-w-4xl px-4 mt-8"
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Uploaded Files</h2>

          {uploadedFiles.length > 0 ? (
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-blue-500/30 transition-all"
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">{file.fileName}</p>
                        <p className="text-sm text-neutral-400">
                          {file.fileType?.toUpperCase()} • {file.fileSize} • {file.region}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                        Processed
                      </span>
                      <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <p className="text-lg mb-2">No files uploaded yet</p>
              <p className="text-sm">Upload your first file to get started</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* File Details Modal - FIXED */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">File Details</h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* File Info */}
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">File Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-400">File Name</p>
                      <p className="text-white">{selectedFile.fileName}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400">File Type</p>
                      <p className="text-white capitalize">{selectedFile.fileType}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400">Size</p>
                      <p className="text-white">{selectedFile.fileSize}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400">Region</p>
                      <p className="text-white">{selectedFile.region}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-neutral-400">Description</p>
                      <p className="text-white">{selectedFile.description || "No description provided"}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400">Upload Date</p>
                      <p className="text-white">{new Date(selectedFile.uploadDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400">Data Source</p>
                      <p className="text-white capitalize">{selectedFile.dataSource}</p>
                    </div>
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

export default DataHub;