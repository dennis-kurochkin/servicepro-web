import { LayersControl, TileLayer } from 'react-leaflet'
import { MapLayer } from '@features/tickets/components/Map/data'

export const MapLayersControls = () => {
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer
        name={'Схема'}
        checked
      >
        <TileLayer
          url={MapLayer.OpenMaps}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        name={'Спутник'}
      >
        <TileLayer
          url={MapLayer.Satellite}
          maxZoom={19}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        name={'Гибрид'}
      >
        <TileLayer
          url={MapLayer.Hybrid}
          maxZoom={19}
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  )
}
