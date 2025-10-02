import React, { useState } from "react";
import type { NodeProps } from "../interfaces/NodeProps";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import Spinner from "./Spinner";
import ConfirmModal from "./ConfirmModal";

const TreeNode: React.FC<NodeProps> = ({ node, onAdd, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleAddClick = async () => {
    if (!newNodeName.trim()) return;
    setLoadingAdd(true);
    try {
      await onAdd(node._id, newNodeName);
      setNewNodeName("");
      setShowAddInput(false);
      setExpanded(true); 
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleDeleteClick = async () => {
    setLoadingDelete(true);
    try {
      await onDelete(node._id);
      setShowDeleteModal(false); 
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <div className="ml-6 relative">
        <div className="absolute -left-4 top-6 w-0.5 h-[calc(100%-24px)] bg-gradient-to-b from-blue-200 to-purple-200"></div>
        
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm px-4 py-3 hover:shadow-md transition-all duration-300 hover:border-blue-200 group">
          <div className="flex items-center gap-3 flex-1">
            <div
              className="flex items-center gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              onClick={() => setExpanded(!expanded)}
            >
              {node.children && node.children.length > 0 ? (
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors border border-gray-100">
                  {expanded ? (
                    <ChevronDown size={16} className="text-blue-600" />
                  ) : (
                    <ChevronRight size={16} className="text-purple-600" />
                  )}
                </div>
              ) : (
                <div className="w-8 h-6 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
              )}
              <span className="font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {node.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAddInput(!showAddInput);
                if (!expanded) setExpanded(true);
              }}
              className="p-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 hover:from-green-100 hover:to-emerald-100 hover:text-green-700 hover:shadow-lg transform hover:scale-110 transition-all duration-200 border border-green-100"
              title="Add Child Node"
            >
              <Plus size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              className="p-2 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 text-red-500 hover:from-red-100 hover:to-pink-100 hover:text-red-700 hover:shadow-lg transform hover:scale-110 transition-all duration-200 border border-red-100"
              disabled={loadingDelete}
              title="Delete Node"
            >
              {loadingDelete ? (
                <Spinner size={16} color="border-red-500" />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          </div>
        </div>
        {showAddInput && (
          <div className="ml-6 mt-3 flex items-center gap-3 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 shadow-sm animate-fadeIn">
            <div className="flex-1">
              <input
                value={newNodeName}
                onChange={(e) => setNewNodeName(e.target.value)}
                placeholder="Enter child node name..."
                className="w-full px-4 py-2.5 border-0 rounded-lg bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 text-sm font-medium"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddClick();
                  }
                  if (e.key === 'Escape') {
                    setShowAddInput(false);
                    setNewNodeName("");
                  }
                }}
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowAddInput(false);
                  setNewNodeName("");
                }}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClick}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loadingAdd || !newNodeName.trim()}
              >
                {loadingAdd ? (
                  <Spinner size={14} color="border-white" />
                ) : (
                  <>
                    <Plus size={16} />
                    Add
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        {expanded && node.children && node.children.length > 0 && (
          <div className="ml-6 mt-3 space-y-3 animate-fadeIn">
            {node.children.map((child) => (
              <TreeNode 
                key={child._id} 
                node={child} 
                onAdd={onAdd} 
                onDelete={onDelete} 
              />
            ))}
          </div>
        )}
      </div>
     <ConfirmModal
  isOpen={showDeleteModal}
  title="Delete Node"
  message={`Are you sure you want to delete "${node.name}"?`}
  confirmText={loadingDelete ? "Deleting..." : "Delete"}
  cancelText="Cancel"
  onConfirm={handleDeleteClick}
  onCancel={() => setShowDeleteModal(false)}
/>
    </>
  );
};

export default TreeNode;