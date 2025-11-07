import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
const [users, setUsers] = useState([]);

useEffect(() => {
axios.get('http://localhost:5001/api/usuarios')
.then(res => setUsers(res.data))
.catch(err => console.error(err));
}, []);

}

export default UserList;