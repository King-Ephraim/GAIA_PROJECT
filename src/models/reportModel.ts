import { Pool } from "pg";
const pool = new Pool(); 

export const createReport = async (data: {
  userId: number;
  zoneId: number;
  typeSignalement: string;
  description: string;
  urlPhoto: string;
  position: { lat: number; lng: number };
}) => {
  const { userId, zoneId, typeSignalement, description, urlPhoto, position } = data;
  const result = await pool.query(
    `INSERT INTO reports (user_id, zone_id, type_signalement, description, url_photo)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, zoneId, typeSignalement, description, urlPhoto]
  );
  return result.rows[0];
};

export const getAllReports = async () => {
  const result = await pool.query("SELECT * FROM reports ORDER BY date_creation DESC");
  return result.rows;
};
