export interface Report {
  userId: number;
  zoneId: number;
  typeSignalement: "dechet" | "incident";
  description: string;
  position: {
    lat: number;
    lng: number;
  };
}
