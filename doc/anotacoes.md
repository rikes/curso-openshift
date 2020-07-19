Anotações:

### Capítulo 1


#### Módulos Node.js
Todas as linguagens de programação modernas dão suporte à reutilização de código por meio de bibliotecas compartilhadas, pacotes e módulos.

Os módulos são a menor unidade de código reutilizável do Node.js. O Node.js fornece vários módulos integrados. Você também pode baixar e usar módulos Node.js de terceiros.

Ao criar um aplicativo Node.js complexo, grave módulos Node.js personalizados para agrupar códigos lógicos relacionados. Seus módulos Node.js personalizados são definidos em arquivos de texto JavaScript.

#### Pacotes Node.js 
Assim como outras linguagens de programação, o Node.js oferece uma maneira de definir e gerenciar dependências de aplicativos. Uma dependência de aplicativo Node.js é chamada de pacote. Um pacote é um conjunto de um ou mais módulos Node.js, ou código do aplicativo, que você baixa de um repositório de pacotes Node.js.

As dependências de aplicativos são definidas no arquivo packages.json, localizado na raiz da pasta do projeto Node.js

#### Gerenciador de pacotes do nó
O Gerenciador de pacotes do nó (NPM) é uma ferramenta de linha de comando usada para criar, instalar e publicar pacotes Node.js. Para a maioria dos sistemas operacionais, o comando npm (Gerenciador de pacotes do nó, na sigla em inglês) é instalado como parte do processo de instalação do Node.js.

Para instalar as dependências de um aplicativo Node.js, use o comando de npm install.

Para inicializar um diretório vazio como um projeto Node.js, use o comando npm init para criar um arquivo packages.json para um novo aplicativo Node.js.

Para gerenciar o ciclo de vida do aplicativo, use o comando npm a fim de iniciar, parar ou reiniciar o aplicativo.

#### Estrutura Express de aplicativo web
Express é uma estrutura comum do Node.js que visa simplificar a criação de serviços web. Como Express é um pacote do Node.js, use o comando npm install para instalar o Express:

```
$> express /path/to/project/folder/myapp
```

O comando cria a pasta myapp que contém um arquivo packages.json:

```javascript
{
  "name": "myapp",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1"
  }
}
```

O código-fonte do módulo app está no arquivo app.js, localizado na raiz do diretório do projeto myapp. O arquivo app.js contém a lógica primária do aplicativo.

A variável app faz referência a uma instância de um aplicativo Express. O aplicativo está configurado para escutar solicitações na porta 8080. Quando você acessa o ponto de extremidade do aplicativo, o aplicativo envia a resposta: Hello, World!.

### Capítulo 2

#### Arquitetura de aplicativo
Várias equipes de desenvolvimento ou clientes costumam compartilhar a mesma plataforma OpenShift. Para obter segurança e isolamento entre projetos e clientes, o OpenShift compila e executa os aplicativos em containers isolados.

Um contêiner é uma forma de empacotar um aplicativo com todas as suas dependências, como ambientes de tempo de execução e bibliotecas.


O diagrama anterior mostra um contêiner de um aplicativo Node.js. O contêiner agrupa o tempo de execução de Node.js, os pacotes Node.js exigidos pelo aplicativo e o próprio código de aplicativo.

Para gerenciar os aplicativos em contêineres, o OpenShift adiciona uma camada de abstração conhecida como pod.

Pods são a unidade básica de trabalho do OpenShift. Um pod encapsula um contêiner e outros parâmetros, como um endereço IP exclusivo ou um armazenamento. Um pod também pode agrupar vários contêineres relacionados que compartilham recursos.

