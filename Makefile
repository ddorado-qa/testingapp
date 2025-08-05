# Comentarios claros
# Comandos para manejar la aplicación dockerizada y su entorno

# Nombre del servicio contenedor backend
BACKEND_SERVICE=qaapp-backend
FRONTEND_SERVICE=qaapp-frontend

# Instalación de dependencias en contenedores
install:
	docker-compose run --rm $(BACKEND_SERVICE) sh -c "npm install"
	docker-compose run --rm $(FRONTEND_SERVICE) sh -c "npm install"

# Levanta el stack dockerizado en segundo plano y muestra logs
up: install
	docker-compose up -d
	@echo "⌛ Esperando unos segundos para iniciar logs..."
	sleep 3
	docker-compose logs -f

# Ver logs de todos los servicios
logs:
	docker-compose logs -f

# Reinicia la aplicación completa
restart:
	docker-compose down
	make up

# Detiene los contenedores
down:
	docker-compose down

# Limpia contenedores y volúmenes
clean:
	docker-compose down -v
	docker system prune -f

# Bash en el backend
bash:
	docker exec -it $(BACKEND_SERVICE) sh
