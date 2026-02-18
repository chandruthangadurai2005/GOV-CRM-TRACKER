import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/api";

interface Machine {
  id: number;
  machineId: string;
  type: string;
  district: string;
  status: string;
}

const Vehicles = () => {
  const [vehicleList, setVehicleList] = useState<Machine[]>([]);
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newType, setNewType] = useState("");
  const [newDistrict, setNewDistrict] = useState("");

  /* ===== FETCH VEHICLES ===== */
  const fetchVehicles = async () => {
    try {
      const res = await api.get("/api/machines");
      setVehicleList(res.data);
    } catch (error) {
      console.error("Fetch vehicles failed:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  /* ===== ADD VEHICLE ===== */
  const handleAdd = async () => {
    if (!newId || !newType || !newDistrict) return;

    try {
      await api.post("/api/machines", {
        machineId: newId,
        type: newType,
        district: newDistrict,
      });

      await fetchVehicles();

      setOpen(false);
      setNewId("");
      setNewType("");
      setNewDistrict("");
    } catch (error: any) {
      alert(error.response?.data?.message || "Add failed");
    }
  };

  /* ===== DELETE VEHICLE ===== */
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/machines/${id}`);
      fetchVehicles();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Vehicle Fleet ({vehicleList.length})
        </h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Vehicle</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Machine ID"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
              />
              <Input
                placeholder="Type"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              />
              <Input
                placeholder="District"
                value={newDistrict}
                onChange={(e) => setNewDistrict(e.target.value)}
              />
              <Button onClick={handleAdd}>
                Add Vehicle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vehicleList.map((v) => (
            <TableRow key={v.id}>
              <TableCell>{v.machineId}</TableCell>
              <TableCell>{v.type}</TableCell>
              <TableCell>{v.district}</TableCell>
              <TableCell>{v.status}</TableCell>

              <TableCell>
                <Button
                  size="icon"
                  onClick={() => handleDelete(v.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Vehicles;
