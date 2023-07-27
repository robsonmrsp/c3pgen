import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';

const options = [
  {
    value: 'smoothstep',
    label: 'Smoothstep',
  },
  {
    value: 'step',
    label: 'Step',
  },
  {
    value: 'default',
    label: 'Bezier (default)',
  },
  {
    value: 'straight',
    label: 'Straight',
  },
];

function Select({ value, handleId, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };
  const isConnectable = () => { }
  return (
    <div className="custom-node__select">
      <Handle type="source" position={Position.Right} id={handleId} />
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

      <Handle type="source" position={Position.Left} id="a" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

function CustomNode(props) {
  const { id, data, selected } = props;

  const { entity } = data;

  return (
    <>
      <div className={"flex items-center justify-center  " + (selected && "border-double border-4 border-amber-400")}>
        <div className="rounded-sm bg-amber-400 p-1 shadow-lg ">
          <h1 className="mb-1 text-center text-2xl font-bold">{entity.name}</h1>
          <div className="mb-1 rounded-sm bg-amber-300 p-1">
            {entity.attributes?.map((att) => (
              <div className="mb-1 flex items-center" key={att.id}>
                <span className="font-mono">+ {att.name}: {att.type.className}</span>
              </div>
            ))}
          </div>
          <div className="mb-1 rounded-sm bg-amber-200 p-1">
            {entity.relationships?.map((rel) => (
              <div className="mb-1 flex items-center" key={rel.id}>
                {rel.type === 'ManyToOne' && (<span className="font-mono"># {rel.name}: {rel.model}</span>)}
                {rel.type === 'OneToMany' && (<span className="font-mono"># {rel.name}: List {'<'}{rel.model}{'>'}</span>)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="custom-node__body" style={{ display: 'none' }}>
        <Select />
      </div >
    </>
  );
}

export default memo(CustomNode);