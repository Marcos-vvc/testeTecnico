import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../constants/baseURL";
import styles from './listUsers.module.css';
import Lixo from '../assets/lixo.png';


interface User {
    id: number;
    name: string;
    email: string;
  }

export const ListUsers = () => {
const [users, setUsers] = useState<User[]>([]);
const [newUser, setNewUser] = useState<{name: string; email: string}>({name: '', email: ''});


useEffect(() => {
  axios.get(`${baseURL}/users`)
  .then((response) => {
    setUsers(response.data)
  })
  .catch((error) => {
    console.error('Error ao buscar usuários:', error);    
  });
}, [])

const handleAddUser = () => {

  if(newUser.name && newUser.email){
    axios.post(`${baseURL}/users/create`, newUser)
    .then((response) => {
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUser({name: '', email: ''});
    }).catch((error) => {
      console.error('Erro ao adicionar usuário:', error);    
    });
  }else{
    alert('Nome e e-mail são obrigatórios!');
  } 
};

const handleDeleteUser = (id: number) => {
  axios.delete(`${baseURL}/users/${id}`)
  .then(() => {
    setUsers(users.filter(user => user.id !== id));
  })
  .catch((error) => {
    console.error('Error ao deletar usuário:', error);    
  });
};


return (
<div>
  <div className={styles.listContainer}>
    <h1>Lista de Usuários</h1>

    <div className={styles.containerForm}>
    <form onSubmit={handleAddUser}>
      <input 
      type="text"
      placeholder="Nome"
      value={newUser.name}
      onChange={(e) => setNewUser((prevUsers)=> ({
        ...prevUsers,
        name: (e.target.value)
      }))}
      />
      <input 
      type="email"
      placeholder="Email"
      value={newUser.email}
      onChange={(e) => setNewUser((prevUsers)=> ({
        ...prevUsers,
        email: (e.target.value)
      }))}
      />

      <button type="submit">Adicionar</button>
    </form>
    </div>
  <div className={styles.containerList}>
    {users && users.length > 0 ? (
    users.map((user)=> (
      <div className={styles['container-users']} key={user.id}>
        <div className={styles.userInfo}>
        <p>Nome: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>      
      <div className={styles.containerButton}>
        <button type="submit" onClick={()=> handleDeleteUser(user.id)}>
      <img src={Lixo} width={24} height={24}></img>
        </button>
      </div>
      </div>
    ))
      ) : (            
        <span>Você ainda não tem usuários cadastrados</span>
      )}
  </div>
  </div>
</div>
)
}