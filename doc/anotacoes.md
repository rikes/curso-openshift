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

![alt text](https://github.com/rikes/curso-openshift/blob/master/doc/img/deploy-pod.svg "Container")

![alt text](https://github.com/rikes/curso-openshift/blob/master/doc/img/deploy-arch.png "Arquitetura")

O diagrama anterior mostra um contêiner de um aplicativo Node.js. O contêiner agrupa o tempo de execução de Node.js, os pacotes Node.js exigidos pelo aplicativo e o próprio código de aplicativo.

Para gerenciar os aplicativos em contêineres, o OpenShift adiciona uma camada de abstração conhecida como pod.

Pods são a unidade básica de trabalho do OpenShift. Um pod encapsula um contêiner e outros parâmetros, como um endereço IP exclusivo ou um armazenamento. Um pod também pode agrupar vários contêineres relacionados que compartilham recursos.

### Capítulo 3. Configuração de compilações do aplicativo no OpenShift

O OpenShift oferece muitas maneiras diferentes de criar uma imagem de contêiner. O método mais comum é chamado de Source to Image (S2I). Em uma compilação S2I, o código-fonte do aplicativo é combinado com uma imagem do construtor S2I, que é uma imagem de contêiner que contém as ferramentas, as bibliotecas e as estruturas necessárias para executar o aplicativo.

Por exemplo, para executar aplicativos Node.js no OpenShift, você usará uma imagem do construtor S2I do Node.js. A imagem do construtor S2I do Node.js é uma imagem de contêiner configurada com tempo de execução do Node.js, ferramentas de gerenciamento de pacotes (NPM) e outras bibliotecas necessárias para execução de aplicativos Node.js.

O OpenShift pode detectar automaticamente o tipo de aplicativo e escolher uma imagem apropriada do construtor S2I para compilar a imagem final de contêiner do aplicativo.

Por exemplo, se a raiz da árvore de código-fonte do aplicativo contiver o arquivo package.json, o OpenShift selecionará automaticamente a imagem mais recente do construtor S2I do Node.js para a compilação. Se desejar, você pode substituir a seleção padrão e escolher sua própria imagem do construtor S2I para o processo de compilação.

#### Acionamento manual de compilações

Depois que um aplicativo for implantado no OpenShift, o OpenShift poderá recompilar e reimplantar uma nova imagem de contêiner sempre que o código-fonte do aplicativo for modificado. Use o cliente da linha de comando **oc** ou o **console da web** do OpenShift para acionar uma nova compilação do aplicativo atualizado *manualmente*.

#### Compilações automáticas usando webhooks

Um webhook é um mecanismo para se inscrever em eventos de um sistema de gerenciamento de código-fonte, como o GitHub. O OpenShift gera URLs de webhook exclusivas para os aplicativos criados a partir de fontes armazenadas em repositórios Git. Os webhooks são configurados em um repositório Git. Com base na configuração do webhook, **o GitHub enviará uma solicitação HTTP POST para a URL do webhook**, com detalhes que incluem as informações de commit mais recentes.

**A API REST do OpenShift escuta notificações de webhook nesta URL e aciona automaticamente uma nova compilação**. Você deve configurar seu webhook para apontar para essa URL exclusiva.

#### Comandos OpenShift cli oc

Efetuar login no OpenSfhit, com url, username e Password:
`oc login https://api.cluster.domain.example.com:6443`

Criar um novo projeto:
`oc new-project your-name-project`

Implante um novo aplicativo, referenciando o projeto anterior:
`oc new-app --name your-name-app https://github.com/rikes/curso-openshift.git#update-app --context-dir express-helloworld`
Onde *new-app* é comando para criar um novo app definindo o nome através do comando *--name*. Informamos a URL do repósitorio bem como a branch, por fim o comando *--context-dir* indicará a pasta onde se encontra o projeto (se estiver na raiz do projeto o comando é desnecessário).

Verificar compilações em execução:
`oc get pods`

Obter todo o log de um pod
`oc logs -f name-pod`


##### Teste o app criado através da cli oc

Os passos anteriores permitiram a publicação e compilação do projeto, porém a rota ainda não existe, ficando inacessível o acesso através da url. Este paso visa expor a rota para internet

Verifique os serviços (app) disponiveis em seu workspace(projeto) 
`oc get svc`

Exponha o projeto:
`oc expose svc/your-name-app`

Verifique detalhes da rota:
`oc get routes`


