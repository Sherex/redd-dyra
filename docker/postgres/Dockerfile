FROM alpine:latest AS prep

RUN apk add unzip

ENV PGMEMENTO_VER 0.7.2

RUN wget https://github.com/pgMemento/pgMemento/releases/download/v${PGMEMENTO_VER}/pgmemento-${PGMEMENTO_VER}.zip -O pgmemento.zip
RUN unzip pgmemento.zip

RUN mv pgmemento-${PGMEMENTO_VER} pgmemento

FROM postgres:14-alpine

COPY --from=prep ./pgmemento ./pgmemento

RUN apk add --no-cache make
RUN cd pgmemento && make && make install
RUN apk del --purge make