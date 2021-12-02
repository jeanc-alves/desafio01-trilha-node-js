# Cadastro de Carro

**RF**

Deve ser possivel cadastrar um novo carro.
Deve ser possivél listar todas as categorias.

**RN**

Não deve ser possivel cadastrar um carro com uma placa ja existente.

Não deve ser possivel alterar a placa de um carro já cadastrado.

O carro deve ser cadastrado por padrão com disponibilidade.

O usuario responsável pelo cadastro deve ser do perfil administrador.

# Listagem de Carros

**RF**

Deve ser possivel listar todos os carros disponiveis.

Deve ser possivel listar todos os carros disponiveis pelo nome do carro.

Deve ser possivel listar todos os carros disponiveis pelo nome da categoria.

Deve ser possivel listar todos os carros disponiveis pelo nome da marca.

**RN**

O usuário não precisa estar altenticado no sistema.

# Cadastro de Enpecificação no carro

**RF**

Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possivel listar todas as especificações de um carro.
Deve ser possivel listar todos os carros.

**RN**

Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.

Não deve ser possivel cadastrar especificação ja existente para o mesmo carro.

O usuário responsável pelo cadastro deve ser um usuario administrador.

# Cadastro de imagens do carro

Deve ser possivel cadastrar a imagem do carro.

**RFN**

Utilizar o multer para upload dos arquivos.

**RN**

O usuario deve poder cadastrar mais de uma imagem para o mesmo carro.

O usuario responsavel pelo cadastro deve ser um usuario administrador.

# Aluguel de Carro

**RF**

Deve ser possivel um cadastrar um aluguel.

**RN**

O aluguel deve ter duração minima de 24h
Não deve ser possivel cadastrar um aluguel caso já exista um aberto para o mesmo usuario.

Não deve ser possivel cadastrar um aluguel caso já exista um aberto para o mesmo carro.

**Devolução de carro**

**RF**
Deve ser possivel realizar a devolução de um carro

**RN**

Se o carro for devolvido em menos de 24 horas, devera ser cobrado a diaria completa
Ao realiazar a devolução, o carro devera ser liberado para outro aluguel
Ao realizar a devolução, o usuario deve ser libarado para fazer outro aluguel
Ao realizar a devolução, devera ser calculado o total do aluguel.
Caso o horario de devolução seja superior ao horario previsto de entrega, deve ser cobrado multa proporcional aos dias de atraso
Caso haja multa, deve ser somado o valor da multa ao total do aluguel
