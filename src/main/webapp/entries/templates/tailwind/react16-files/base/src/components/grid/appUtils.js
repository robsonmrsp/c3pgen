import { MarkerType } from "reactflow";

export const createNodeEntities = (app) => {
    const nodes = app?.entities?.map(((entity) => {
        return {
            id: '' + entity.id,
            type: 'custom',
            position: { x: entity.posX, y: entity.posY },
            data: { entity },
        }
    }
    ));
    return nodes;
}

export const createRelations = (app) => {
    const edges = [];
    app?.entities?.map(((entity) => {
        const nodes = entity?.relationships?.map(((rel) => {
            if (rel.origin)
                edges.push({
                    id: 'e' + rel.id,
                    source: entity.viewId,
                    target: rel.modelViewId,
                    label: rel.displayName,
                    type: 'floating',
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 16,
                        height: 16,
                    },
                    markerStart: 'markerCircle',
                    style: {
                        strokeWidth: 2,
                        // stroke: "#FF0072"
                    },
                    data: {
                        entity,
                        relationship: rel
                    }
                })
        }
        ));
    }
    ));
    return edges;
}


// width: 2,
// height: 2,
// color: "#FF0072"
// },
// label: "marker size and color",
// style: {
// strokeWidth: 2,
// stroke: "#FF0072"