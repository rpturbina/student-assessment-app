import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/Button';
import CodeBlock from '@/components/CodeBlock';
import Input from '@/components/Input';
import Layout from '@/components/Layout';

import { assessmentAspect, generatedStudent } from '@/lib/data';
import { isObjEmpty } from '@/lib/utils';
import { assessmentDataSchema } from '@/schema/validation';

type AssessmentAspect = (typeof assessmentAspect)[number]['name'];

type Student = (typeof generatedStudent)[number]['name'];

type AssessmentData = Record<AssessmentAspect, Record<Student, number>>;

const AssessmentPage = () => {
  const [output, setOutput] = React.useState('');

  const methods = useForm<AssessmentData>({
    resolver: zodResolver(assessmentDataSchema),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<AssessmentData> = (data) => {
    setOutput(() => JSON.stringify(data, null, 2));
    console.log(data);
  };

  const validation = React.useMemo(
    () => ({
      valueAsNumber: true,
      min: 1,
      max: 10,
      required: true,
    }),
    []
  );

  const handleReset = () => {
    setOutput('');
    methods.reset();
  };

  return (
    <Layout>
      <h1 className="py-5 text-center text-2xl font-bold">
        Aplikasi Penilaian Mahasiswa
      </h1>
      <div className="mx-auto max-w-4xl">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="overflow-x-auto overflow-y-hidden py-4">
              <table className="w-full max-w-full">
                <thead className="border-b-2">
                  <tr>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs">
                      {'Nama Mahasiswa'.toUpperCase()}
                    </th>
                    {assessmentAspect.map((aspect) => (
                      <th
                        key={aspect.label}
                        className="whitespace-nowrap px-6 py-3 text-xs"
                      >
                        {aspect.label.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {generatedStudent.map((student) => (
                    <React.Fragment key={student.id}>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                          {student.label}
                        </td>
                        {assessmentAspect.map((aspect) => {
                          const inputId = `${aspect.name}.${student.name}`;
                          return (
                            <td key={inputId} className="px-6 py-4">
                              <label htmlFor={inputId} hidden>
                                {aspect.label + ' ' + student.label}
                              </label>
                              <Input
                                id={inputId}
                                data-testid={inputId}
                                type="number"
                                min={1}
                                max={10}
                                placeholder="1 - 10"
                                validation={validation}
                                className="mx-auto w-fit text-center"
                              />
                              <p
                                data-testid={`${inputId}-error`}
                                className="mt-2 text-xs text-destructive"
                              >
                                {!isObjEmpty(methods.formState.errors) &&
                                  methods.formState.errors?.[aspect.name]?.[
                                    student.name
                                  ]?.message}
                              </p>
                            </td>
                          );
                        })}
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex w-full flex-row-reverse text-right">
              <Button type="submit" className="ml-4">
                Simpan
              </Button>
              <Button type="button" variant={'ghost'} onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
          <h2 className="mt-4 text-lg font-semibold">JSON Output</h2>
          <CodeBlock data-testid="json-output">{output}</CodeBlock>
        </FormProvider>
      </div>
    </Layout>
  );
};

export default AssessmentPage;
