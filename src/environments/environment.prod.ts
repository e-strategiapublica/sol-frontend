export const environment = {
  production: true,
  // Os campos abaixo podem ser sobrescritos dinamicamente pelo entrypoint.sh
  mapInitialCoords: {
    lat: -23.5505,
    lng: -46.6333,
    zoom: 12
  },
  encrypt_key: "5708c8d4-0b2a-4cbd-bea4-99981079020a",
  api: {
    server: "http://207.246.127.17",
    port: "",
    path: "api"
  },
};