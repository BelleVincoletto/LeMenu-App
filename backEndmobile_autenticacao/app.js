const express = require("express");
const crypto = require("crypto");
const mysql = require("mysql2/promise");
const bodyparser = require("body-parser");
const nodemailer = require('nodemailer');
 
const app = express();
const port = 3000;

// tentativa dotenv
require('dotenv').config()

 
app.use(express.json());
// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "banco_lemenu",
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0
});
 
// Rota para gerar e retornar o hash SHA-256 de uma string
app.get("/hash", (req, res) => {
 
  const { string } = req.query
 
  if (!string) {
    res.json({ msg: "Usuário não passou uma senha" })
  }
 
  //  construir que tipo de has que eu quero que ele gere
  const hash = crypto.createHash("SHA256").update(string).digest("hex")
 
  res.json({ msg: hash })
 
});
 
app.post("/cadastrar", async (req, res) => {
  try {
    // console.log("Entrou no cadastrar")
   let  {nome, email, dataNascimento,cpf,password,telefone, emailRecuperacao } = req.body

    let senha = password
    email = email.trim()
    nome = nome.trim()

    console.log(email)


    // if(!login){
    //   res.json({msg:"Login não informado lindinho(a)"})
    // }
    // else if(!senha ){
    //   res.json({msg:"Senha não informado lindinho(a)"})
    // }
    
    // 10-02-2003
    let nova_data = dataNascimento.substr(6,4)+"-"+dataNascimento.substr(3,2)+"-"+dataNascimento.substr(0,2)
    // data_nascimento = 2023/12/02
   
    console.log(senha)
  
    
    const hash = crypto.createHash("SHA256").update(senha).digest("hex")
    
 
    const sql = `INSERT INTO cadastro_clientes(email, data_nascimento,nome,cpf,senha,telefone,email_recuperacao) VALUES (lower ("${email}"),"${nova_data}", "${nome}","${cpf}","${hash}","${telefone}","${emailRecuperacao}")`
    console.log(sql)

    const conexao = await pool.getConnection()
 
    // executar o insert
    const [linha] = await conexao.execute(sql)
    console.log(linha)
 
    conexao.release()
 
    res.json({ msg: "Cadastro feito com sucesso" })
 
 
  } catch (error) {
    console.log(`O erro que ocorreu foi: ${error}`);
    res.status(500).json({ error: "Deu algum erro no cadastro" });
  }
});
 
app.post('/login', async (req, res) => {
  try {
   let { email, senha } = req.body;

    console.log('Recebido:', email, senha);
    
    email = email.trim()
    
    // console.log('Usando o TRIM:', email, senha);


    // Validação dos dados recebidos
    if (!email || !senha) {
      return res.status(400).json({ msg: "Email e Senha são obrigatórios" });
    }

    const hash = crypto.createHash('SHA256').update(senha).digest('hex');

    // console.log(hash)

    // Definição da consulta SQL para buscar o ID, email e nome do usuário
    // const sql = `SELECT id_usuario, email, nome, senha FROM cadastro_clientes WHERE email = ? AND senha = ?`;
    const sql = (`SELECT id_usuario, email, nome, senha FROM cadastro_clientes WHERE email = '${email}' AND senha = '${hash}'`)
    console.log(sql)
    // Tentativa de conexão com o banco de dados
    let connection;
    try {
      connection = await pool.getConnection();
    } catch (dbError) {
      console.error("Erro ao conectar ao banco de dados:", dbError);
      return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
    }

    try {
      // Executa a consulta com parâmetros
      const [rows] = await connection.execute(sql);
      console.log(rows)
      if (rows.length === 1) {
        // Se o login for bem-sucedido, retorna o ID, email e nome do usuário
        res.status(200).json({
          msg: "Login realizado com sucesso",
          id: rows[0].id_usuario,
          email: rows[0].email,
          nome: rows[0].nome
        });
      } else {
        res.status(401).json({ msg: "Email ou Senha incorreta" });
      }
    } catch (queryError) {
      console.error("Erro ao executar a query:", queryError);
      res.status(500).json({ error: "Erro interno ao processar login" });
    } finally {
      if (connection) connection.release(); // Garante que a conexão será liberada
    }
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({ error: "Erro interno ao processar login" });
  }
});


 
app.get('/receitas', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT *,  id_receita, REGEXP_REPLACE(ingredientes, '\\s*\\([^)]*\\)', '') AS descricao_limpa FROM cadastro_receitas");
    res.json(rows);    

  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    // if (conn) conn.end();
  }
});

app.post("/addFavorite", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    const sql = `INSERT INTO favoritos (usuario_id, receita_id) VALUES (?, ?)`;
    const conexao = await pool.getConnection();

    await conexao.execute(sql, [userId, recipeId]);

    conexao.release();
    res.json({ msg: "Receita adicionada aos favoritos com sucesso" });
  } catch (error) {
    console.error("Erro ao adicionar receita aos favoritos:", error);
    res.status(500).json({ error: "Erro ao adicionar receita aos favoritos" });
  }
});

app.post("/removeFavorite", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    const sql = `DELETE FROM favoritos WHERE usuario_id = ? AND receita_id = ?`;
    const conexao = await pool.getConnection();

    await conexao.execute(sql, [userId, recipeId]);

    conexao.release();
    res.json({ msg: "Receita removida dos favoritos com sucesso" });
  } catch (error) {
    console.error("Erro ao remover receita dos favoritos:", error);
    res.status(500).json({ error: "Erro ao remover receita dos favoritos" });
  }
});


app.get("/favoriteRecipes", async (req, res) => {
  try {
    const { userId } = req.query;

    const sql = `
      SELECT r.*
      FROM cadastro_receitas r
      JOIN favoritos f ON r.id = f.receita_id
      WHERE f.usuario_id = ?
    `;
    const conexao = await pool.getConnection();

    const [rows] = await conexao.execute(sql, [userId]);

    conexao.release();
    res.json(rows);
  } catch (error) {
    console.error("Erro ao listar receitas favoritas:", error);
    res.status(500).json({ error: "Erro ao listar receitas favoritas" });
  }
});

// Rota para atualizar perfil
app.put('/atualizar/:id', async (req, res) => {
  const id = req.params.id; // Obtém o ID da URL
  const { nome, dataNascimento, senha, telefone, email } = req.body;

  // Verificação básica para garantir que todos os campos necessários estão presentes
  if (!id || !nome || !senha || !telefone || !email || !dataNascimento) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    // Criptografar a senha usando SHA-256
    const hash = crypto.createHash('SHA256').update(senha).digest('hex');

    // Atualizar o perfil no banco de dados
    const [result] = await pool.execute(
      `UPDATE cadastro_clientes 
       SET nome = ?, email = ?, data_nascimento = ?, telefone = ?, senha = ?
       WHERE id = ?`,
      [nome, email, dataNascimento, telefone, hash, id] // Ordem corrigida
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, msg: 'Perfil atualizado com sucesso!' });
    } else {
      res.status(400).json({ error: 'Erro ao atualizar o perfil' });
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


// Rota para buscar usuário por ID
app.get('/buscar/', async (req, res) => {
  console.log("Entrou na rota")
  const id = req.query.id;
  // console.log(id)
  try {
      const [rows] = await pool.execute(
          `SELECT nome, data_nascimento, email, senha, telefone FROM cadastro_clientes WHERE id_usuario = ?`,
          [id]
      );

      if (rows.length > 0) {
          res.json(rows[0]);
      } else {
          res.status(404).json({ error: 'Usuário não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/busca_email/', async (req, res) => {
  console.log("Entrou na rota de buscar email");
  const email = req.query.email;

  // Validação do email
  if (!email) {
      return res.status(400).json({ error: 'Email não fornecido' });
  }

  console.log(email);
  
  try {
      const [rows] = await pool.execute(
          `SELECT * FROM cadastro_clientes WHERE email = ?`,
          [email]
      );

      if (rows.length > 0) {
          res.status(200).json({ "resposta": true });
      } else {
          res.status(200).json({ "resposta": false, message: 'Email não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao buscar se o email existe', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



app.put('/atualizarDados', async(req,res)=>{

const {id, nome, data_nascimento, telefone, email, senha, flag } = req.body
let nova_data = data_nascimento.substr(6,4)+"-"+data_nascimento.substr(3,2)+"-"+data_nascimento.substr(0,2)

console.log(flag)
  try {
    
    let sql=""
    if(flag===true){
      //update de tudo, inclusive o password
      //SQL COM O CAMPO SENHA INCLUSO
      const hash = crypto.createHash('SHA256').update(senha).digest('hex');

      sql = `UPDATE cadastro_clientes SET nome = '${nome}', data_nascimento='${nova_data}', telefone='${telefone}', email='${email}',senha ='${hash}'  WHERE id_usuario = '${id}' `
    }else{
      //
      //SQL SEM O CAMPO SENHA INCLUSO
      sql = `UPDATE cadastro_clientes SET nome = '${nome}', data_nascimento='${nova_data}', telefone='${telefone}', email='${email}' WHERE id_usuario = '${id}' `

    }


    // Atualizar o perfil no banco de dados
    const [result] = await pool.execute(sql);

    if (result.affectedRows > 0) {
      res.json({ success: true, msg: 'Perfil atualizado com sucesso!' });
    } else {
      res.status(400).json({ error: 'Erro ao atualizar o perfil' });
    }

  } catch (error) {
    console.error('Erro ao buscar se o email existe', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

// Aqui para Baixo é as rotas para o funcionamento do "Esquecer Senha"

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000); // Gera um código de 6 dígitos
}

// Configuração de envio de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'lemenuolficial@gmail.com',
      pass: 'dwrv prrn ovze kean', // Certifique-se de usar a senha correta
  },
  secure: true, // Use SSL
  port: 465,    // Porta para SSL
  timeout: 10000, // Aumente o timeout para 10 segundos
});


// Rota para solicitar redefinição de senha
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const verificationCode = generateVerificationCode();
  const expirationTime = new Date(Date.now() + 3600000); // expira em 1 hora

  try {
      const connection = await pool.getConnection();
      const query = 'UPDATE cadastro_clientes SET verification_code = ?, verification_expires = ? WHERE email = ?';
      const [result] = await connection.execute(query, [verificationCode, expirationTime, email]);

      connection.release();

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const mailOptions = {
          from: 'lemenuoficial@gmail.com',
          to: email,
          subject: 'Redefinição de Senha - Le Menu',
          text: `Redefinição de Senha - Le Menu\n\nVocê solicitou a redefinição de senha para sua conta no Le Menu.\n\nCódigo de verificação: ${verificationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Erro ao enviar e-mail:', error);
              return res.status(500).json({ error: 'Erro ao enviar e-mail', message: error.message });
          }
          console.log('E-mail enviado:', info.response);
          res.json({ message: 'Código de verificação enviado para o seu e-mail' });
      });
  } catch (err) {
      console.error('Erro ao enviar código de verificação:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para verificar o código e redefinir senha
app.post('/verify-code', async (req, res) => {
  console.log(req.body);
  const { code, email } = req.body;

  // Verifica se email e código estão presentes
  if (!email || !code) {
      return res.status(400).json({ error: 'Email e código de verificação são obrigatórios' });
  }

  try {
      const connection = await pool.getConnection();
      try {
          const query = 'SELECT * FROM cadastro_clientes WHERE email = ? AND verification_code = ? AND verification_expires > ?';
          const [results] = await connection.execute(query, [email, code, new Date()]);

          if (results.length === 0) {
              return res.status(400).json({ error: 'Código de verificação inválido ou expirado' });
          }

          res.json({ success: true, message: 'Código verificado com sucesso' });
      } finally {
          connection.release();  // Libera a conexão, independentemente do sucesso ou erro
      }
  } catch (error) {
      console.error('Erro ao verificar código de verificação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/reset-password', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
      return res.status(400).json({ error: 'Campos de e-mail e senha são obrigatórios.' });
  }

  try {
      const connection = await pool.getConnection();

      // Verifica se o e-mail existe no banco de dados
      const [user] = await connection.execute('SELECT * FROM cadastro_clientes WHERE email = ?', [email]);

      if (user.length === 0) {
          connection.release();
          return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Criptografa a senha usando SHA-256
      const hash = crypto.createHash('SHA256').update(senha).digest('hex');

      // Atualiza a senha criptografada no banco de dados
      const query = 'UPDATE cadastro_clientes SET senha = ? WHERE email = ?';
      await connection.execute(query, [hash, email]);

      connection.release();

      res.json({ success: true, message: 'Senha redefinida com sucesso.' });
  } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});




 
// Iniciar o servidor
app.listen(process.env.PORTA, () => {
  console.log(`servidor está rodando em http://localhost:${process.env.PORTA}`)
})