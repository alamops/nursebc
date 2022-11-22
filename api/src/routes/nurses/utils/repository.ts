import databasePool from '../../../database/pool';
import { Nurse, NurseHiringAvailability } from '../models/types';
import { NurseTransfomer } from './transformer';

export class NursesRepository {
  async getHiringAvailability(): Promise<NurseHiringAvailability[]> {
    const result = await databasePool.query(`
      WITH total_hired_jobs AS (
        SELECT 
          nhj.job_id
          , COUNT(nhj.job_id) AS total_hired
        FROM 
          nurse_hired_jobs nhj 
        GROUP BY
          nhj.job_id 
      ), jobs_availability as (
        SELECT 
          j.job_id
          ,j.nurse_type_needed  
          ,CASE 
            WHEN (j.total_number_nurses_needed - thj.total_hired) >= 0 THEN (j.total_number_nurses_needed - thj.total_hired)
            ELSE 0
          END AS remaining_spots
        FROM
          jobs j 
        LEFT JOIN 
          total_hired_jobs as thj ON thj.job_id = j.job_id 
      )
    
      SELECT
        n.nurse_id
        ,n.nurse_name 
        ,n.nurse_type 
        ,(
          SELECT 
            COUNT(ja.job_id) 
          FROM 
            jobs_availability ja
          WHERE
            ja.remaining_spots > 0
            AND ja.nurse_type_needed = n.nurse_type 
            AND (
              SELECT 
                COUNT(nhj.job_id)
              FROM 
                nurse_hired_jobs nhj 
              WHERE 
                nhj.job_id = ja.job_id
                AND nhj.nurse_id = n.nurse_id 
            ) = 0
        ) AS hiring_availability
      FROM 
        nurses n 
      ORDER BY
        n.nurse_id ASC
    `)
    
    return result.rows.map(raw => NurseTransfomer.transformHiringAvailability(raw))
  }

  async getCoworkers(nurseId: number): Promise<Nurse[]> {
    const result = await databasePool.query(`
      WITH facility_nurses AS (
        SELECT DISTINCT 
          f.facility_id
          ,n.*
        FROM 
          facilities f 
        LEFT JOIN
          jobs j ON j.facility_id = f.facility_id 
        LEFT JOIN 
          nurse_hired_jobs nhj ON nhj.job_id = j.job_id 
        LEFT JOIN
          nurses n ON n.nurse_id = nhj.nurse_id 
      )
      
      SELECT 
        n.*
      FROM 
        nurses n 
      RIGHT JOIN 
        facility_nurses fn ON 
          fn.nurse_id = n.nurse_id 
          AND fn.facility_id IN (
            SELECT 
              tfn.facility_id 
            FROM 
              facility_nurses tfn
            WHERE 
              tfn.nurse_id = $1
          )
      WHERE 
        n.nurse_id != $1
      ORDER BY
        n.nurse_id ASC
    `, [nurseId])

    return result.rows.map(raw => NurseTransfomer.transform(raw))
  }
}
