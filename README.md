### Dave Knows Everyone
> Dave was bragging to his boss one day, “You know, I know everyone there is to know. Just name someone, anyone, and I know them.”
Tired of his boasting, his boss called his bluff, “OK, Dave, how about Tom Cruise?”
“No dramas boss, Tom and I are old friends, and I can prove it.” So Dave and his boss fly out to Hollywood and knock on Tom Cruise’s door, and Tom Cruise shouts,
“Dave! What’s happening? Great to see you! Come on in for a beer!”
Although impressed, Dave’s boss is still skeptical. After they leave Cruise’s house, he tells Dave that he thinks him knowing Cruise was just lucky.
“No, no, just name anyone else,” Dave says.
“President Obama,” his boss quickly retorts.
“Yup,” Dave says, “Old buddies, let’s fly out to Washington,” and off they go.
At the White House, Obama spots Dave on the tour and motions him and his boss over, saying, “Dave, what a surprise, I was just on my way to a meeting, but you and your friend come on in and let’s have a beer first and catch up.”
Well, the boss is very shaken by now but still not totally convinced. After they leave the White House grounds he expresses his doubts to Dave, who again implores him to name anyone else.
“Pope Francis,” his boss replies.
“Sure!” says Dave. “I’ve known the Pope for years.” So off they fly to Rome.
Dave and his boss are assembled with the masses at the Vatican’s St. Peter’s Square when Dave says, “This will never work. I can’t catch the Pope’s eye among all these people. Tell you what, I know all the guards so let me just go upstairs and I’ll come out on the balcony with the Pope.” He disappears into the crowd headed towards the Vatican.
Sure enough, half an hour later Dave emerges with the Pope on the balcony, but by the time Dave returns, he finds that his boss has had a heart attack and is surrounded by paramedics.
Making his way to his boss’ side, Dave asks him, “What happened?”
His boss looks up and says, “It was the final straw… you and the Pope came out on to the balcony and the man next to me said, ‘Who is that on the balcony with Dave?’

## Development

### Setup ENV
```sh
cp .env-sample .env
```

### Provision Docker Images
```sh
docker-compose up
```

## Mongo Express
### `localhost:8081`

## Documentation
### `localhost:4000/api-docs`

## Seeded Admin Account
| Username  | Password  |
| --------- | --------- |
| daveadmin | Qwer123!! |

## Production Kubernetes (for testing purpose in `minikube`)

### Setup ENV
```sh
cp .env-sample .env
```

### Create Secret
```sh
kubectl create secret generic secret --from-env-file .env
```

### Apply ConfigMap
```sh
kubectl apply -f k8s/mongo-configmap.yaml
```

### Apply Development and Services
```sh
kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/mongo-express.yaml
kubectl apply -f k8s/dave.yaml
```

## Mongo Express
```sh
minikube service mongo-express-service
```

## Dave
```sh
minikube service dave-service
```
