import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    { id: 'u1', name: 'Max Schwarz', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_Cropped.jpg/220px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_Cropped.jpg', places: 3 }
  ];

  return (
    <UsersList items={USERS} />
  );
};

export default Users;
