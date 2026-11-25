# Bar da Tonha

O arquivo index.html abre a página inicial. A pasta cardapio contém o cardápio completo. As fotos, o cartaz, a imagem das pulseiras e o vídeo estão em assets. O site usa HTML, CSS e JavaScript e pode ser publicado diretamente.

## Publicar no GitHub Pages

1. Extraia o ZIP no seu dispositivo.
2. Entre no GitHub e crie um repositório público chamado bar-da-tonha. Inicialize com um README para usar a interface de upload.
3. Em **Add file → Upload files**, envie o conteúdo extraído, preservando as pastas. Confira se index.html, assets e cardapio aparecem no primeiro nível do repositório. Clique em **Commit changes**.
4. Abra **Settings → Pages → Build and deployment**. Em **Source**, escolha **Deploy from a branch**. Selecione **main**, **/ (root)** e clique em **Save**.
5. Quando a publicação terminar, use **Visit site**. Abra o cardápio e reproduza o vídeo da Japa para conferir a publicação.

## Conectar seu domínio

Use um domínio registrado que você administra. Em **Settings → Pages → Custom domain**, digite o endereço desejado (por exemplo, www.seudominio.com.br) e salve. Ao publicar pela branch, o GitHub cria o arquivo CNAME com o domínio escolhido.

No painel de DNS do seu provedor, configure os registros conforme o endereço que deseja usar:

| Endereço | Tipo | Nome | Destino |
| --- | --- | --- | --- |
| Com www | CNAME | www | SEU-USUARIO.github.io |
| Domínio sem www | A | @ | 185.199.108.153 |
| Domínio sem www | A | @ | 185.199.109.153 |
| Domínio sem www | A | @ | 185.199.110.153 |
| Domínio sem www | A | @ | 185.199.111.153 |

Substitua SEU-USUARIO pelo nome da conta proprietária do repositório. O destino do CNAME é só o nome do host. Para usar as duas formas do endereço, configure tanto o CNAME de www quanto os quatro registros A na raiz. Alguns provedores representam a raiz por um campo vazio.

Aguarde a validação do DNS e a emissão do certificado. Em **Settings → Pages**, marque **Enforce HTTPS** quando estiver disponível.

[Guia oficial de domínios do GitHub Pages](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
