import type { Express } from "express";
import type { PrismaClient } from "@prisma/client";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import "dotenv/config";

let app: Express;
let prisma: PrismaClient;
let produtoId: number;

const nomeProduto = `Produto teste ${Date.now()}`;

beforeAll(async () => {

    process.env.DATABASE_URL =
        "postgresql://postgres:postgres@localhost:5433/estamparia_test?schema=public";

    const aplicacao = await import("../../src/app.js");
    const banco = await import("../../src/infrastructure/database/prisma.js");

    app = aplicacao.app;
    prisma = banco.prisma;
});

afterAll(async () => {

    if (prisma) {
        if (produtoId) {
            await prisma.produto.deleteMany({
                where: { id: produtoId }
            });
        }

        await prisma.$disconnect();
    }
});

describe("Integração - API de produtos", () => {

    it("deve cadastrar um produto no banco de dados", async () => {

        const resposta = await request(app)
            .post("/produtos")
            .send({
                nome: nomeProduto,
                descricao: "Produto criado pelo teste",
                precoCentavos: 2990,
                quantidadeEstoque: 20
            });

        expect(resposta.status).toBe(201);
        expect(resposta.body.nome).toBe(nomeProduto);

        produtoId = resposta.body.id;
    });

    it("deve consultar o produto cadastrado", async () => {

        const resposta = await request(app)
            .get(`/produtos/${produtoId}`);

        expect(resposta.status).toBe(200);
        expect(resposta.body.id).toBe(produtoId);
        expect(resposta.body.nome).toBe(nomeProduto);
    });

});