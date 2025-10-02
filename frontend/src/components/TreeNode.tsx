import React,{useState} from "react";
import type { NodeProps } from "../interfaces/NodeProps";

const TreeNode:React.FC<NodeProps>=({node,onAdd,onDelete})=>{
    const [expanded,setExpanded]=useState(false);
     const [newNodeName, setNewNodeName] = useState("");

    return (
    <div style={{ marginLeft: "20px" }}>
      <span onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
        {expanded ? "📂" : "📁"} {node.name}
      </span>

      <button onClick={() => onDelete(node._id)} style={{ marginLeft: "10px" }}>
        ❌
      </button>

      <div>
        <input
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          placeholder="New child name"
        />
        <button
          onClick={() => {
            if (newNodeName.trim()) {
              onAdd(node._id, newNodeName);
              setNewNodeName("");
            }
          }}
        >
          ➕ Add Child
        </button>
      </div>

      {expanded &&
        node.children?.map((child) => (
          <TreeNode
            key={child._id}
            node={child}
            onAdd={onAdd}
            onDelete={onDelete}
          />
        ))}
    </div>
  );

}

export default TreeNode