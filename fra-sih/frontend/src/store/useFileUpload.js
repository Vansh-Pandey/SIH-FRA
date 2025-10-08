import { create } from "zustand";
import { toast } from "react-toastify";

export const useFileStore = create((set, get) => ({
  uploadedFiles: [],
  isSavingFile: false,
  isFetchingFiles: false,

  // ✅ Save file metadata
  saveFileMetadata: async (fileData) => {
    set({ isSavingFile: true });
    try {
      // Get existing files from localStorage (you can replace with your backend)
      const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      
      const newFile = {
        id: Date.now().toString(),
        ...fileData,
        uploadDate: new Date().toISOString()
      };
      
      const updatedFiles = [newFile, ...existingFiles];
      
      // Save to localStorage (replace this with your actual file storage)
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      
      set({ uploadedFiles: updatedFiles });
      toast.success("File uploaded successfully", { autoClose: 1000 });
      
      return newFile;
    } catch (error) {
      console.error('Error saving file metadata:', error);
      toast.error("Failed to save file", { autoClose: 1000 });
      throw error;
    } finally {
      set({ isSavingFile: false });
    }
  },

  // ✅ Get all uploaded files
  getAllFiles: async () => {
    set({ isFetchingFiles: true });
    try {
      // Get from localStorage (replace with your backend)
      const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      set({ uploadedFiles: files });
      return files;
    } catch (error) {
      console.error('Error reading files:', error);
      toast.error("Failed to load files", { autoClose: 1000 });
      return [];
    } finally {
      set({ isFetchingFiles: false });
    }
  },

  // ✅ Get file by ID
  getFileById: (id) => {
    const { uploadedFiles } = get();
    return uploadedFiles.find(file => file.id === id);
  },

  // ✅ Delete file
  deleteFile: async (id) => {
    try {
      const { uploadedFiles } = get();
      const updatedFiles = uploadedFiles.filter(file => file.id !== id);
      
      // Update localStorage (replace with your backend)
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      
      set({ uploadedFiles: updatedFiles });
      toast.success("File deleted successfully", { autoClose: 1000 });
      
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error("Failed to delete file", { autoClose: 1000 });
      return false;
    }
  },

  // ✅ Update file metadata
  updateFileMetadata: async (id, updates) => {
    try {
      const { uploadedFiles } = get();
      const updatedFiles = uploadedFiles.map(file => 
        file.id === id ? { ...file, ...updates } : file
      );
      
      // Update localStorage (replace with your backend)
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      
      set({ uploadedFiles: updatedFiles });
      toast.success("File updated successfully", { autoClose: 1000 });
      
      return true;
    } catch (error) {
      console.error('Error updating file:', error);
      toast.error("Failed to update file", { autoClose: 1000 });
      return false;
    }
  }
}));