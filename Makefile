.PHONY: up down bash logs restart

# Lancer le projet en dev
up:
	docker compose --env-file .docker/.env.docker.dev up -d --build

# Stopper et nettoyer en dev
down:
	docker compose --env-file .docker/.env.docker.dev down

# Entrer dans le conteneur
bash:
	docker exec -it portfoliov3-front bash

# Afficher les logs du conteneur en dev
logs:
	docker compose --env-file .docker/.env.docker.dev logs -f portfoliov3-front

restart: down up
