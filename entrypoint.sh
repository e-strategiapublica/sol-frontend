#!/bin/bash
set -e

# Parse MAP_INITIAL_COORDS and generate environment.prod.ts
IFS=',' read -ra PARTS <<< "$MAP_INITIAL_COORDS"
for part in "${PARTS[@]}"; do
  eval "$part"
done

# Fallback para valores padrão se não definidos ou inválidos
lat_re='^-?[0-9]+([.][0-9]+)?$'
lng_re='^-?[0-9]+([.][0-9]+)?$'
zoom_re='^[0-9]+$'

if [[ -z "$lat" || ! $lat =~ $lat_re ]]; then
  echo "[entrypoint.sh] lat inválido ou não definido, usando padrão -23.5505"
  lat=-23.5505
fi
if [[ -z "$lng" || ! $lng =~ $lng_re ]]; then
  echo "[entrypoint.sh] lng inválido ou não definido, usando padrão -46.6333"
  lng=-46.6333
fi
if [[ -z "$zoom" || ! $zoom =~ $zoom_re ]]; then
  echo "[entrypoint.sh] zoom inválido ou não definido, usando padrão 12"
  zoom=12
fi

echo "[entrypoint.sh] Configuração aplicada: lat=$lat, lng=$lng, zoom=$zoom"

cat <<EOF > ./src/environments/environment.prod.ts
export const environment = {
  production: true,
  mapInitialCoords: {
    lat: $lat,
    lng: $lng,
    zoom: $zoom
  }
};
EOF

exec "$@"
