# Gramatica da Linguagem

# Exemplo da linguagem
    function main begin
      int i = 5
      float f = 1.2
      string s = 'teste'

      if i > f and a > b begin
        s = 'terminou'
      else begin
        s = 'legal'
      end

      if f > i and i == 0 or 1 begin
        f = 34
      else if i > f begin
        i = 20
      else begin
        i = 10
      end

      while s == "teste" begin
        s = '20'
      end

      for n = 0 until n < 10 asc begin
        s = '10'
        s = '20'
      end
    end
# Informações gerais
- A linguagem será case-sensitive, ou seja, existe uma diferença entre VARIÁVEL e variável.
- O ponto de entrada do código-fonte será uma função denominada por main.
- Um ID pode ser qualquer palavra que não seja uma reservada pela linguagem.
- Para realizar um comentário deve ser utilizado o símbolo **#**. Não possui comentário de mais de uma linha.
- Os símbolos reservados da linguagem são: **int**, **float**, **string**, **if**, **while, begin,** **end**, **for**, **else**, **and**, **or**, **not**, **function**.
- A linguagem não possui um forma explica para abrir e fechar um conjunto de instruções, por esse motivo tudo será feito utilizando novas linhas no código-fonte e por fim utilizado a palavra reservada **end** para indicar o fim das instruções de um bloco de código-fonte. Assim como também vale para a declaração de variáveis: a cada nova linha, uma nova instrução.
- Os operadores aceitos pela linguagem são:
  - **Adição**: a + b
  - **Subtração**: a - b
  - **Multiplicação**: a * b
  - **Divisão**: a / b
  - **Incremento (pós)**: a++
  - **Incremento (pré)**: ++a
  - **Decremento (pós)**: a--
  - **Decremento (pré)**: --a
  - **Módulo**: a % b
  - **Menor**: a < b
  - **Maior**: a > b
  - **Maior ou igual**: a >= b
  - **Menor ou igual**: a <= b
  - **Igual**: a == b
  - **Diferente**: a != b
  - **Negação**: not a
  - ***E*** **lógico**: a and b
  - ***Ou*** **lógico**: a or b
# Gramática
- a-z, A-Z, 0-9: qualquer número ou letra.
- **Letter** → ((a-z)* | (A-Z)*)+
- **Digit** → (0-9)+
## Token → Lexema
| **Token**   | **Lexeme**                     | **Description**        |
| ----------- | ------------------------------ | ---------------------- |
| <IF, >      | if                             |                        |
| <ELSE, >    | else                           |                        |
| <ROP, >     | <, <=, ==, >=, >               | Relational Operator    |
| <LOP, >     | and, or                        | Logical Operator       |
| <EOP, >     | ==, !=                         | Equality Operator      |
| <NOP, >     | not                            | Not Operator           |
| <ATOP, >    | =, +=, -=, *=, /=              | Attribution Operator   |
| <UOP, >     | ++, --                         | Unary Operator         |
| <AROP, >    | +, -, /, %, *                  | Arithmetic Operator    |
| <STRING, >  | (‘, ”)(letter, digit)*(‘, ”)   |                        |
| <BOOL, >    | true, false                    | Boolean                |
| <ID, >      | ($, _, letter)(letter, digit)* | Variable name          |
| <NUMBER, >  | (+, -)?digit+(.digit+)?        |                        |
| <TYPE, >    | bool, float, int, string       |                        |
| <INC, >     | ++                             |                        |
| <DEC, >     | --                             |                        |
| <FOR, >     | for                            | Loop for               |
| <WHILE, >   | while                          | Loop while             |
| <FUNC, >    | function                       | Function declaration   |
| <END, >     | end                            | End of an operatioan   |
| <BEGIN, >   | begin                          | Begin of an operatioan |
| <UNTIL, >   | until                          |                        |
| <PLUS, >    | desc                           |                        |
| <MINUS, >   | asc                            |                        |
| <COMMENT, > | #                              | Comment                |
| <TEXT, >    | (letter, digit)*               | Text                   |

## BNF

**[main]** → FUNC main BEGIN [commands] END

**[commands] →** [command] [commands] | [command]

**[command] →** [attribution_command] | [declaration_command] | [loop_command] | [selection_command]

**[attribution_command] →** ID ATOP [arithmetic_command]

**[declaration_command] →** TYPE ID = TERM

**[loop_command] →** FOR ID | FOR ID UNTIL [expression] [arithmetic_expression][for_behaviour_operator] BEGIN | WHILE [expression] BEGIN [commands]? END

**[for_behaviour_operator]** → PLUS | MINUS

**[selection_command] →** IF [expression] BEGIN [commands] END | IF [expression] BEGIN [commands] | [selection_else_command] END

**[selection_else_command] →** ELSE BEGIN [commands]

**[expression] →** [logical_expression]

**[logical_expression] →** [relational_expression] | [relational_expression] LOP [relational_expression]

**[relational_expression] →** [arithmetic_expression] | [arithmetic_expression] ROP [relational_expression] | [relational_expression] ROP [arithmetic_expression]

**[arithmetic_expression] →** [unary_expression] | [unary_expression] AROP [arithmetic_expression] | [arithmetic_expression] AROP [unary_expression]

**[unary_expression] →** [term] | ID UOP

**[term] →** ID | NUMBER | STRING

## First
- **[main]:** <FUNC>
- **[commands]:** <<vazio>, ID, TYPE, IF, FOR, WHILE>
- **[command]:** <ID, TYPE, IF, FOR, WHILE>
- **[attribution_command]:** <ID>
- **[declaration_command]:** <TYPE>
- **[loop_command]:** <FOR, WHILE>
- **[selection_command]:** <IF>
- **[expression]:** <ID>
- **[logical_expression]:** <ID, NUMBER, STRING>
- **[relational_expression]:** <ID, NUMBER, STRING>
- **[arithmetic_expression]:** <ID, NUMBER, STRING>
- **[unary_expression]:** <ID, NUMBER, STRING>
- **[term]:** <ID, NUMBER, STRING>
## Follow
- **[main]:** <$>
- **[commands]:** <END>
- **[command]:** <END, <vazio>, ID, TYPE, IF, FOR, WHILE>
- **[attribution_command]:** <END, ID, TYPE, IF, FOR, WHILE>
- **[declaration_command]:** <END, ID, TYPE, IF, FOR, WHILE>
- **[loop_command]:** <END, ID, TYPE, IF, FOR, WHILE>
- **[selection_command]:** <END, ID, TYPE, IF, FOR, WHILE>
- **[expression]:** <BEGIN>
- **[logical_expression]:** <BEGIN, LOP, ROP, EOP, NOP, ATOP, UOP, AROP>
- **[relational_expression]:** <BEGIN, LOP, ROP, EOP, NOP, ATOP, UOP, AROP>
- **[arithmetic_expression]:** <BEGIN, LOP, ROP, EOP, NOP, ATOP, UOP, AROP>
- **[unary_expression]:** <BEGIN, LOP, ROP, EOP, NOP, ATOP, UOP, AROP>
- **[term]:** <BEGIN, LOP, ROP, EOP, NOP, ATOP, UOP, AROP>
