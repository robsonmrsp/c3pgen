'use client'
import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  useOnSelectionChange,
} from 'reactflow';
import { useQuery } from "@tanstack/react-query";

import { nodes as initialNodes, edges as initialEdges } from '@/data/initial-elements';
import UIEntity from '@/components/grid/UIEntity';

// Esse app será guardado em um context e salvo no back-end a cada alteração???

import app from '@/data/app';
import 'reactflow/dist/style.css';
import { createNodeEntities, createRelations } from './appUtils';
import FloatingEdge from './FloatingEdge';

const nodeTypes = {
  custom: UIEntity,
};

const edgeTypes = {
  floating: FloatingEdge,
};
const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);


const getApplication = async (id) => {
  const headers = { 'Authorization': 'Basic anNldHVwOjEyMzQ1Ng==' };
  const res = await fetch("http://localhost:8081/rs/crud/movies/" + id, { headers });
  const application = (await res.json());
  return application;
}

const OverviewFlow = ({ idApplication }) => {

  const { data: application, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-application-id"],
    queryFn: () => getApplication(idApplication),
  });


  const [nodes, setNodes, onNodesChange] = useNodesState(createNodeEntities(application));
  const [edges, setEdges, onEdgesChange] = useEdgesState(createRelations(application));

  //const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
      ),
    [setEdges]
  );

  useEffect(() => {
    setNodes(createNodeEntities(application));
    setEdges(createRelations(application));
  }, [application]);

  return (
    <>
      <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          {/* com ajuda so site :      https://jenkov.com/tutorials/svg/marker-element.html */}
          <marker id="markerCircle" markerWidth="8" markerHeight="8" refX="5" refY="5">
            <circle cx="5" cy="5" r="3" style={{ stroke: "none", fill: "#aabbbb" }} />
          </marker>

          <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="6"
            orient="auto">
            <path d="M2,2 L2,11 L10,6 L2,2" style={{ fill: "#000000" }} />
          </marker>
        </defs>
      </svg>

      <div class="flex flex-col h-screen justify-between">
        <header class="h-10 bg-red-500">Header</header>
        <main class="mb-auto h-full  bg-green-500">
          <div class="flex h-full">
            <div class="flex-1 w-96 h-full">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
              >
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
                <Background color="#B8CEFF" gap={16} />
              </ReactFlow>
            </div>
            <div class="flex-1  h-full max-w-xs  bg-yellow-200" >

            </div>
          </div>

        </main>
        <footer class="h-96 bg-blue-500">Footer</footer>
      </div>

    </>
  );
};

export default OverviewFlow;


// para estudar a seleção do campo
// https://codesandbox.io/s/async-shadow-s6lj3n?file=/src/initial-elements.js