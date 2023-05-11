import renderer from 'react-test-renderer';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Signin from '../Signin/Signin';
import React from 'react';

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

/**
 * @jest-environment jsdom
 */
it('CheckboxWithLabel changes the text after click', () => {
    const component = render(
      <Signin />
    );
  
    //expect(queryByLabelText(/off/i)).toBeTruthy();
  
    //fireEvent.click(getByLabelText(/off/i));
  
    //expect(queryByLabelText(/on/i)).toBeTruthy();
  });
