<!-- @format -->

# projet-spa_back

### description de l'architecture

- /src
  - /**controllers**: gère toute la couche d'accès aux données
  - /**routes**: gère les routes
  - /**services**: gère les services qui pourraient être utiles (envoi d'email, upload d'image, etc...)
  - /**middleware**: contient les middleware (ex: verification de token JWT dans la requête, etc...)
  - /**mails**: contient les templates de mails qui seront envoyés aux utilisateur
