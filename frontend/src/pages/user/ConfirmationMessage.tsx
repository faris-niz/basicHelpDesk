import React, { useState } from 'react';

const confirmationMessage = () => {

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 400, margin: 10, padding: 20}}>
      <img alt="Zealthy logo in black" loading="lazy" src="https://assets-global.website-files.com/64ac3a433180d94638a63ead/64acc00e5f8b28a1f8b430a9_Logo-Zealthy-Black.svg"
       style={{width: 200}}/>
      <p>You have successfully created a help ticket. We will review your ticket and contact you shortly</p>
      <a href='/'>Back to main page</a>
    </div>
  );
};

export default confirmationMessage;