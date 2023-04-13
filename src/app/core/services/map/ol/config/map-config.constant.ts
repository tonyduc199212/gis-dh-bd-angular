import { environment } from "src/environments/environment";
export const MapConfig = { 
    geoserver: {
        version: '2.16.0',
        dataMiningStore: 'VungTau_141_95', 
        licenseKey: "b85fe20c-99e1-434c-aa16-7630d874ce14"
    },
    basemapConfig: {
        ggStreet: 'https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        ggSatellite: 'https://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}',
        vnptStreet: 'https://maps.vnpt.vn/tiles/mapvnpt/v1/{z}/{x}/{y}.png'
    },
    defaultMapSettings: {
        centerLat: 1168264.2552037046,
        centerLon: 457910.64116643474, 
        zoomLevel: 10,
        maxZoom: 19,
        minZoom: 1,
        projection4326: 'EPSG:4326',
        centerLat4326: 10.5516767,
        centerLon4326: 107.281494,
        projection: 'EPSG:1000' + environment.SRID.CITY_CODE,
        projectionCode: '1000' + environment.SRID.CITY_CODE,
        mapId: 'map'
    },
    queryOptions: {
        distanceByZoom: {
            from13: 165,
            from14: 100,
            from15: 67,
            from16: 35,
            from17: 17,
            from18: 8,
            from19: 4,
            from19toMax: 3
        },
        spatialQuery: {
            Administrative: 'Ward',
            Waterway: 'Waterway'
        }
    },
    locate: {
        layerName: 'LocationMarker',
        iconScale: 1,
        iconUrl: 'assets/icon-layer/pins/pins-6.png'
    },
    highlightFeature: {
        stroke: "#39e0fa",
        fill: "transparent",
        iconUrl: "assets/icon-layer/pins/pins-3.png",
        lineWidth: 2,
        lineCap: "square",
        lineDash: null
    },
    searchResultsFeature: {
        stroke: "#7FFFD4",
        fill: "#7FFFD47a"
    },
    prohibitedZoneFeature: {
        stroke: "#b95151",
        fill: "#e624246b"
    },
    editorMaskFeature: {
        stroke: "#2684FF",
        fill: "transparent"
    },
    route: {
        stroke: "#06AF8F",
        width: 5,
        lineCap: "round"
    },
    lineString: {
        stroke: "#7FFFD4",
        lineWidth: 2,
        lineCap: "round",
        lineDash:  null
    }
}