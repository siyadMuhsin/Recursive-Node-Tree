import React, { useEffect, useState } from "react";
import { fetchTree, addNode, deleteNode } from "../services/api";
import TreeNode from "../components/TreeNode";

const Home: React.FC = () => {
  const [tree, setTree] = useState<any[]>([]);
  const [rootName, setRootName] = useState("");

  const loadTree = async () => {
    const res = await fetchTree();
    console.log(res);
    
    setTree(res.nodes);
  };

  useEffect(() => {
    loadTree();
  }, []);

  console.log(tree);
  
  const handleAdd = async (parentId: string | null, name: string) => {
    console.log(parentId);
    
    await addNode({ name, parentId });
    loadTree();
  };

  const handleDelete = async (id: string) => {
    await deleteNode(id);
    loadTree();
  };

  return (
    <div>
      <h1>🌳 Recursive Node Tree</h1>

      <div>
        <input
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          placeholder="New root node name"
        />
        <button
          onClick={() => {
            if (rootName.trim()) {
              handleAdd(null, rootName);
              setRootName("");
            }
          }}
        >
          ➕ Add Root
        </button>
      </div>

      <div>
        {tree.map((node) => (
          <TreeNode
            key={node._id}
            node={node}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
