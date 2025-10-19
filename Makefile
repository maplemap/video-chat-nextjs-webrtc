help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'

run: ## Run dev mode
	 docker compose -f docker-compose.yml -f docker-compose.dev.yml -p video-chat up --build

prod: ## Run prod mode
    docker rm -f video-chat-app video-chat-db video-chat-event-server video-chat-nginx 2>/dev/null || true
	docker compose up --build -d

