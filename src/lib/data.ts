const createArrayOfGeneratedStudent = (length: number) =>
  Array.from({ length }, (_, i) => i + 1).map((i) => ({
    id: i,
    label: `Mahasiswa ${i}`,
    name: `mahasiswa_${i}`,
  }));

export const assessmentAspect = [
  { name: 'aspek_penilaian_1', label: 'Aspek Penilaian 1' },
  { name: 'aspek_penilaian_2', label: 'Aspek Penilaian 2' },
  { name: 'aspek_penilaian_3', label: 'Aspek Penilaian 3' },
  { name: 'aspek_penilaian_4', label: 'Aspek Penilaian 4' },
] as const;

export const generatedStudent = [...createArrayOfGeneratedStudent(10)] as const;
