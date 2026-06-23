const Password = require('../models/Password');

// Função utilitária para gerar a senha
const generateRandomPassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

exports.generateAndSave = async (req, res) => {
  try {
    const length = req.body.length || 12;
    const generatedValue = generateRandomPassword(length);
    
    // Salva no banco de dados (Supabase via Sequelize)
    const newPassword = await Password.create({ value: generatedValue, length });
    
    res.status(201).json(newPassword);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar senha' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const passwords = await Password.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
};