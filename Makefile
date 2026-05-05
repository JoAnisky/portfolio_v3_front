# Lancer le projet en dev
up:
	docker compose --env-file .docker/.env.docker.dev up -d --build

# Entrer dans le conteneur
bash:
	docker exec -it portfoliov3-front bash

# Stopper et nettoyer en dev
down:
	docker compose --env-file .docker/.env.docker.dev down

# Afficher les logs du conteneur en dev
logs:
	docker compose --env-file .docker/.env.docker.dev logs -f portfoliov3-front

restart: down up
