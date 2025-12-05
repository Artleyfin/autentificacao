// 📌 QUESTÃO 1 - Importações do Firebase// Importe as funções necessárias do Firebase SDK// initializeApp: inicializa a conexão com o Firebase// getAuth: retorna a instância de autenticação
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 📌 QUESTÃO 2 - Configuração do Firebase// COLE AQUI o objeto firebaseConfig que você copiou do console do Firebase (Etapa 2.2)// Este objeto contém as credenciais que conectam seu app ao projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBGK9gYKiEvUFXPWcdc8GYyCAOXFdK5LzY",
    authDomain: "authifes-f8cc6.firebaseapp.com",
    projectId: "authifes-f8cc6",
    storageBucket: "authifes-f8cc6.firebasestorage.app",
    messagingSenderId: "412418214230",
    appId: "1:412418214230:web:f4a054f7ce52c1263eeef7",
    measurementId: "G-7MX5KFE7BH"
};
// 📌 QUESTÃO 3 - Inicializar Firebase// Inicializa a conexão com o Firebase usando as configurações acima// Isso cria a "ponte" entre seu app e os serviços do Firebase
const app = initializeApp(firebaseConfig);
// 📌 QUESTÃO 4 - Obter instância de Autenticação// Cria e exporta a instância de autenticação que usaremos em todo o app// Esta constante 'auth' será importada em outras telas para fazer login, logout, etc.
export const auth = getAuth(app);
export const db = getFirestore(app);