import Image from 'next/image';

export default function Options({ model }) {
  return (
    <>
      {Object.keys(model).length > 0 && (
        <div className='car-specs'>
          <h3>
            {model.make} - {model.model}
          </h3>
          <Image
            src={model.picture}
            alt='car picture'
            width={400}
            height={300}
          />
          <p>
            {model.colour} colour - {model.doors} doors - {model.seats} seats{' '}
          </p>
          <p className='price'>{model.price}</p>
        </div>
      )}
    </>
  );
}
