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

Verifique detalhes da rota (inclusive a url de acesso):
`oc get routes`


##### Automatizando o deploy

Todo o commit realizado pelo projeto no repositório requer um novo build no openshift, por padrão o build é manual. Mas é possível criar *webhooks* no intuito do repositório (gitHub) enviar uma mensagem ao openshift para realização do build, assim a compilação será automática por commit.

Vá no seu repósitorio, *Settings* em seguida escolha *Webhooks*. Volte ao openShift na aba *builds*, selecione o projeto e copia a url do webwook do github ao fim da página em *Overview*.

Adicione a url nas configurações do gitHub e altere *Content type* para application/json.. O GitHub envia um ping de teste à URL de carga para confirmar a disponibilidade e exibe uma marca de seleção verde para o webhook, em caso de êxito (não é necessário senha/secret).

Faça uma alteração no projeto e realize um no push. Assim que finalizado o processo de build inciará:
Confira em: Builds -> your-app -> Builds;
ou `oc get pods`;

Assim que finalizado acessa a url para ver a atualização.

obs.: Para obter os logs do App, vá ao openshift em:
Topology -> your-app -> View Logs;



#### Externalização da configuração de aplicativos no OpenShift

Os aplicativos nativos de nuvem armazenam a configuração de aplicativos como variáveis de ambiente em vez de codificar os valores da configuração diretamente no código-fonte dos aplicativos. A vantagem dessa abordagem é que ela cria uma separação entre a configuração do aplicativo e o ambiente no qual ele está sendo executado. A configuração normalmente varia de um ambiente para outro, mas o código-fonte não varia. Também chamado de **sistemas agnósticos** em algumas organizações.

Por exemplo, digamos que você deseje promover um aplicativo do ambiente de desenvolvimento para o ambiente de produção com estágios intermediários como testes e aceitação do usuário. O código-fonte permanece o mesmo, mas os detalhes de configuração específicos para cada ambiente, como os detalhes de conexão para um banco de dados fora da produção, não devem ser estáticos e precisam ser gerenciados separadamente.

##### Configuração de aplicativos usando secrets e maps
O Red Hat OpenShift Container Platform oferece os recursos *Secret* e *Configuration Map* para externalizar a configuração de um aplicativo.

Os *secrets* são usados para armazenar informações confidenciais, como senhas, credenciais de banco de dados e qualquer outro dado que não deva ser armazenado em texto não criptografado.

Os mapas de configuração, também chamados de *config maps*, são usados para armazenar dados de configuração de aplicativos não confidenciais em texto não criptografado.

Você pode armazenar dados em segredos e mapas de configuração como pares de chave-valor ou pode armazenar um arquivo inteiro (por exemplo, arquivos de configuração) no segredo. Os dados secretos são codificados usando base64 e armazenados em disco, enquanto os mapas de configuração são armazenados como texto simples. Isso fornece uma camada adicional de segurança aos segredos para garantir que os dados confidenciais não sejam armazenados em texto não criptografado que os seres humanos possam ler.

Exemplo de definição de **config map** em YAML (.yml):

```yml
apiVersion: v1
data:
    username: myuser
    password: mypass
kind: ConfigMap
metadata:
    name: myconf
```

*Data*: Dados armazenados no mapa de configuração.
*Kind*: Tipo de recurso do OpenShift (*config map*);
*Metadata*: Nome do *config map*;

Exemplo de definição de um secret em YAML(.yml):

```yml
apiVersion: v1
data:
    username: cm9vdAo= 1
    password: c2VjcmV0Cg== 2
kind: Secret
metadata:
    name: mysecret
    type: Opaque
```
*Data*: Dados armazenados no *secret* em formato codificado usando base64
*Kind*:Tipo de recurso do OpenShift (*secret*)
*Metadata* -> *name*: Nome da *secret*

Observe que os dados da secret (username e password) são codificados no formato base64 e não são armazenados em texto simples como os dados do config map.

Depois de criar as secrets e maps config, você deve associar os recursos aos aplicativos fazendo referência a eles na configuração de implantação de cada aplicativo.

A imagem a segui demonstra a utilização do config maps e secrets em diferentes ambientes de desenvolvimento no OpenSfhit.

![alt text](https://github.com/rikes/curso-openshift/blob/master/doc/img/ConfigMaps-and-Secrets.png "Uso do config maps e secrets pelo Openshift")

Fluxo:
1. Crie mapas de configuração e segredos usando o console da web do OpenShift ou o cliente de linha de comando do OpenShift (oc). Você pode armazenar pares de chave-valor ou um arquivo inteiro.

2. Depois de editar a configuração de implantação do aplicativo e mapear as variáveis de ambiente para usar os segredos e mapas de configuração configurados no projeto, o OpenShift insere os segredos e os mapas de configuração nos pods do aplicativo.

3. O aplicativo acessa os valores durante o tempo de execução usando pesquisas com base na chave. O OpenShift converte os dados codificados em base64 para um formato que o aplicativo consiga le

https://docs.openshift.com/container-platform/4.2/nodes/pods/nodes-pods-secrets.html


##### Configuração de secrets do aplicativo 

Neste exercício, será implmentado um aplicativo Node.js que use config maps e secrets no Red Hat OpenShift Container Platform.

Crie uma conta no site https://openweathermap.org/. Após ativa-la espere 10 minutos e obtenha uma chave da API na aba "API Keys", utilizando o navegador e sua chave teste API através do link abaixo e verifique se retorna um JSON:
http://api.openweathermap.org/data/2.5/weather?q=London&appid=your-api_key

Obtendo o código da aplicação, que é open-source e em Node.js, foi disponibilizado pelo curso.

Que possui um método GET e outro POST, no arquivo *weather/routes/index.js*.

O método POST, requer, além da cidade e métrica (Celsius) ou Imperial (Fahrenheit), a chave da API conforme trecho do código abaixo:

```javascript
...output omitted..
const OWM_API_KEY = process.env.OWM_API_KEY || 'invalid_key';
...output omitted...
router.post('/get_weather', async function (req,res) {
  let city = req.body.city;
  let url = http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${UNITS}&appid=${OWM_API_KEY};
```
Uma das tarefas deste capítulo é informar o sistema métrico e a chave da API através dos arquivos de configuração dependendo do ambiente. 

###### Adicionando secrets e config maps no OpenShift

Crie um novo projeto (*Projects -> New*), em seguinda vá a menu *Advanced -> Search* e selecione um serviço Secret. Para criar uma nova secret clique em *Create → Key/Value Secret*, conforme imagem abaixo:

![alt text](https://github.com/rikes/curso-openshift/blob/master/doc/img/select-secret.png "Criando um novo secret no Openshift")

Na página Create Key/Value Secret, insira *owm-api-secret* no campo Secret Name e *OWM_API_KEY* no campo Key e copie a chave de API padrão gerada para sua conta da API OpenWeatherMap no campo Value.

Agora, crie um config map para armazenar a métrica do tempo para o app. Clique em *Advanced → Search* e procure por procure configmap. Selecione a opção ConfigMap e clique em *Create*.
A página vai exibir um arquivo YAML com valores pre-definidos, exclua os atuais dados e substitua pelo seguinte código:

```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: weather-config
  namespace: youruser-weather
data:
  UNITS: metric
```
```
Certifique-se de manter o recuo correto conforme mostrado no trecho. Os arquivos YAML diferenciam a distância do recuo.
```
###### Inicie a publicação do App no OpenShift

Adicione um aplicativo ao projeto Weather, em: *+ADD -> From Catalog -> Node.js -> Create*.
Insera as infomrações conforme demonstrado abaixo e clique em *Deployment Configuration* para isnerir os config maps e secrets:

![alt text](https://github.com/rikes/curso-openshift/blob/master/doc/img/config-app-arq-externo.png "Criando um novo app do projeto no Openshift")

Em seguida preencha as informações referente aos arquivos YAML, certificando que fique igual a imagem abaixo:
Obs.: Caso fique uma value em branco remova ela.

![alt text](https://github.com/rikes/curso-openshift/blob/master/doc/img/deployment-config.png "Editando as configurações do deployment da App no Openshift")

Após criar o app, sua compilação será executada e a app disponibilizada no pod. Verifique se ocorreu tudo corretamente, através dos logs e/ou menu Topology. Abra a URL e insira o nome de uma cidade (sem acentos) e clica em buscar, será retornado dados da temperatura da cidade.

Para mudar informações no config map, clique em *Advanced → Search*, em seguida selecione *Service* para expandir o menu e procure *configmap*. Em seguida, selecione *ConfigMap*. Clique nos três pontos à direita de *weather-config* e clique em *Edit Config Map*.
Altere o valor do sistema métrico:

```yml
data:
  UNITS: imperial
```

Reimplante o App no menu *Topology -> your-app -> Actions -> Start Rollout*, conforme imagem abaixo:

![alt text](https://github.com/rikes/curso-openshift/blob/master/doc/img/reimplantar-app.png "Reimplantando App")

Teste novamente, perceba que os dados são exibidos em F*:

![alt text](https://github.com/rikes/curso-openshift/blob/master/doc/img/teste-openweather.png "Teste app Weather")


#### Conectando sua aplicação ao banco de dados de sua preferência



https://access.redhat.com/documentation/en-us/openshift_container_platform/4.2/html-single/cli_tools/index#creating-an-application-with-a-database