# 5. PLANO DE TESTES DE SOFTWARE
   
# Relatório de Teste com Usuário

Este relatório documenta os resultados do teste de usabilidade do sistema Abraço Peludo, plataforma voltada para a adoção responsável de animais. O teste foi conduzido pela avaliadora Brenda Linhares no dia 07/06/2026 com o Participante nº 3, tendo como objetivo verificar a usabilidade do sistema e a satisfação geral do usuário.
Foram propostas seis tarefas cobrindo os principais fluxos da plataforma: cadastro, login, solicitação de adoção, cadastro de instituição e visualização de pedidos. Ao final, o participante respondeu a um questionário qualitativo. Os resultados obtidos subsidiam melhorias no design e na experiência do usuário com base em evidências reais de uso.

## Informações Gerais

| Campo | Dados |
|---|---|
| **Projeto** | Abraço Peludo |
| **Equipe** | Brenda Linhares Freitas, Bruno de Almeida Gomes Pardini, Camila Santos Gomes, Júlia Maria Coutinho Corrêa, Raíssa Barbieri Fernandes Silva e Rômulo Ruggiero |
| **Avaliador** | Brenda Linhares |
| **Data** | 07/06/2026 |
| **Participante Nº** | 3 |

---

## Proposta

A proposta deste teste é verificar o entendimento e a usabilidade do projeto desenvolvido a partir das interações de um usuário representativo do público-alvo. O teste também avalia a satisfação geral do uso pelo usuário.

---

## Questões Introdutórias

**Você já ouviu falar desse tipo de sistema?**
- [ ] Sim
- [x] Não

**Que tipo de informação você acha que poderia obter dele?**
> *(Apresentar a tela inicial ao usuário e solicitar descrição específica)*

**Para quem você acha que esse sistema foi desenvolvido?**
> Para quem gosta de animal e luta pela causa da adoção responsável.

**Quem você acha que é o responsável por esse sistema?**
> Empresa privada (ONG).

---

## Tarefas

### Tarefa 1 — Cadastro de Usuário

| Caminho | Sucesso | Observações |
|---|:---:|---|
| Tela de home → Cadastrar-se → Formulário de cadastro → Inserir dados → Aprovar termo de uso | ✅ 2 | O sistema de cadastro é simples e intuitivo. |

---

### Tarefa 2 — Login

| Caminho | Sucesso | Observações |
|---|:---:|---|
| Home → Login | ✅ 2 | O usuário não sentiu dificuldades e nem solicitou auxílio para a plataforma. |

---

### Tarefa 3 — Solicitação de Adoção

| Caminho | Sucesso | Observações |
|---|:---:|---|
| Login → Lista de animais → Perfil do pet → Quero adotar → Questionário de adoção | ✅ 2 | Não sentiu necessidade de auxílio ao completar a tarefa de solicitação de adoção. |

---

### Tarefa 4 — Cadastro de Instituição e Animal

| Caminho | Sucesso | Observações |
|---|:---:|---|
| Home → Cadastrar-se → Instituição → Inserir dados da ONG → Aprovar termos de uso → Login → Cadastrar animal | ✅ 2 | Não teve dificuldade em cadastrar um novo animal. |

---

### Tarefa 5 — Visualizar Pedidos de Adoção

| Caminho | Sucesso | Observações |
|---|:---:|---|
| Home → Login → Pedidos de adoção | ✅ 2 | Não mostrou dificuldade em acessar a tela para visualizar os pedidos de adoção. |

---

### Tarefa 6 — Detalhe de Pedido de Adoção

| Caminho | Sucesso | Observações |
|---|:---:|---|
| Home → Login → Pedidos de adoção → Visualizar pedido de adoção | ✅ 2 | Teve fácil acesso ao formulário respondido pela solicitação de adoção, além das informações do pet. |

---

## Questionário Final

**Qual foi a sua impressão geral do sistema?**
> Fácil e intuitivo.

**Qual foi a sua impressão sobre as atividades propostas?**
> Foram fáceis de concluir.

**Você acha que este sistema é atual? Por quê?**
> Sim, porque nenhum outro sistema como esse existe.

**O que você mais gostou neste sistema?**
> A facilidade em concluir todas as atividades, tanto como adotante quanto como instituição.

**O que você menos gostou neste sistema?**
> A home tem muito texto informativo, mas não garante facilidade de uso.

**Há alguma coisa que está faltando no sistema?**
> Melhorar os conteúdos da página inicial, pois há muito texto informativo e não é muito agradável.

**Se você fosse descrever este sistema para um colega em uma ou duas frases, o que diria?**
> Intuitivo.

---

## Conclusões do Avaliador

O usuário concluiu todas as atividades muito bem. Relatou questões quanto à tela inicial, considerando que, mesmo com textos informativos presentes, a home poderia ser melhorada. Nos demais fluxos, não sentiu dificuldade e concluiu todas as tarefas sem esforço ou dúvidas.

### Pontos de Atenção

- **Ponto positivo:** Fluxos de cadastro, login, adoção e gestão de animais foram considerados intuitivos e de fácil navegação.
- **Ponto de melhoria:** A página inicial (home) contém excesso de texto informativo, o que pode prejudicar a experiência do usuário.


# Avaliação Heurística

# Parecer Técnico: Avaliação Heurística

## Informações Gerais

| Campo | Dados |
|---|---|
| **Nome do Sistema** | Abraço Peludo |
| **Equipe** | Brenda Linhares Freitas, Bruno de Almeida Gomes Pardini, Camila Santos Gomes, Júlia Maria Coutinho Corrêa, Raíssa Barbieri Fernandes Silva e Rômulo Ruggiero |

> **Referência:** "10 Heurísticas de usabilidade para o design de interface do usuário" — Jakob Nielsen, 24 de abril de 1994.
> Disponível em: https://www.nngroup.com/articles/ten-usability-heuristics/

---

## Avaliação por Heurística

### 1. Visibilidade do status do sistema

> O sistema sempre deve manter os usuários informados sobre o que está acontecendo, por meio de feedback apropriado dentro de um prazo razoável.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | Nenhum problema identificado nesta heurística. O sistema apresentou feedback adequado durante as tarefas realizadas, como confirmação de cadastro e login. |
| **Sugestões** | Manter o padrão de feedback visual já implementado nos fluxos principais. |

---

### 2. Correspondência entre o sistema e o mundo real

> O sistema deve falar o idioma do usuário, com palavras, frases e conceitos familiares, em vez de termos técnicos orientados ao sistema. Siga convenções do mundo real, fazendo as informações aparecerem em ordem natural e lógica.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | Nenhum problema identificado. O usuário reconheceu facilmente o propósito do sistema e o associou a causas de adoção responsável de animais sem necessidade de explicações adicionais. |
| **Sugestões** | Manter a linguagem acessível e próxima do público-alvo (adotantes e ONGs). |

---

### 3. Controle e liberdade do usuário

> Os usuários geralmente escolhem funções por engano e precisam de uma "saída de emergência" claramente marcada para deixar estados indesejados sem passar por diálogos prolongados. O sistema deve suportar desfazer e refazer.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | Não foi relatado pelo usuário dificuldade em desfazer ações ou retornar a telas anteriores durante as tarefas realizadas. |
| **Sugestões** | Verificar se todos os formulários (especialmente o de adoção e cadastro de animal) possuem opção de cancelamento ou retorno claramente visível. |

---

### 4. Consistência e padrões

> Os usuários não devem se perguntar se palavras, situações ou ações diferentes significam a mesma coisa.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | Nenhum problema de consistência foi relatado pelo usuário durante a execução das tarefas. Os fluxos de cadastro como adotante e como instituição seguiram padrões similares, facilitando a navegação. |
| **Sugestões** | Garantir que botões de ação (ex: "Cadastrar", "Confirmar", "Enviar") mantenham nomenclatura consistente em todas as telas. |

---

### 5. Prevenção de erros

> Elimine condições propensas a erros ou apresente aos usuários uma opção de confirmação antes que eles se comprometam com a ação.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | Não foram registrados erros durante as tarefas. O usuário completou todos os fluxos sem solicitar auxílio, o que indica ausência de armadilhas de usabilidade nos caminhos testados. |
| **Sugestões** | Garantir validações nos formulários de cadastro e adoção para evitar envio de dados incompletos ou inválidos. |

---

### 6. Reconhecimento em vez de recordação

> Minimize a carga de memória do usuário, tornando objetos, ações e opções visíveis. O usuário não deve precisar lembrar informações de uma parte do diálogo para outra.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | O usuário não demonstrou dificuldade em lembrar onde estava ou o que deveria fazer em nenhuma das tarefas. |
| **Sugestões** | Manter elementos de navegação (menus, breadcrumbs ou indicadores de etapa) visíveis, especialmente em fluxos de múltiplas etapas como o questionário de adoção. |

---

### 7. Flexibilidade e eficiência de uso

> Aceleradores — invisíveis para o usuário iniciante — geralmente aceleram a interação do usuário experiente. O sistema deve atender a usuários inexperientes e experientes, permitindo adaptações de ações frequentes.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | O sistema mostrou-se acessível para o perfil do usuário testado. Não foram identificados atalhos ou funcionalidades avançadas que pudessem otimizar o uso para usuários mais experientes. |
| **Sugestões** | Considerar a implementação de filtros avançados na listagem de animais e acesso rápido a funcionalidades frequentes para usuários de ONGs (ex: gerenciar pedidos de adoção com um clique). |

---

### 8. Design estético e minimalista

> Os diálogos não devem conter informações irrelevantes ou raramente necessárias. Cada unidade extra de informação concorre com as relevantes e diminui sua visibilidade relativa.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | **Problema identificado:** O usuário apontou que a página inicial (home) contém excesso de texto informativo, o que prejudica a experiência e não garante facilidade de uso. A home foi descrita como "com muito texto informativo, mas não agradável". |
| **Sugestões** | Revisar e simplificar o conteúdo da página inicial, priorizando elementos visuais (imagens, ícones, CTAs) em detrimento de blocos extensos de texto. Adotar uma abordagem mais visual e objetiva para apresentar o sistema. |

---

### 9. Ajude os usuários a reconhecer, diagnosticar e recuperar de erros

> As mensagens de erro devem ser expressas em linguagem simples (sem códigos), indicar com precisão o problema e sugerir construtivamente uma solução.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | Nenhum erro foi disparado durante os testes, portanto não foi possível avaliar a qualidade das mensagens de erro na prática. |
| **Sugestões** | Garantir que as mensagens de erro dos formulários sejam claras, em português, e orientem o usuário sobre como corrigir o problema (ex: "O campo e-mail é obrigatório. Insira um endereço válido."). |

---

### 10. Ajuda e documentação

> Mesmo que seja melhor se o sistema puder ser usado sem documentação, pode ser necessário fornecer ajuda. Essas informações devem ser fáceis de pesquisar, focadas na tarefa do usuário e listar etapas concretas.

| Campo | Descrição |
|---|---|
| **Problemas encontrados** | O usuário não necessitou de nenhum tipo de ajuda ou documentação para concluir as tarefas, o que indica boa intuitividade do sistema. |
| **Sugestões** | Avaliar a inclusão de tooltips ou um FAQ sucinto na página inicial para auxiliar novos usuários que possam ter dúvidas sobre o funcionamento do processo de adoção. |

---

## Síntese dos Resultados

| Heurística | Status | Severidade |
|---|:---:|:---:|
| 1. Visibilidade do status do sistema | ✅ Sem problemas | — |
| 2. Correspondência com o mundo real | ✅ Sem problemas | — |
| 3. Controle e liberdade do usuário | ✅ Sem problemas | — |
| 4. Consistência e padrões | ✅ Sem problemas | — |
| 5. Prevenção de erros | ✅ Sem problemas | — |
| 6. Reconhecimento em vez de recordação | ✅ Sem problemas | — |
| 7. Flexibilidade e eficiência de uso | ⚠️ Melhoria sugerida | Baixa |
| 8. Design estético e minimalista | ❌ Problema identificado | Média |
| 9. Recuperação de erros | ⚠️ Não testado | — |
| 10. Ajuda e documentação | ✅ Sem problemas | — |

### Conclusão Geral

O sistema **Abraço Peludo** demonstrou boa usabilidade nos fluxos principais testados, com o usuário concluindo todas as seis tarefas sem dificuldades ou necessidade de auxílio. O principal ponto de atenção identificado refere-se à **Heurística 8 (Design estético e minimalista)**: a página inicial apresenta excesso de texto informativo, o que compromete a experiência do primeiro acesso. Recomenda-se uma revisão do layout da home, com foco em uma comunicação mais visual e objetiva.
