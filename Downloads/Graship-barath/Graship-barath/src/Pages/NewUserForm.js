import React, { useState, useEffect } from 'react';
import Dashboard from '../Components/Dashboard';
import "../App.css"
import UserService from "../Service/UserService";
import { Table, Modal } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';

const NewUserForm = () => {

  const [users, setUsers] = useState([])
  const [roleId, setRoleId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");
  const [createBy, setCreateBy] = useState("");

  useEffect(() => {
    getAllUser();
  }, [])


  const clearTextFields = () => {
    setRoleId("");
    setEmployeeId("");
    setUserName("");
    setPassword("");
    setEmail("");
    setCreateBy("")
  }

  const getAllUser = () => {
    UserService.getAllUsers().then((response) => {
      setUsers(response.data);
    }).catch(error => {
      console.log(error);
    });

  }

  const addUser = () => {
    if (roleId && employeeId && userName && password && email && createBy) {
      const user = { roleId, employeeId, userName, email, password, createBy };
      UserService.createUser(user)
        .then((response) => {
          console.log(response.data);
          clearTextFields();
          window.alert("User Added Successfully");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      window.alert("Please Fill all details");
    }
  };

  const deleteUsers = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      UserService.deleteUser(id)
        .then((response) => {
          console.log(response);
          getAllUser();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [searchQuery, setSearchQuery] = useState('');

// Function to handle search
const handleSearch = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);
};

// Filtered users based on search query
const filteredUsers = users.filter(user =>
  user.userName.toLowerCase().includes(searchQuery) ||
  user.email.toLowerCase().includes(searchQuery)||
  user.employeeId.toLowerCase().includes(searchQuery)||
  user.roleId.toString().includes(searchQuery) ||
  user.userId.toString().includes(searchQuery)
);

  const [showFormPopup, setShowFormPopup] = useState(false);
  const toggleFormPopup = () => {
    setShowFormPopup(!showFormPopup);
  };

  return (
    <div>
      <Dashboard>
        <div >
          <div>

          <input
            type="text"
            className="searchinpts"
            placeholder="search..."
            value={searchQuery}
            onChange={handleSearch}
          />
            <Modal show={showFormPopup} onHide={toggleFormPopup}>
              <Modal.Header>
                <button className='update-button' onClick={() => setShowFormPopup(false)}>
                  <ExitToAppIcon />
                </button>
              </Modal.Header>
              <Modal.Body>

                {/* <div>
                  <h2 className='text-uppercase font-weight-bold text-center font-family-Arial,sans-serif'>Add User</h2>
                </div> */}
                {/* <div>
                  <label className='label '>Role Id:</label>
                  <input type="text" className='inuttxt' value={roleId} onChange={(e) => setRoleId(e.target.value)} />
                </div> */}
                <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={roleId} onChange={(e) => setRoleId(e.target.value)}
                />
                <label className="poplabel">RoleId</label>
              </div>
                {/* <div>
                  <label className='label'>EmployeeId:</label>
                  <input type="text" className='inuttxt' value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                </div> */}
                <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={employeeId} 
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
                <label className="poplabel">EmployeeId</label>
              </div>
                {/* <div>
                  <label className='label'>User Name:</label>
                  <input type="text" className='inuttxt' value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div> */}
                <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={userName} onChange={(e) => setUserName(e.target.value)}
                />
                <label className="poplabel">UserName</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <label className="poplabel">Email</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  className="popinpts"
                  placeholder=" "
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <label className="poplabel">Password</label>
              </div>
                {/* <div>
                  <label className='label'>Email:</label>
                  <input type="email" className='inuttxt' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label className='label'>Password:</label>
                  <input type="text" className='inuttxt' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                  <label className='label'>Create By:</label>
                  <input type="text" className='inuttxt' value={createBy} onChange={(e) => setCreateBy(e.target.value)} />
                </div> */}
                <div>
                  <button type="submit" className="adduserbtn" onClick={(e) => { addUser(e) }}>Add User</button>
                </div>
              </Modal.Body>
            </Modal>

          </div>
          <button className="hadduserbtn" onClick={toggleFormPopup}>Add User</button>
          <div>
            <div className="tablecontainer">
              <Table className='table1'>
                <thead>
                  <tr>
                    <th>User Id</th>
                    <th>Role</th>
                    <th>Employee Id</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    filteredUsers.map(
                      user =>
                        <tr key={user.userId}>
                          <td>{user.userId}</td>
                          <td>{user.roleId}</td>
                          <td>{user.employeeId}</td>
                          <td>{user.userName}</td>
                          <td>{user.email}</td>
                          <td><div style={{ display: 'flex' }}><button className='update-button'><EditIcon /></button>
                            <button className='delete-button' onClick={() => { deleteUsers(user.userId) }}><DeleteIcon /></button></div></td>
                        </tr>
                    )
                  }
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default NewUserForm;
