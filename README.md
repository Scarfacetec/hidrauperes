# Hidrau Peres

Site estático responsivo em HTML, CSS e JavaScript. Inclui banner com troca de fotos a cada 3 segundos, personagem, equipamentos com busca e filtros, galeria de serviços, WhatsApp e links para Google e Instagram.

## Cloudflare Pages pelo GitHub

1. Acesse Workers & Pages → Create application → Pages → Import an existing Git repository.
2. Conecte o repositório Scarfacetec/hidrauperes.
3. Use estas configurações:

| Campo | Valor |
| --- | --- |
| Nome do projeto | hidrauperes |
| Branch de produção | main |
| Framework preset | None |
| Comando de build | exit 0 |
| Diretório de saída | . |
| Diretório raiz | Deixar vazio (raiz do repositório) |
| Variáveis de ambiente | Nenhuma |

4. Clique em Save and Deploy. Alterações futuras na main serão publicadas automaticamente.
5. Em Custom domains, adicione hidrauperes.com.br e www.hidrauperes.com.br, caso sejam os domínios sob sua administração, e siga as instruções de DNS do painel.

Documentação oficial: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Conteúdo

Abra index.html para visualizar localmente. Não há instalação ou compilação. O formulário prepara uma mensagem no WhatsApp; o visitante revisa e envia no aplicativo. O site não armazena os dados do formulário.

WhatsApp informado: (19) 99699-7189. Configurado com DDI 55, exatamente como fornecido. Para alterar, atualize WHATSAPP em script.js e os links/textos do telefone em index.html.

Fotos de serviços fornecidas pelo responsável. Personagem adaptado às cores da marca. Nenhum endereço, horário, depoimento ou tempo de mercado foi inventado.

O domínio do material original é usado em robots.txt, sitemap.xml e na imagem social em index.html. Atualize esses arquivos se usar outro domínio.

Os cabeçalhos de segurança do Cloudflare Pages estão em _headers. Não há credenciais ou serviços de backend neste projeto.
