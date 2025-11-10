# Gerenciador de Tarefas

Um sistema completo de gerenciamento de tarefas desenvolvido com React, TypeScript, Tailwind CSS e Supabase.

## 📋 Características

- 🔐 Autenticação de usuários (login/registro)
- ✅ Criar, visualizar, editar e excluir tarefas
- 📅 Definir datas e horários de vencimento
- ⏰ Indicação visual de tarefas atrasadas
- 🎨 Interface moderna e responsiva
- 🔒 Segurança com Row Level Security (RLS)

## 🚀 Como Executar a Aplicação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Supabase

### Configuração do Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Execute a migration SQL localizada em `supabase/migrations/20251109222331_create_tasks_table.sql`
4. Copie as credenciais do projeto (URL e Anon Key)

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd gerenciadorDeTarefas
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter
- `npm run typecheck` - Verifica os tipos TypeScript

## 📊 Diagrama de Caso de Uso

```mermaid
graph TB
    User((Usuário))
    
    User --> Login[Fazer Login]
    User --> Register[Criar Conta]
    User --> Logout[Fazer Logout]
    User --> CreateTask[Criar Tarefa]
    User --> ViewTasks[Visualizar Tarefas]
    User --> CompleteTask[Marcar Tarefa como Concluída]
    User --> UncompleteTask[Marcar Tarefa como Pendente]
    User --> DeleteTask[Excluir Tarefa]
    User --> SetDueDate[Definir Data de Vencimento]
    
    CreateTask --> SetDueDate
    ViewTasks --> CompleteTask
    ViewTasks --> UncompleteTask
    ViewTasks --> DeleteTask
    
    style User fill:#4f46e5,stroke:#333,stroke-width:3px,color:#fff
    style Login fill:#10b981,stroke:#333,stroke-width:2px
    style Register fill:#10b981,stroke:#333,stroke-width:2px
    style Logout fill:#ef4444,stroke:#333,stroke-width:2px
    style CreateTask fill:#3b82f6,stroke:#333,stroke-width:2px
    style ViewTasks fill:#3b82f6,stroke:#333,stroke-width:2px
    style CompleteTask fill:#3b82f6,stroke:#333,stroke-width:2px
    style UncompleteTask fill:#3b82f6,stroke:#333,stroke-width:2px
    style DeleteTask fill:#ef4444,stroke:#333,stroke-width:2px
    style SetDueDate fill:#8b5cf6,stroke:#333,stroke-width:2px
```

## 🏗️ Diagrama de Classe

```mermaid
classDiagram
    class App {
        -session: boolean | null
        +useEffect()
        +render()
    }
    
    class AuthForm {
        -isLogin: boolean
        -email: string
        -password: string
        -loading: boolean
        -error: string
        +handleSubmit(e: FormEvent)
        +render()
    }
    
    class TaskManager {
        -tasks: Task[]
        -loading: boolean
        +loadTasks()
        +handleAddTask(title: string, dueDate: string | null)
        +handleToggleTask(id: string, completed: boolean)
        +handleDeleteTask(id: string)
        +handleLogout()
        +render()
    }
    
    class TaskForm {
        -title: string
        -dueDate: string
        +handleSubmit(e: FormEvent)
        +render()
    }
    
    class TaskList {
        +tasks: Task[]
        +onToggleTask: Function
        +onDeleteTask: Function
        +render()
    }
    
    class TaskItem {
        +task: Task
        +onToggle: Function
        +onDelete: Function
        +formatDate(dateString: string | null)
        +isOverdue(dateString: string | null)
        +render()
    }
    
    class Task {
        +id: string
        +title: string
        +completed: boolean
        +due_date: string | null
        +created_at: string
        +updated_at: string
        +user_id: string
    }
    
    class SupabaseClient {
        +auth: Auth
        +from(table: string)
        +createClient(url: string, key: string)
    }
    
    App --> AuthForm: renderiza quando não autenticado
    App --> TaskManager: renderiza quando autenticado
    TaskManager --> TaskForm: contém
    TaskManager --> TaskList: contém
    TaskManager --> Task: gerencia lista de
    TaskList --> TaskItem: renderiza múltiplos
    TaskItem --> Task: exibe dados de
    TaskManager --> SupabaseClient: usa para operações
    AuthForm --> SupabaseClient: usa para autenticação
    
    note for Task "Armazenado no Supabase
    com RLS habilitado"
```

## 🗃️ Estrutura do Banco de Dados

```sql
tasks
├── id (uuid, PK)
├── title (text, NOT NULL)
├── completed (boolean, default: false)
├── due_date (timestamptz, nullable)
├── created_at (timestamptz, default: now())
├── updated_at (timestamptz, default: now())
└── user_id (uuid, FK -> auth.users)
```

## 🛡️ Segurança

O projeto implementa Row Level Security (RLS) no Supabase para garantir que:
- Usuários só podem visualizar suas próprias tarefas
- Usuários só podem criar tarefas para si mesmos
- Usuários só podem atualizar suas próprias tarefas
- Usuários só podem excluir suas próprias tarefas

## 🎨 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Supabase** - Backend as a Service (autenticação e banco de dados)
- **Lucide React** - Biblioteca de ícones
- **ESLint** - Linter para qualidade de código

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.
