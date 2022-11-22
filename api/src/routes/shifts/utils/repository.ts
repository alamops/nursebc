import { ShiftTransformer } from './transformer';
import databasePool from "../../../database/pool";
import { Repository } from "../../../models/repository";
import { Shift } from "../models/types";

export class ShiftsRepository extends Repository<Shift> {
  async findAll(): Promise<Shift[]> {
    const result = 
        await databasePool
          .query(`
                  SELECT 
                    qos.shift_id
                    ,(qos.shift_date + qos.start_time) as start_time
                    ,(qos.shift_date + qos.end_time) as end_time
                    ,f.*
                  FROM 
                    question_one_shifts AS qos
                  LEFT JOIN 
                    facilities AS f ON f.facility_id = qos.facility_id
                  ORDER BY
                    qos.shift_date ASC,
                    qos.start_time ASC,
                    qos.end_time ASC
                `);

    return result.rows.map(raw => ShiftTransformer.transform(raw))
  }

  async find(ids: number[] = []): Promise<Shift[]> {
    if (ids.length === 0) {
      return this.findAll()
    }

    const result = 
        await databasePool
          .query(`
                  SELECT 
                    qos.shift_id
                    ,(qos.shift_date + qos.start_time) as start_time
                    ,(qos.shift_date + qos.end_time) as end_time
                    ,f.*
                  FROM 
                    question_one_shifts AS qos
                  LEFT JOIN 
                    facilities AS f ON f.facility_id = qos.facility_id 
                  WHERE
                    shift_id = ANY($1::int[])
                  ORDER BY
                    qos.shift_date ASC,
                    qos.start_time ASC,
                    qos.end_time ASC
                `, [ids]);

    return result.rows.map(raw => ShiftTransformer.transform(raw))
  }

  async findOne(id: number): Promise<Shift> {
    const result = 
        await databasePool
          .query(`
                  SELECT 
                    qos.shift_id
                    ,(qos.shift_date + qos.start_time) as start_time
                    ,(qos.shift_date + qos.end_time) as end_time
                    ,f.*
                  FROM 
                    question_one_shifts AS qos
                  LEFT JOIN 
                    facilities AS f ON f.facility_id = qos.facility_id 
                  WHERE
                    shift_id = $1::int
                `, [id]);

    return ShiftTransformer.transform(result.rows[0])
  }
}
