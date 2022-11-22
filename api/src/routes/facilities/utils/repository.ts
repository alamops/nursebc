import databasePool from '../../../database/pool';
import { FacilityAvailability } from './../models/types';
import { FacilityTransfomer } from './transformer';

export class FacilitiesRepository {
  async getAvailableSpots(): Promise<FacilityAvailability[]> {
    const result = await databasePool.query(`
      WITH total_hired_jobs AS (
        SELECT 
          nhj.job_id
          ,COUNT(nhj.job_id) AS total_hired
        FROM 
          nurse_hired_jobs nhj 
        GROUP BY
          nhj.job_id 
      )
      
      SELECT 
        f.facility_id
        ,f.facility_name
        ,j.nurse_type_needed 
        ,j.total_number_nurses_needed 
        ,thj.total_hired
        ,CASE 
          WHEN (j.total_number_nurses_needed - thj.total_hired) >= 0 THEN (j.total_number_nurses_needed - thj.total_hired)
          ELSE 0
        END AS remaining_spots
      FROM
        facilities f 
      LEFT JOIN
        jobs j ON j.facility_id = f.facility_id 
      LEFT JOIN 
        total_hired_jobs as thj ON thj.job_id = j.job_id  
      ORDER BY
        f.facility_id ASC,
        j.nurse_type_needed ASC
    `)
    
    return result.rows.map(raw => FacilityTransfomer.transformAvailability(raw))
  }
}
