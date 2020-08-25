import { useState } from 'react';
import 'bulma/css/bulma.min.css';
import partnerConfig from '../partner_config.json'

const defaultConfig = JSON.stringify(partnerConfig, null, '\t')

export default function Home() {

  const [partner, setPartner] = useState({
    name: '',
    absynthKey: '',
    customizations: defaultConfig
  });

  const [response, setResponse] = useState({
    type: '',
    message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) =>
    setPartner({ ...partner, [e.target.name]: e.target.value });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        body: JSON.stringify(partner),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: 'success',
          message: `Partner ${partner.name} was added successfully.`
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message: 'An error occured while submitting the form'
      });
    }
  };


  return (
    <div>
      <div className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column' />
            <div className='column  is-two-thirds'>
              <div
                className={
                  response.type === 'success'
                    ? 'tile box notification is-primary'
                    : 'is-hidden'
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className={
                  response.type === 'error'
                    ? 'tile box notification is-danger'
                    : 'is-hidden'
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className='columns'
              >
                <div className='column content'>
                  <h2>New Partner</h2>
                  <form
                    onSubmit={handleSubmit}
                  >
                    <div className='field'>
                      <label className='label'>Name</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='text'
                          placeholder='Name'
                          name='name'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Absynth key</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='text'
                          placeholder='Absynth key'
                          name='absynthKey'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Customizations</label>
                      <div className='control'>
                        <textarea
                          className='textarea'
                          placeholder='Customizations'
                          name='customizations'
                          defaultValue={defaultConfig}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field is-grouped'>
                      <div className='control'>
                        <button className='button is-primary' type='submit'>
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='column' />
          </div>
        </div>
      </div>
    </div>
  );
}
