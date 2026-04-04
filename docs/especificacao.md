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
- Módulo Administrativo: responsável pelo controle das informações e acompanhamento das etapas do processo de adoção.


### 3.2.2 Missão do produto
Administrar as informações referentes ao fluxo de adoção de animais, viabilizando o cadastro e a organização dos dados dos animais disponíveis, aos usuários interessados e das solicitações de adoções. O sistema também visa apoiar o acompanhamento das etapas do processo, contribuindo para o aprimoramento do controle e da disponibilidade das informações aos usuários envolvidos nos processos. 


### 3.2.3 Limites do produto
A disponibilização de “animais compatíveis para adoção’’ com base no perfil do usuário depende da veracidade e completude das informações fornecidas, não sendo possível garantir compatibilidade total entre adotante e animal nem comprovação da veracidade das informações fornecidas pelo usuário. Além disso, o sistema atua como intermediador, não se responsabilizando pelas condições de saúde, comportamento ou histórico dos animais disponibilizados. A plataforma não substitui visitas presenciais ou processos de adaptação pós-adoção. Quanto à disponibilidade de animais cadastrados, pode variar conforme a região e parcerias com ONGs, impactando a abrangência das recomendações apresentadas ao usuário.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Melhoria na divulgação dos animais disponíveis para adoção |	Essencial |
|2 | Facilidade no cadastro e gerenciamento de animais para adoção | Essencial | 
|3 | Maior segurança e integridade no armazenamento das informações | Essencial | 
|4	| Melhoria na qualidade de informações disponíveis durante o processo de adoção	| Essencial | 

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
| Atendente ONG | Usuário responsável pela comunicação entre o adotante e a ONG |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, a Secretaria ONG poderá gerenciar as informações da ONG, cadastrar novos animais no sistema e seus respectivos perfis.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

<img width="896" height="462" alt="Diagrama Casos de Uso 1" src="https://github.com/user-attachments/assets/0e75769a-2980-45bb-82dd-a522d3938c98" />
 
### 3.4.2 Descrições de Casos de Uso

#### Criar conta – Adotante (CSU01)

Sumário: O usuário realiza seu primeiro acesso ao site Abraço Peludo.

Ator primário: Usuário.

Pré-condições: O usuário deve inserir um e-mail e CPF válido.

Fluxo principal:

1) O usuário acessa a página de criação de conta.
2) O usuário registrará seu e-mail e senha nos campos fornecidos pelo programa.
3) O usuário aceita os termos de uso do Abraço Peludo, fornecendo suas informações pessoais e localização.

Fluxo alternativo:

a) O usuário acessa a página de criação de conta. <br>
b) O usuário registrará seu e-mail e senha nos campos fornecidos pelo programa. <br>
c) O usuário não aceita os termos de uso do Abraço Peludo, retornando à página inicial do site. <br>

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. Um animal deve conter a identificação do funcionário responsável pelo registro, bem com os dados da ONG associada.

#### Figura 2: Diagrama de Classes do Sistema.
 
<img width="722" height="412" alt="1" src="https://github.com/user-attachments/assets/3e831fd0-067e-4a38-becd-23c7b270f0d9" />


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	| Secretaria ONG | Cadastro de informações relativas às ONGs. |
| 2	| Atendente ONG | Comunicação entre o Adotante e a ONG. |
| 3 | Adotante | Cadastro de informações relativas aos Adotantes. |
| 4 | Animais | Cadastro de informações relativas aos Animais. |
| 5	| Candidatura Adoção | Cadastro de Candidatura Adoção iniciado por um Adotante. |
| 6	| Agendamento Visita | Cadastro de Agendamento de Visita iniciado por um Atendente. |
