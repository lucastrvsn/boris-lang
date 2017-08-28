# Exemplo da linguagem
```python
    import print from system
    
    function main
      int i = 5
      float f = 1.2
      string s = "teste"
      
      if i > f and a > b
        print "Hello world!"
      else
        print "No hello world for you, sorry."
      end
      
      if f > i and i == 0 or 1
        print "Ok."
      else if i > f
        print "Ok 2."
      else
        print "Ok 3."
      end
      
      while s == "teste"
        print "Hello world again..."
        s = "teste2"
      end
      
      for n until == 0 +
        print "Hello " + n
      end
    end
```
    
# Informações gerais
- A linguagem será case-sensitive, ou seja, existe uma diferença entre VARIÁVEL e variável.
- O ponto de entrada do código-fonte será uma função denominada por main.
- Um ID pode começar por uma letra ou pelos símbolos **$** e **_**, mas nunca por um número.
- Para realizar um comentário deve ser utilizado o símbolo **#**.
- Os símbolos reservados da linguagem são: **int**, **float**, **string**, **if**, **while**, **end**, **for**, **else**, **and**, **or**, **not**, **function**.
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
| **Token**   | **Lexeme**                        | **Description**                 |
| ----------- | --------------------------------- | ------------------------------- |
| <IF, >      | if                                |                                 |
| <ELSE, >    | else                              |                                 |
| <ROP, >     | < | <= | == | >= | >              | Relational Operator             |
| <LOP, >     | and | or                          | Logical Operator                |
| <EOP, >     | == | !=                           | Equality Operator               |
| <NOP, >     | not                               | Not Operator                    |
| <ATOP, >    | = | += | -= | *= | /=             | Attribution Operator            |
| <UOP, >     | ++ | --                           | Unary Operator                  |
| <AROP, >    | + | - | / | % | *                 | Arithmetic Operator             |
| <STRING, >  | (‘ | ”)(letter | digit)*(‘ | ”)   |                                 |
| <BOOL, >    | true | false                      | Boolean                         |
| <ID, >      | ($ | _ | letter)(letter | digit)* | Variable name                   |
| <NUMBER, >  | (+ | -)?digit+(.digit+)?          |                                 |
| <TYPE, >    | bool | float | int | string       |                                 |
| <COMMA, >   | ,                                 | Comma                           |
| <OPAREN, >  | (                                 | Open Parentheses                |
| <CPAREN, >  | )                                 | Close Parentheses               |
| <INC, >     | ++                                |                                 |
| <DEC, >     | --                                |                                 |
| <FOR, >     | for                               | Loop for                        |
| <WHILE, >   | while                             | Loop while                      |
| <FUNC, >    | function                          | Function declaration            |
| <END, >     | end                               | End of an operatioan            |
| <IN, >      | in                                |                                 |
| <UNTIL, >   | until                             |                                 |
| <PLUS, >    | +                                 |                                 |
| <MINUS, >   | -                                 |                                 |
| <COMMENT, > | #                                 | Comment                         |
| <TEXT, >    | (letter | digit)*                 | Text                            |
| <NL, >      | \n                                | New Line (and end of a command) |

**[commands] →** [command] [commands] | [command]

**[command] →** [attribution_command] | [declaration_command] | [loop_command] | [selection_command]

**[attribution_command] →** ID ATOP [arithmetic_command] NL

**[declaration_command] →** TYPE ID NL

**[loop_command] →** FOR ID | FOR ID UNTIL [expression] [arithmetic_expression][for_behaviour_operator] NL | WHILE [expression] NL [commands]? END

**[for_behaviour_operator]** → PLUS | MINUS

**[selection_command] →** IF [expression] NL [commands] END | IF [expression] NL [commands]                                             [selection_else_command] END

**[selection_else_command] →** ELSE NL [commands]

**[expression] →** [logical_expression]

**[logical_expression] →** [relational_expression] | [relational_expression] LOP [relational_expression]

**[relational_expression] →** [arithmetic_expression] | [arithmetic_expression] ROP [relational_expression] | [relational_expression] ROP [arithmetic_expression]

**[arithmetic_expression] →** [unary_expression] | [unary_expression] AROP [arithmetic_expression] | [arithmetic_expression] AROP [unary_expression]

**[unary_expression] →** [term] | ID UOP

**[term] →** ID | NUMBER | STRING
