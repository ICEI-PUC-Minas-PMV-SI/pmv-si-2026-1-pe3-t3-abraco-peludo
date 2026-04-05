# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

Este documento de Especificações de Requisitos de Software tem como objetivo detalhar as funcionalidades, requisitos e limitações do sistema, servindo como guia para todos os envolvidos no desenvolvimento. Seu propósito é descrever de forma clara e estruturada, os requisitos funcionais e não funcionais da plataforma, garantindo o alinhamento entre as necessidades dos usuários e das soluções a serem implantadas. 

Além disso, este documento busca auxiliar a compreensão do sistema a partir das necessidades identificadas no contexto do problema, contribuindo para a definição de uma solução coerente. Através da aplicação de técnicas como análise de requisitos, busca-se estruturar as informações necessárias para o desenvolvimento do sistema, alinhando as necessidades dos usuários e os objetivos do projeto. 


## 3.1 Objetivos deste documento
Descrever e especificar em detalhes, as principais características da proposta de criação de um domínio on-line facilitador/intermediador de processos de adoção e doação responsável de animais domésticos, trazida pelo Grupo 1 da Turma 3 - Eixo 3 SI-PUC Minas Virtual.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será nomeado Abraço Peludo. O sistema será constituído por módulos responsáveis pelo gerenciamento das informações relacionadas ao processo de adoção, contemplando as funcionalidades essenciais para cadastro, visualização e acompanhamento de dados.

Os principais componentes do sistema incluem: 
- Módulo Usuários : responsável pelo cadastro, autenticação e gerenciamento de perfis de adotantes e administradores (ONGs/protetores);
- Módulo de Animais: responsável pelo cadastro, edição, visualização e gerenciamento das informações dos animais disponíveis para adoção;
- Módulo de Adoção: responsável pelo registro, acompanhamento e gerenciamento das solicitações de adoção realizadas pelos usuários;
- Módulo Administrativo: responsável pelo controle das informações e acompanhamento das etapas do processo de adoção.


### 3.2.2 Missão do produto
Administrar as informações referentes ao fluxo de adoção de animais, viabilizando o cadastro e a organização dos dados dos animais disponíveis, aos usuários interessados e das solicitações de adoções. O sistema também visa apoiar o acompanhamento das etapas do processo, contribuindo para o aprimoramento do controle e da disponibilidade das informações aos usuários envolvidos nos processos. 


### 3.2.3 Limites do produto
A efetividade das informações disponibilizadas depende da veracidade e completude dos dados fornecidos pelos usuários, não sendo possível garantir a comprovação da veracidade dessas informações. Além disso, o sistema atua como intermediador, não se responsabilizando pelas condições de saúde, comportamento ou histórico dos animais disponibilizados. A plataforma não substitui visitas presenciais ou processos de adaptação pós-adoção. Quanto à disponibilidade de animais cadastrados, pode variar conforme a região e parcerias com ONGs, impactando a abrangência das recomendações apresentadas ao usuário.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Melhoria na divulgação dos animais disponíveis para adoção |	Essencial |
|2 | Facilidade no cadastro e gerenciamento de animais para adoção | Essencial | 
|3 | Organização e controle no cadastro de adotantes | Essencial | 
|4 | Maior segurança e integridade no armazenamento das informações | Essencial | 
|5	| Melhoria na qualidade de informações disponíveis durante o processo de adoção	| Essencial | 

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
| RF19 | Exibir Checklist "Primeiros Passos" | O sistema deve exibir uma lista automática de itens necessários (ex: ração, tamanho da guia, marca da areia) assim que a adoção for aprovada, para que o novo dono se prepare antes do pet chegar |
| RF20 | Identificador | O sistema deve: Identificar com um selo destacado os animais que possuem deficiências ou doenças crônicas |
| RF21 | Cadastrar Selo | O sistema deve permitir aos responsáveis da ONG cadastrarem selos que destacam os animais que possuem deficiências ou doenças crônicas |
| RF22 | Enviar Questionário Adoção | O sistema deve permitir aos responsáveis da ONG enviarem um questionário para aprovação, ou reprovação, da adoção para os adotantes que já escolheram um pet no site |
| RF23 | Candidatar para Adoção | O sistema deve permitir ao adotante se candidatar para adotar um pet ao clicar no botão oficial de "Adotar" |

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
Como observado no diagrama de casos de uso da Figura 1, a Secretaria ONG poderá gerenciar as informações da ONG, cadastrar novos animais no sistema e seus respectivos perfis.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

<img width="657" height="261" alt="Abraço Peludo - Casos de Uso drawio" src="https://github.com/user-attachments/assets/6c8c9c7b-8bd9-4de0-9e4b-b6a4c21ab1a7" />

### 3.4.2 Descrições de Casos de Uso

#### Criar conta – Adotante (CSU01)

**Sumário:** O usuário realiza seu primeiro acesso ao site Abraço Peludo. <br>
**Ator primário:** Usuário. <br>
**Pré-condições:** O usuário deve inserir um e-mail e CPF válido. <br>

<ins>Fluxo principal:</ins>

1) O usuário acessa a página de criação de conta.
2) O usuário registrará seu e-mail e senha nos campos fornecidos pelo programa.
3) O usuário aceita os termos de uso do Abraço Peludo, fornecendo suas informações pessoais e localização.

<ins>Fluxo alternativo:</ins>

a) O usuário acessa a página de criação de conta. <br>
b) O usuário registrará seu e-mail e senha nos campos fornecidos pelo programa. <br>
c) O usuário não aceita os termos de uso do Abraço Peludo, retornando à página inicial do site. <br>

#### Gerenciar Animais - ONG (CSU01)

**Sumário:** A ONG realiza a gestão (inclusão, remoção, alteração e consulta) dos dados dos animais disponíveis para adoção. <br>
**Ator Primário:** ONG / Protetor <br>
**Ator Secundário:** Não tem <br>

**Pré-condições:** A ONG deve estar cadastrada no sistema.

<ins>Fluxo Principal:</ins>

1) A ONG requisita a manutenção dos animais cadastrados.
2) O sistema apresenta as operações disponíveis: inclusão, alteração, exclusão e consulta de animais.
3) A ONG seleciona a operação desejada (inclusão, remoção, alteração ou consulta) ou opta por finalizar o caso de uso.
4) Caso a ONG deseje continuar gerenciando os animais, **o fluxo retorna ao passo 3**; caso contrário, o caso de uso é **encerrado**.

<ins>Fluxo Alternativo (3): Inclusão</ins>

a) A ONG solicita a inclusão de um novo animal. <br>
b) O sistema apresenta um formulário para cadastro do animal. <br>
c) A ONG preenche os dados solicitados (nome, idade, porte, descrição, status, entre outros). <br>
d) O sistema valida os dados informados (dados obrigatórios). <br>
e) Se os dados forem válidos, o sistema realiza o cadastro do animal e atualiza a lista de animais disponíveis; caso contrário, o sistema informa o erro e solicita a correção dos dados. <br>

<ins>Fluxo Alternativo (3): Remoção</ins>

a) A ONG seleciona um animal cadastrado e solicita sua remoção. <br>
b) O sistema verifica se o animal está vinculado a algum processo de adoção em andamento. <br>
c) Se o animal não estiver vinculado a nenhum processo ativo, o sistema realiza a exclusão; caso contrário, informa a impossibilidade da ação devido à existência de processo de adoção em aberto. <br>

<ins>Fluxo Alternativo (3): Alteração</ins>

a) A ONG seleciona um animal e altera um ou mais de seus dados. <br>
b) A ONG solicita a atualização das informações. <br>
c) O sistema valida os dados informados. <br>
d) Se válidos, o sistema atualiza as informações do animal; caso contrário, informa o erro e solicita correção. <br>

<ins>Fluxo Alternativo (3): Consulta</ins>

a) A ONG solicita a visualização dos animais cadastrados. <br>
b) O sistema apresenta a lista de animais. <br>
c) A ONG seleciona um animal. <br>
d) O sistema exibe os detalhes do animal. <br>

#### Gerenciar Solicitações de Adoção - ONG (CSU02)

**Sumário:** A ONG realiza a gestão das solicitações de adoção, podendo visualizar, analisar e definir o status das solicitações. <br>
**Ator Primário:** ONG / Protetor <br>
**Pré-condição:** ONG autenticada no sistema <br>

<ins>Fluxo Principal:</ins>

1) A ONG solicita o acesso às solicitações de adoção.
2) O sistema apresenta a lista de solicitações recebidas.
3) A ONG seleciona uma solicitação.
4) O sistema exibe os detalhes do adotante e do animal.
5) A ONG pode realizar etapas de avaliação do adotante, como contato ou visita.
6) Após a avaliação, a ONG decide pela aprovação ou rejeição da solicitação.
7) O sistema registra a decisão e atualiza o status da solicitação.
	
<ins>Fluxos Alternativos:</ins>

(5) Aprovação \
	- O sistema atualiza o status para “aprovado”. \
	- O animal pode ter status alterado (ex: “em processo” ou “adotado”).

(5) Rejeição \
	- O sistema atualiza o status para “rejeitado”.


### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. Um animal deve conter a identificação do funcionário responsável pelo registro, bem com os dados da ONG associada.

#### Figura 2: Diagrama de Classes do Sistema.
 
<img width="722" height="412" alt="Diagrama de Classes" src="https://github.com/user-attachments/assets/13d774a6-32c1-4a4a-a1f8-f508a4a24ec3" />


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	| Secretaria ONG | Cadastro de informações relativas às ONGs. |
| 2 | Adotante | Cadastro de informações relativas aos Adotantes. |
| 3 | Animais | Cadastro de informações relativas aos Animais. |
| 4	| Candidatura Adoção | Cadastro de Candidatura Adoção iniciado por um Adotante. |
| 5	| Agendamento Visita | Cadastro de Agendamento de Visita iniciado pela ONG. |
