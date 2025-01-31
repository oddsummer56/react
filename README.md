# TicketMoa

### Description
> TicketMoa의 front-end를 담당하는 application입니다.
> 
> Nginx를 Load Balancer로 활용하여 가용성을 높였습니다.

### Usage
```bash
$ docker compose up -d --build --force-recreate    
### multi staging을 적용하여 docker 내부에서 build dependency를 설치하고, build까지 이뤄지게 함 ###
```
> [!IMPORTANT]
> Port ::: 80
>
> #### 80 port를 이미 사용중인 경우
> 1. `$ netstat -nltp`으로 프로세스 확인
> 2. 1. `kill -9 <PID>` 또는 `fuser -k <PID/Program name>`로 80 port 비우고 docker 실행
>    2. docker-compose.yaml에서 port 변경하고 docker 실행

### Stack
[![react](https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=000)](https://ko.legacy.reactjs.org/)
[![typescript](https://img.shields.io/badge/typescript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=FFF)](https://www.typescriptlang.org/)
[![bootstrap](https://img.shields.io/badge/bootstrap-7952B3.svg?style=for-the-badge&logo=bootstrap&logoColor=FFF)](https://getbootstrap.com/)
[![docker](https://img.shields.io/badge/docker-2496ED.svg?style=for-the-badge&logo=docker&logoColor=FFF)](https://www.docker.com/)
[![nginx](https://img.shields.io/badge/nginx-009639.svg?style=for-the-badge&logo=nginx&logoColor=FFF)](https://hub.docker.com/_/nginx)
