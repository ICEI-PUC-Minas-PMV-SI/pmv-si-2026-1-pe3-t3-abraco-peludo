# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

Nesta parte do trabalho você deve detalhar a documentação dos requisitos do sistema proposto de acordo com as seções a seguir. Ressalta-se que aqui é utilizado como exemplo um sistema de gestão de cursos de aperfeiçoamento.

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades da Coordenação do Curso de Sistemas de Informação da PUC Minas que devem ser atendidas pelo projeto SCCA – Sistema de Cadastro de Cursos de Aperfeiçoamento.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado SCCA – Sistema de Cadastro de Cursos de Aperfeiçoamento. Ele terá somente um componente (módulo) com os devidos elementos necessários à gestão de cursos.

### 3.2.2 Missão do produto
Gerenciar informações sobre a oferta de cursos de aperfeiçoamento, gerenciar a composição das turmas, alunos, professores e matrículas. 

### 3.2.3 Limites do produto
O SCCA não fornece nenhuma forma de avaliação de alunos, pagamento de parcelas do curso, pagamento a professore e agendamentos. O SCCA não contempla o atendimento a vários cursos de Sistemas de Informação de outras unidades da PUC Minas.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Facilidade no cadastro de dados |	Essencial |
|2 | Facilidade na recuperação de informações | Essencial | 
|3 | Segurança no cadastro de matrículas | Essencial | 
|4	| Melhoria na comunicação com os alunos	| Recomendável | 

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| RF01 | Visualizar Lista Animais | O sistema deve permitir aos usuários visualizarem a lista de animais para doação |
| RF02 | Gerenciar Adotante	| O sistema deve permitir ao usuário cadastrar, atualizar e deletar uma conta de adotante |
| RF03 | Visualizar Dados Adotante | O sistema deve permitir ao Adotante visualizar as informações cadastradas da conta |
| RF04 | Acessar Andamento Adoção	| O sistema deve permitir aos adotantes acesso ao andamento da adoção |
| RF05 | Gerenciar ONG | O sistema deve permitir ao usuário cadastrar, atualizar e deletar uma conta de ONG |
| RF06 | Visualizar Dados ONG	| O sistema deve permitir aos responsáveis da ONG visualizar as informações cadastradas da conta |
| RF07 | Cadastrar Animal | O sistema deve permitir aos responsáveis pela ONG cadastrar um animal para adoção |
| RF08 | Exibir Mídia	| O sistema deve permir aos adotantes ver a mídia de fotos, para conhecer os animais área de adoção |
| RF09 | Cadastrar Mídia | O sistema deve permir aos responsáveis pela ONG de anexar as fotos dos animais na área de adoção |
| RF10 | Filtrar Busca | O usuário deve conseguir filtrar os animais por porte (pequeno, médio, grande) e sexo |
| RF11 | Exibir Perfil Detalhado | Ao clicar em um animal, o sistema deve exibir informações de saúde (vacinas, castração, vermifugação) e uma breve história do pet |
| RF12 | Gerenciar Perfil Detalhado | O sistema deve permitir ao responsável por cadastrar os animais, cadastrar, atualizar e deletar as informações de saúde e uma breve história do pet |
| RF13 | Ver o Perfil Detalhado  | O sistema deve permitir ao responsável por cadastrar os animais, ver as informações de saúde e uma breve história do pet |
| RF14 | Alterar Status | O sistema deve permitir que a ONG altere a situação do processo (Ex: "Em Análise", "Entrevista Marcada", "Aprovado", "Recusado") |
| RF15 | Ver Status Alterado | O sistema deve permitir que a ONG veja a situação do processo (Ex: "Em Análise", "Entrevista Marcada", "Aprovado", "Recusado") |
| RF16 | Agendar Visita | O sistema deve: Permitir que o usuário escolha um dia e horário disponível no calendário da ONG para ir ao abrigo conhecer o animal pessoalmente antes de decidir |
| RF17 | Tirar Dúvidas | O sistema deve ter um chat simples dentro do aplicativo onde o interessado pode tirar dúvidas básicas com o protetor antes de clicar no botão oficial de "Adotar" |
| RF18 | Alertar ONG | O sistema deve manter um histórico interno de CPFs que já tiveram solicitações negadas ou problemas em adoções anteriores, alertando a ONG quando uma dessas pessoas tentar uma nova adoção |
| RF19 | Candidatar "Lar Temporário" | O sistema deve ter uma opção no perfil do animal para o usuário se candidatar apenas como "Lar Temporário", enviando um aviso para a ONG de que aquele pet específico tem um lugar para ficar enquanto não é adotado |
| RF20 | Exibir Checklist "Primeiros Passos" | O sistema deve exibir uma lista automática de itens necessários (ex: ração, tamanho da guia, marca da areia) assim que a adoção for aprovada, para que o novo dono se prepare antes do pet chegar |
| RF21 | ... | ... |
| RF22 | ... | ... |

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF01 | O sistema deve permitir ao usuário completar uma tarefa de cadastro em 1 minuto |
| RNF02 | A consulta de animais disponívies para adoção deve demorar no máximo 5 segundos |
| RNF03 | O sistema deve ser implementado na linguagem JavaScript |
| RNF04 | O sistema apresentar as opções de animais para adoção próximos em no máximo 2 segundos |
| RNF05 | O sistema deve seguir um Design System padronizado, utilizando a mesma paleta de cores, tipografia e estilos de botões em todas as telas |
| RNF06 | Toda ação do usuário (clique em botão, envio de formulário) deve gerar um feedback visual imediato (ex: tooltips ou mensagens de sucesso/erro) |
| RNF07 | O contraste entre texto e fundo deve seguir o padrão WCAG 2.1 (AA), com uma proporção mínima de 4.5:1, garantindo leitura para pessoas com baixa visão |
| RNF08 | A interface deve ser Mobile-First ou totalmente responsiva, adaptando-se automaticamente a resoluções desde 360px (smartphones) até 1920px (desktops) sem perda de funcionalidade |
| RNF09 | Para evitar que o usuário tenha que criar mais uma senha, o sistema deve permitir o cadastro e login rápido usando contas que ele já possui, como Google ou Apple, em um clique |

### 3.3.3 Usuários 

| Ator | Descrição |
|--------------------|------------------------------------|
| Secretaria ONG |	Usuário responsável pelo registro e alteração de cadastro de animais |
| Adotante |	Usuário responsável pelo início do pedido de adoção |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, a secretária poderá gerenciar as matrículas e professores no sistema, enquanto o coordenador, além dessas funções, poderá gerenciar os cursos de aperfeiçoamento.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

![dcu](https://github.com/user-attachments/assets/41f6b731-b44e-43aa-911f-423ad6198f47)
 
### 3.4.2 Descrições de Casos de Uso

Cada caso de uso deve ter a sua descrição representada nesta seção. Exemplo:

#### Gerenciar Professor (CSU01)

Sumário: A Secretária realiza a gestão (inclusão, remoção, alteração e consulta) dos dados sobre professores.

Ator Primário: Secretária.

Ator Secundário: Coordenador.

Pré-condições: A Secretária deve ser validada pelo Sistema.

Fluxo Principal:

1) 	A Secretária requisita manutenção de professores.
2) 	O Sistema apresenta as operações que podem ser realizadas: inclusão de um novo professor, alteração de um professor, a exclusão de um professor e a consulta de dados de um professor.
3) 	A Secretária seleciona a operação desejada: Inclusão, Exclusão, Alteração ou Consulta, ou opta por finalizar o caso de uso.
4) 	Se a Secretária desejar continuar com a gestão de professores, o caso de uso retorna ao passo 2; caso contrário o caso de uso termina.

Fluxo Alternativo (3): Inclusão

a)	A Secretária requisita a inclusão de um professor. <br>
b)	O Sistema apresenta uma janela solicitando o CPF do professor a ser cadastrado. <br>
c)	A Secretária fornece o dado solicitado. <br>
d)	O Sistema verifica se o professor já está cadastrado. Se sim, o Sistema reporta o fato e volta ao início; caso contrário, apresenta um formulário em branco para que os detalhes do professor (Código, Nome, Endereço, CEP, Estado, Cidade, Bairro, Telefone, Identidade, Sexo, Fax, CPF, Data do Cadastro e Observação) sejam incluídos. <br>
e)	A Secretária fornece os detalhes do novo professor. <br>
f)	O Sistema verifica a validade dos dados. Se os dados forem válidos, inclui o novo professor e a grade listando os professores cadastrados é atualizada; caso contrário, o Sistema reporta o fato, solicita novos dados e repete a verificação. <br>

Fluxo Alternativo (3): Remoção

a)	A Secretária seleciona um professor e requisita ao Sistema que o remova. <br>
b)	Se o professor pode ser removido, o Sistema realiza a remoção; caso contrário, o Sistema reporta o fato. <br>

Fluxo Alternativo (3): Alteração

a)	A Secretária altera um ou mais dos detalhes do professor e requisita sua atualização. <br>
b)	O Sistema verifica a validade dos dados e, se eles forem válidos, altera os dados na lista de professores, caso contrário, o erro é reportado. <br>
 
Fluxo Alternativo (3): Consulta

a)	A Secretária opta por pesquisar pelo nome ou código e solicita a consulta sobre a lista de professores. <br>
b)	O Sistema apresenta uma lista professores. <br>
c)	A Secretária seleciona o professor. <br>
d)	O Sistema apresenta os detalhes do professor no formulário de professores. <br>

Pós-condições: Um professor foi inserido ou removido, seus dados foram alterados ou apresentados na tela.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. A Matrícula deve conter a identificação do funcionário responsável pelo registro, bem com os dados do aluno e turmas. Para uma disciplina podemos ter diversas turmas, mas apenas um professor responsável por ela.

#### Figura 2: Diagrama de Classes do Sistema.
 
![image](https://github.com/user-attachments/assets/abc7591a-b46f-4ea2-b8f0-c116b60eb24e)


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Aluno |	Cadastro de informações relativas aos alunos. |
| 2	| Curso |	Cadastro geral de cursos de aperfeiçoamento. |
| 3 |	Matrícula |	Cadastro de Matrículas de alunos nos cursos. |
| 4 |	Turma |	Cadastro de turmas.
| 5	|	Professor |	Cadastro geral de professores que ministram as disciplinas. |
| ... |	... |	... |
