FROM golang:1.18-bullseye as base
WORKDIR /app
COPY main.go .
COPY go.mod .
RUN go build -o ./main .

FROM scratch
WORKDIR /app
COPY --from=base /app/main .
CMD ["./main"]
