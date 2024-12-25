import express from 'express'
import cors from 'cors'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

interface User {
    id: number;
    name: string;
    email: string;
}

// Lista de usuários (mocada)

let users:User[] = [
    { id: 1, name: "João Silva", email: "joao.silva@example.com" },
    { id: 2, name: "Maria Oliveira", email: "maria.oliveira@example.com" },
   
]

app.get('/users', (req, res) =>{
    res.json(users)
})

app.post('/users/create', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'O nome e email são obrigatórios' });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email,
    };

    users.push(newUser);
    return res.status(201).json(newUser);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);

    const userIndex = users.findIndex((user)=> user.id === userId);
    if(userIndex === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado.'});
    }

    users.splice(userIndex, 1);
    res.status(204).send()
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})

