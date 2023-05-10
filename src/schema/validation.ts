import * as z from 'zod';

export const assessmentDataSchema = z.record(
  z.record(
    z
      .number({
        invalid_type_error: 'Nilai harus berupa angka',
        required_error: 'Nilai harus diisi',
      })
      .min(1, { message: 'Batas nilai minimal adalah 1' })
      .max(10, { message: 'Batas nilai maksimal adalah 10' })
  )
);
