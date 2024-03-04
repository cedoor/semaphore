import { randomBytes } from "crypto"
import { Identity } from "../src"
import { bytesToBigint } from "../src/bytes-to-bigint"

describe("Identity", () => {
    const privateKey = "secret"

    describe("# Identity", () => {
        it("Should create a random identity", () => {
            const identity = new Identity()

            expect(typeof identity.privateKey).toBe("string")
            expect(typeof identity.secretScalar).toBe("string")
            expect(identity.publicKey).toHaveLength(2)
            expect(typeof identity.commitment).toBe("string")
        })

        it("Should create deterministic identities from a secret (private key)", () => {
            const identity = new Identity(privateKey)

            expect(typeof identity.privateKey).toBe("string")
            expect(typeof identity.secretScalar).toBe("string")
            expect(identity.publicKey).toHaveLength(2)
            expect(typeof identity.commitment).toBe("string")
        })
    })

    describe("# signMessage", () => {
        it("Should sign a message", () => {
            const identity = new Identity(privateKey)

            const signature = identity.signMessage("message")

            expect(signature.R8).toHaveLength(2)
            expect(typeof signature.R8[0]).toBe("string")
            expect(typeof signature.S).toBe("string")
        })
    })

    describe("# verifySignature", () => {
        it("Should verify a signature", () => {
            const identity = new Identity(privateKey)

            const signature = identity.signMessage("message")

            expect(Identity.verifySignature("message", signature, identity.publicKey)).toBeTruthy()
        })
    })

    describe("# bytesToBigint", () => {
        it("Should convert 32 bytes to bigint", () => {
            const bytes = randomBytes(32)

            const integer = bytesToBigint(bytes)

            expect(typeof integer).toBe("bigint")
            expect(integer).toBe(BigInt(`0x${bytes.toString("hex")}`))
        })
    })
})