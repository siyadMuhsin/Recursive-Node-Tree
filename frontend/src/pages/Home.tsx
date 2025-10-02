import React, { Suspense, useEffect, useState } from "react";
import { fetchTree, addNode, deleteNode } from "../services/api";

const TreeNode = React.lazy(() => import("../components/TreeNode"));
import { toast } from "react-toastify";
import type { TreeNodeType } from "../interfaces/TreeNodeType";
import Spinner from "../components/Spinner";
import { Plus } from "lucide-react";

const Home: React.FC = () => {
  const [tree, setTree] = useState<TreeNodeType[]>([]);
  const [rootName, setRootName] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTree = async () => {
    setLoading(true);
    try {
      const res = await fetchTree();
      setTree(res.nodes);
      toast.success("Tree loaded successfully!");
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error);
      console.error(errMessage);
      toast.error(errMessage || "Failed to load tree");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTree();
  }, []);

  const handleAdd = async (parentId: string | null, name: string) => {
    try {
      const { newNode } = await addNode({ name, parentId });
      toast.success("Node added successfully!");

      if (!parentId) {
        setTree((prev) => [...prev, newNode]);
      } else {
        const addChild = (nodes: TreeNodeType[]): TreeNodeType[] =>
          nodes.map((node) =>
            node._id.toString() === parentId.toString()
              ? { ...node, children: [...(node.children || []), newNode] }
              : {
                  ...node,
                  children: node.children
                    ? addChild(node.children)
                    : node.children,
                }
          );

        setTree((prev) => addChild(prev));
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error);
      console.error(errMessage);
      toast.error(errMessage || "Failed to add node");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNode(id);
      toast.success("Node deleted successfully!");

      const removeNode = (nodes: TreeNodeType[]): TreeNodeType[] =>
        nodes
          .filter((node) => node._id !== id)
          .map((node) => ({
            ...node,
            children: node.children ? removeNode(node.children) : [],
          }));

      setTree((prev) => removeNode(prev));
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error);
      console.error(errMessage);
      toast.error(errMessage || "Failed to delete node");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-2xl text-white">🌳</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Recursive Node Tree
          </h1>
          <p className="text-gray-600 text-lg">
            Create and manage your hierarchical data structure
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <input
                value={rootName}
                onChange={(e) => setRootName(e.target.value)}
                placeholder="Enter root node name..."
                className="w-full px-4 py-3 border-0 rounded-xl bg-gray-50/80 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  rootName.trim() &&
                  handleAdd(null, rootName)
                }
              />
            </div>
            <button
              onClick={() => {
                if (rootName.trim()) {
                  handleAdd(null, rootName);
                  setRootName("");
                } else {
                  toast.warn("Please enter a valid node name");
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 min-w-[140px] justify-center"
            >
              <Plus size={20} />
              Add Root Node
            </button>
          </div>
        </div>

        {/* Tree Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="relative">
                <Spinner size={64} color="border-blue-500" />
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
              </div>
            </div>
          ) : tree.length > 0 ? (
            <div className="space-y-3">
              {tree.map((node) => (
                <Suspense
                  fallback={<Spinner size={24} color="border-blue-500" />}
                >
                  <TreeNode
                    key={node._id}
                    node={node}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                  />
                </Suspense>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-3xl text-gray-400">🌳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No nodes found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Start by adding a root node to build your hierarchical tree
                structure.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
