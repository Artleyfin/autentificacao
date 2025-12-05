// 📌 QUESTÃO 1 - Tela de Cadastro com Busca de CEP
import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import {
    Button,
    HelperText,
    Snackbar,
    Text,
    TextInput
} from 'react-native-paper';
import { auth } from '../src/config/firebaseConfig';

export default function CadastroScreen() {
    // 📌 QUESTÃO 2 - Estados para dados do usuário
    // Crie estados para armazenar os dados do formulário
    
    // Dados pessoais - nome, email, senha, confirmarSenha
    const [titulo, setTitulo] = useState ("")
    const [validade, setValidade] = useState ("")
    const [descricao, setDescricao] = useState ("")
    const [categoria, setCategoria] = useState ("")
    

    // 🛠️ IMPLEMENTE AQUI - Crie estados para o endereço
    // Dica: cep, logradouro, numero, complemento, bairro, cidade, estado


    // Estados de controle
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('error'); // 'error' ou 'success'
    const [erros, setErros] = useState({}); // Armazena erros de validação

    
    // Função auxiliar para limpar campos de endereço
    const limparEndereco = () => {
        setLogradouro('');
        setBairro('');
        setCidade('');
        setEstado('');
    };

    // 📌 QUESTÃO 4 - Função de validação
    // Valida todos os campos antes de enviar
    const validarCampos = () => {
        const novosErros = {};

        // Validar titulo
        if (!titulo.trim()) {
            novosErros.titulo = 'Titulo é obrigatório';
        }

        // Validar email
        if (!validade.trim()) {
            novosErros.validade = 'Validade é obrigatório';
        }

        //validar descricao
        if (!descricao.trim()) {
            novosErros.descricao = 'Descrição é obrigatório';
        }

        //validar descricao
        if (!categoria.trim()) {
            novosErros.categoria = 'Categoria é obrigatório';
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    // 📌 QUESTÃO 5 - Função de cadastro
    // Esta função cria o usuário no Firebase
    const handleCadastro = async () => {
        // Valida os campos
        if (!validarCampos()) {
            setMensagem('Por favor, corrija os erros no formulário.');
            setTipoMensagem('error');
            return;
        }

        setLoading(true);
        try {
            // 🛠️ IMPLEMENTE AQUI
            // Use createUserWithEmailAndPassword do Firebase
            // Passa: auth, email, senha

            // Sucesso! Aqui você poderia salvar os dados de endereço em um banco de dados
            // Por enquanto, vamos apenas mostrar mensagem e redirecionar

            console.log('Produto cadastrado com sucesso!');
            console.log('Endereço:', { titulo, descricao, categoria, validade });

            setMensagem('Cadastro realizado com sucesso!');
            setTipoMensagem('success');

            // Aguarda 2 segundos e redireciona para home
            setTimeout(() => {
                router.replace('home');
            }, 2000);

        } catch (error) {
            console.error('Erro ao cadastrar:', error);

            // Tratamento de erros específicos do Firebase
            let mensagemErro = 'Erro ao cadastrar. Tente novamente.';

            if (error.code === 'auth/email-already-in-use') {
                mensagemErro = 'Este email já está cadastrado.';
            } else if (error.code === 'auth/invalid-email') {
                mensagemErro = 'Email inválido.';
            } else if (error.code === 'auth/weak-password') {
                mensagemErro = 'Senha muito fraca. Use no mínimo 6 caracteres.';
            }

            setMensagem(mensagemErro);
            setTipoMensagem('error');
        } finally {
            setLoading(false);
        }
    };

    // 📌 QUESTÃO 6 - Função para formatar CEP
    // Formata o CEP enquanto o usuário digita (00000-000)

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.titulo}>Criar Produto</Text>
                <Text style={styles.subtitulo}>Preencha os dados do produto cadastrar</Text>

                {/* Campo Titulo */}
                <TextInput
                    label="Titulo do Produto"
                    value={titulo}
                    onChangeText={setTitulo}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                    error={!!erros.titulo}
                    disabled={loading}
                />
                {erros.titulo && <HelperText type="error">{erros.titulo}</HelperText>}

                {/* Campo Validade */}
                <TextInput
                    label="Validade"
                    value={validade}
                    onChangeText={setValidade}
                    mode="outlined"
                    autoCapitalize="none"
                    style={styles.input}
                    left={<TextInput.Icon icon="email" />}
                    error={!!erros.validade}
                    disabled={loading}
                />
                {erros.validade && <HelperText type="error">{erros.validade}</HelperText>}

                {/* Campo descricao */}
                <TextInput
                    label="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="lock" />}
                    error={!!erros.descricao}
                    disabled={loading}
                />
                {erros.validade && <HelperText type="error">{erros.validade}</HelperText>}
                <TextInput
                    label="Categoria"
                    value={categoria}
                    onChangeText={setCategoria}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="email" />}
                    error={!!erros.categoria}
                    disabled={loading}
                />                
                {erros.categoria && <HelperText type="error">{erros.categoria}</HelperText>}

                {/* 📌 QUESTÃO 7 - Campo Confirmar Senha */}
                {/* 🛠️ IMPLEMENTE AQUI */}
                {/* Crie um TextInput similar ao de senha, mas para confirmar senha */}
                {/* Dicas:
            - label: "Confirmar Senha"
            - value: confirmarSenha
            - onChangeText: setConfirmarSenha
            - secureTextEntry: true
            - error: !!erros.confirmarSenha
        */}
                <TextInput
                    label="Confirmar Senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    left={<TextInput.Icon icon="lock-check" />}
                    error={!!erros.confirmarSenha}
                    disabled={loading}
                />
                {erros.confirmarSenha && (
                    <HelperText type="error">{erros.confirmarSenha}</HelperText>
                )}

                {/* 📌 SEÇÃO 2: ENDEREÇO */}
                <Text style={styles.secaoTitulo}>Endereço</Text>

                {/* Campo CEP com busca automática */}
                <TextInput
                    label="CEP"
                    value={cep}
                    onChangeText={formatarCep}
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.input}
                    left={<TextInput.Icon icon="map-marker" />}
                    right={loadingCep && <TextInput.Icon icon="loading" />}
                    error={!!erros.cep}
                    disabled={loading}
                    placeholder="00000-000"
                />
                {erros.cep && <HelperText type="error">{erros.cep}</HelperText>}
                <HelperText type="info">
                    Digite o CEP para preencher automaticamente o endereço
                </HelperText>

                {/* Campo Logradouro */}
                <TextInput
                    label="Logradouro (Rua/Av)"
                    value={logradouro}
                    onChangeText={setLogradouro}
                    mode="outlined"
                    style={styles.input}
                    error={!!erros.logradouro}
                    disabled={loading || loadingCep}
                />
                {erros.logradouro && (
                    <HelperText type="error">{erros.logradouro}</HelperText>
                )}

                {/* Linha com Número e Complemento */}
                <View style={styles.linha}>
                    <View style={styles.campoMetade}>
                        <TextInput
                            label="Número"
                            value={numero}
                            onChangeText={setNumero}
                            mode="outlined"
                            keyboardType="numeric"
                            style={styles.input}
                            error={!!erros.numero}
                            disabled={loading}
                        />
                        {erros.numero && (
                            <HelperText type="error">{erros.numero}</HelperText>
                        )}
                    </View>

                    <View style={styles.campoMetade}>
                        <TextInput
                            label="Complemento"
                            value={complemento}
                            onChangeText={setComplemento}
                            mode="outlined"
                            style={styles.input}
                            disabled={loading}
                        />
                    </View>
                </View>

                {/* 📌 QUESTÃO 8 - Campos Bairro, Cidade e Estado */}
                {/* 🛠️ IMPLEMENTE AQUI */}
                {/* Crie 3 TextInputs para: bairro, cidade, estado */}
                {/* Seguindo o padrão dos campos acima */}

                <TextInput
                    label="Bairro"
                    value={bairro}
                    onChangeText={setBairro}
                    mode="outlined"
                    style={styles.input}
                    error={!!erros.bairro}
                    disabled={loading || loadingCep}
                />
                {erros.bairro && <HelperText type="error">{erros.bairro}</HelperText>}

                <TextInput
                    label="Cidade"
                    value={cidade}
                    onChangeText={setCidade}
                    mode="outlined"
                    style={styles.input}
                    error={!!erros.cidade}
                    disabled={loading || loadingCep}
                />
                {erros.cidade && <HelperText type="error">{erros.cidade}</HelperText>}

                <TextInput
                    label="Estado"
                    value={estado}
                    onChangeText={setEstado}
                    mode="outlined"
                    style={styles.input}
                    maxLength={2}
                    autoCapitalize="characters"
                    error={!!erros.estado}
                    disabled={loading || loadingCep}
                />
                {erros.estado && <HelperText type="error">{erros.estado}</HelperText>}

                {/* Botão Cadastrar */}
                <Button
                    mode="contained"
                    onPress={handleCadastro}
                    style={styles.botao}
                    contentStyle={styles.botaoConteudo}
                    loading={loading}
                    disabled={loading || loadingCep}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>

                {/* Link para voltar ao login */}
                <Button
                    mode="text"
                    onPress={() => router.back()}
                    style={styles.botaoTexto}
                    disabled={loading}
                >
                    Já tem conta? Faça login
                </Button>

                {/* Snackbar para mensagens */}
                <Snackbar
                    visible={mensagem !== ''}
                    onDismiss={() => setMensagem('')}
                    duration={3000}
                    style={[
                        styles.snackbar,
                        tipoMensagem === 'success' && styles.snackbarSucesso
                    ]}
                >
                    {mensagem}
                </Snackbar>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// 📌 QUESTÃO 9 - Estilos da Tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        marginTop: 20,
        color: '#333',
    },
    subtitulo: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    secaoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 12,
        color: '#6200ee',
    },
    input: {
        marginBottom: 4,
        backgroundColor: '#fff',
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    campoMetade: {
        flex: 1,
    },
    botao: {
        marginTop: 24,
        marginBottom: 12,
    },
    botaoConteudo: {
        paddingVertical: 8,
    },
    botaoTexto: {
        marginTop: 8,
        marginBottom: 20,
    },
    snackbar: {
        backgroundColor: '#d32f2f',
    },
    snackbarSucesso: {
        backgroundColor: '#4caf50',
    },
});