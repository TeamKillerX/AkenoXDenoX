FROM denoland/deno:latest

ENV DEBUG="grammy*"

WORKDIR /app

COPY . .

RUN chmod +x /app

EXPOSE 8000

CMD ["deno run", "--allow-net", "--allow-env", "--allow-sys", "--allow-read", "start.ts"]
