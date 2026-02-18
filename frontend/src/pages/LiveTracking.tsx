import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import api from "@/lib/api";

interface LiveVehicle {
  machineId: string;
  latitude: number;
  longitude: number;
  engineStatus: boolean;
  speed?: number;
}

/* ✅ Vehicle Icon */
const vehicleIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/743/743922.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

/* ✅ Auto-follow Camera */
const AutoFollow = ({
  position,
}: {
  position: [number, number];
}) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 15);
  }, [position]);

  return null;
};

const LiveTracking = () => {
  const [vehicles, setVehicles] = useState<
    Record<string, LiveVehicle>
  >({});
  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  /* ✅ Fetch Latest GPS */
  const fetchVehicles = async () => {
  try {
    const res = await api.get("/api/gps/live");

    const updates: Record<string, LiveVehicle> = {};

    res.data.forEach((v: LiveVehicle) => {
      updates[v.machineId] = v;
    });

    setVehicles(updates);

  } catch (error) {
    console.error("Live fetch failed");
  }
};

  useEffect(() => {
    fetchVehicles();

    const interval = setInterval(fetchVehicles, 3000);

    return () => clearInterval(interval);
  }, []);

  const vehicleList = Object.values(vehicles);
  const selectedVehicle =
    selectedId && vehicles[selectedId];

  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)]">
      <div className="flex-1">
        <MapContainer
          center={[11.0095, 76.968]}
          zoom={14}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedVehicle && (
            <AutoFollow
              position={[
                selectedVehicle.latitude,
                selectedVehicle.longitude,
              ]}
            />
          )}

          {vehicleList.map((v) => (
            <Marker
              key={v.machineId}
              position={[v.latitude, v.longitude]}
              icon={vehicleIcon}
              eventHandlers={{
                click: () =>
                  setSelectedId(v.machineId),
              }}
            >
              <Popup>
                <strong>{v.machineId}</strong>
                <br />
                Engine: {v.engineStatus ? "ON" : "OFF"}
                <br />
                Speed: {v.speed || 0} km/h
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* ✅ Vehicle Panel */}
      <div className="w-80 space-y-2">
        {vehicleList.map((v) => (
          <div
            key={v.machineId}
            onClick={() =>
              setSelectedId(v.machineId)
            }
            className="p-3 border rounded cursor-pointer hover:bg-muted"
          >
            <strong>{v.machineId}</strong>
            <p>
              Engine: {v.engineStatus ? "ON" : "OFF"}
            </p>
            <p>Speed: {v.speed || 0} km/h</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTracking;
