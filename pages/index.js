import { useEffect, useState } from 'react';
import Router from 'next/router';
import RentalForm from './components/Form';

export default function Home() {
  const [formData, setFormData] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      console.log(formData);
      Router.push('/thank-you');
    }
  });
  return (
    <>
      <RentalForm
        setData={setFormData}
        data={formData}
        setRedirect={setHasSubmitted}
      />
    </>
  );
}
