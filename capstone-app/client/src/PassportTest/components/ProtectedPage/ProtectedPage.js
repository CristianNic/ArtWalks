import React from 'react';

const ProtectedPage = (props) => {
  console.log('Protected page props: ', props);
  return (
    <>
      <h1>Protected Page</h1>
      <h2>Hey, {props.user.displayName}</h2>
      {props.user.bio && <p>{props.user.bio}</p>}
      <ul>
        {props.user._json.company && <li>{props.user._json.company}</li>}
        {props.user._json.blog && <li>{props.user._json.blog}</li>}
        {props.user._json.location && <li>{props.user._json.location}</li>}
        {props.user._json.email && <li>{props.user._json.email}</li>}
      </ul>
    </>
  );
};

export default ProtectedPage;
