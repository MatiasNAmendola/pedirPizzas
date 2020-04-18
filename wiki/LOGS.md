# Logs

## Latest logs

To display the latest logs, run in terminal

```
sls logs -f hacerPedido --aws-profile student1
```

or

```
sls logs -f prepararPedido --aws-profile student1
```

or

```
sls logs -f enviarPedido --aws-profile student1
```

## Real time logs

```
sls logs -f hacerPedido -t --aws-profile student1
```

or

```
sls logs -f prepararPedido -t --aws-profile student1
```

or

```
sls logs -f enviarPedido -t --aws-profile student1
```
