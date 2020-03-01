import React from "react";

const kontakt = () => {
  return (
    <div>
      <h1 className='überschrift'>Kontakt</h1>
      <div id='container-form'>
        <form>
          <div className='six columns'>
            <label for='exampleEmailInput'>Deine Email</label>
            <input
              className='u-full-width'
              type='email'
              placeholder='test@mailbox.com'
              id='exampleEmailInput'
            ></input>
          </div>
          <div className='six columns'>
            <label for='exampleRecipientInput'>Grund</label>
            <select className='u-full-width' id='exampleRecipientInput'>
              <option value='Option 1'>Fragen zum Lageplan</option>
              <option value='Option 2'>Update der Gebäude</option>
              <option value='Option 3'>Weiteres</option>
            </select>
          </div>
          <label for='exampleMessage'>Nachricht</label>
          <textarea
            Name='u-full-width'
            placeholder='Ihre Nachricht…'
            id='exampleMessage'
          ></textarea>
          <input
            className='button'
            type='submit'
            value='Absenden'
            id='form-btn'
          ></input>
        </form>
      </div>
    </div>
  );
};

export default kontakt;
