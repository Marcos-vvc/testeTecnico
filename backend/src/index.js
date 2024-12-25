"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Lista de usuários (mocada)
let users = [
    { id: 1, name: "João Silva", email: "joao.silva@example.com" },
    { id: 2, name: "Maria Oliveira", email: "maria.oliveira@example.com" },
    { id: 3, name: "Pedro Santos", email: "pedro.santos@example.com" },
    { id: 4, name: "Ana Costa", email: "ana.costa@example.com" },
    { id: 5, name: "Lucas Pereira", email: "lucas.pereira@example.com" },
];
app.get('/users', (req, res) => {
    res.json(users);
});
app.post('/users', (req, res) => {
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
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    users.splice(userIndex, 1);
    res.status(200).send();
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
