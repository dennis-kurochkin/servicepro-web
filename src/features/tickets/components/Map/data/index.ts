export enum MapLayer {
  OpenMaps = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Hybrid = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
  Satellite = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
}
