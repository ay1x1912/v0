"use client"

import { ReactFlow, Background, Controls,   type Node,
  type Edge, addEdge, type Connection, useNodesState, useEdgesState, type OnConnect } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialNodes: Node[] = [
  
];
const initialEdges:Edge[]=[]




export default function App() {
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

const handleAddNode=()=>{
  setNodes([...nodes,{
    id: uuidv4() ,
    position: { x: 0, y: 0 },
    data: { label: `Node ${uuidv4()}` },

  }])

}

 const onConnect: OnConnect = useCallback(
    (connection) =>{
      console.log(connection);
      setEdges((eds) => addEdge(connection, eds))},
    [setEdges],
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <button className='border text-blue-300 bg-black' onClick={handleAddNode}>add Node</button>

      <ReactFlow 
      edges={edges} 
      nodes={nodes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}>
        <Background />
        <Controls  />
      </ReactFlow>

    </div>
  );
}
