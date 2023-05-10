/**
 * testing scenario for AssessmentPage Component
 *
 * - AssessmentPage component
 *  - should render correctly
 *  - should show error message when user click save button and the user input to assessment input is not number
 *  - should show error message when user give assessment value less than 1
 *  - should show error message when user give assessment value more than 10
 *  - should show json output when user click save button and the user input to assessment input is valid
 *  - should reset the form (clean the input and error message) when user click reset button
 */
import { assert, describe, it } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { assessmentAspect, generatedStudent } from '@/lib/data';
import AssessmentPage from '@/pages/AssessmentPage';

describe('AssessmentPage', () => {
  it('should render correctly', () => {
    const assessmentPage = render(<AssessmentPage />);

    screen.getByRole('heading', {
      name: /aplikasi penilaian mahasiswa/i,
    });

    screen.getByRole('columnheader', {
      name: /nama mahasiswa/i,
    });

    screen.getByRole('heading', {
      name: /json output/i,
    });

    assessmentPage.unmount();
  });

  it('should show error message when user click save button and the user input to assessment input is not number', async () => {
    const user = userEvent.setup();
    const assessmentPage = render(<AssessmentPage />);

    const assessmentInput = screen.getByTestId('aspek_penilaian_1.mahasiswa_1');

    await user.type(assessmentInput, '-');
    await user.tab();

    const errorMessage = screen.getByTestId(
      'aspek_penilaian_1.mahasiswa_1-error'
    );
    assert.strictEqual(errorMessage.textContent, 'Nilai harus berupa angka');
    assessmentPage.unmount();
  });

  it('should show error message when user give assessment value less than 1', async () => {
    const user = userEvent.setup();
    const assessmentPage = render(<AssessmentPage />);

    const assessmentInput = screen.getByTestId('aspek_penilaian_1.mahasiswa_1');

    await user.type(assessmentInput, '0');
    await user.tab();

    const errorMessage = screen.getByTestId(
      'aspek_penilaian_1.mahasiswa_1-error'
    );
    assert.strictEqual(
      errorMessage.textContent,
      'Batas nilai minimal adalah 1'
    );
    assessmentPage.unmount();
  });

  it('should show error message when user give assessment value more than 10', async () => {
    const user = userEvent.setup();
    const assessmentPage = render(<AssessmentPage />);

    const assessmentInput = screen.getByTestId('aspek_penilaian_1.mahasiswa_1');

    await user.type(assessmentInput, '11');
    await user.tab();

    const errorMessage = screen.getByTestId(
      'aspek_penilaian_1.mahasiswa_1-error'
    );
    assert.strictEqual(
      errorMessage.textContent,
      'Batas nilai maksimal adalah 10'
    );
    assessmentPage.unmount();
  });

  it('should show json output when user click save button and the user input to assessment input is valid', async () => {
    const user = userEvent.setup();
    const assessmentPage = render(<AssessmentPage />);
    const jsonOutputCodeblock = screen.getByTestId('json-output');
    const saveButton = screen.getByRole('button', {
      name: /simpan/i,
    });

    for (let i = 1; i <= assessmentAspect.length; i++) {
      for (let j = 1; j <= generatedStudent.length; j++) {
        const assessmentInput = screen.getByTestId(
          `aspek_penilaian_${i}.mahasiswa_${j}`
        );
        await user.type(assessmentInput, '7');
        await user.tab();
      }
    }

    await user.click(saveButton);

    const expectedResult = JSON.stringify(
      {
        aspek_penilaian_1: {
          mahasiswa_1: 7,
          mahasiswa_2: 7,
          mahasiswa_3: 7,
          mahasiswa_4: 7,
          mahasiswa_5: 7,
          mahasiswa_6: 7,
          mahasiswa_7: 7,
          mahasiswa_8: 7,
          mahasiswa_9: 7,
          mahasiswa_10: 7,
        },
        aspek_penilaian_2: {
          mahasiswa_1: 7,
          mahasiswa_2: 7,
          mahasiswa_3: 7,
          mahasiswa_4: 7,
          mahasiswa_5: 7,
          mahasiswa_6: 7,
          mahasiswa_7: 7,
          mahasiswa_8: 7,
          mahasiswa_9: 7,
          mahasiswa_10: 7,
        },
        aspek_penilaian_3: {
          mahasiswa_1: 7,
          mahasiswa_2: 7,
          mahasiswa_3: 7,
          mahasiswa_4: 7,
          mahasiswa_5: 7,
          mahasiswa_6: 7,
          mahasiswa_7: 7,
          mahasiswa_8: 7,
          mahasiswa_9: 7,
          mahasiswa_10: 7,
        },
        aspek_penilaian_4: {
          mahasiswa_1: 7,
          mahasiswa_2: 7,
          mahasiswa_3: 7,
          mahasiswa_4: 7,
          mahasiswa_5: 7,
          mahasiswa_6: 7,
          mahasiswa_7: 7,
          mahasiswa_8: 7,
          mahasiswa_9: 7,
          mahasiswa_10: 7,
        },
      },
      null,
      2
    );

    assert.strictEqual(jsonOutputCodeblock.textContent, expectedResult);
    assessmentPage.unmount();
  });

  it('should reset the form (clean the input and error message) when user click reset button', async () => {
    const user = userEvent.setup();
    const assessmentPage = render(<AssessmentPage />);
    const resetButton = screen.getByRole('button', {
      name: /reset/i,
    });
    const assessmentInput1 = screen.getByTestId<HTMLInputElement>(
      'aspek_penilaian_1.mahasiswa_1'
    );
    const assessmentInput2 = screen.getByTestId<HTMLInputElement>(
      'aspek_penilaian_2.mahasiswa_2'
    );
    const errorMessage2 = screen.getByTestId<HTMLInputElement>(
      'aspek_penilaian_2.mahasiswa_2-error'
    );

    await user.type(assessmentInput1, '7');
    await user.tab();
    await user.type(assessmentInput2, '0');
    await user.tab();

    await user.click(resetButton);

    assert.strictEqual(assessmentInput1.value, '');
    assert.strictEqual(assessmentInput2.value, '');
    assert.strictEqual(errorMessage2.textContent, '');

    assessmentPage.unmount();
  });
});
