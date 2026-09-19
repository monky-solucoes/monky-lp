# Correção do erro `activeAnimations / motion-dom`

O erro vinha da combinação instalada de `framer-motion` e `motion-dom`.

Nesta versão, o `framer-motion` foi removido completamente. As animações da landing page agora usam apenas CSS e `IntersectionObserver`, então não existe mais dependência de `motion-dom`.

O comando `npm run dev` também apaga automaticamente a pasta `.next` antes de iniciar, evitando que o cache antigo do Next.js mantenha módulos da versão anterior.

## Ao substituir uma instalação antiga

No PowerShell, dentro da pasta do projeto:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```
