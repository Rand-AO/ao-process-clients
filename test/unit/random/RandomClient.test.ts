import { RandomClient } from "../../../src/index";
import { BaseClient } from "../../../src/core/ao/BaseClient";
import { MessageResult } from "@permaweb/aoconnect/dist/lib/result";
import { DryRunResult } from "@permaweb/aoconnect/dist/lib/dryrun";
import { TokenClient } from "../../../src/index"; // Assuming this is the correct import for TokenClient


// Mock individual methods of BaseClient using jest.spyOn
jest.spyOn(BaseClient.prototype, 'message').mockResolvedValue("test-message-id");
const messageResult: MessageResult = {
    Output: undefined,
    Messages: [{ Data: "200: Success", Tags: [] }],
    Spawns: []
}
jest.spyOn(BaseClient.prototype, 'result').mockResolvedValue(messageResult);
const dryRunResult: DryRunResult = {
    Output: undefined,
    Messages: [{ Data: JSON.stringify({ available: 100 }), Tags: [] }],
    Spawns: []
}
jest.spyOn(BaseClient.prototype, 'dryrun').mockResolvedValue(dryRunResult);
jest.spyOn(BaseClient.prototype, 'messageResult').mockResolvedValue(messageResult);
jest.mock("../../../src/clients/process/token/index");

describe("RandomClient Unit Test", () => {
    let client: RandomClient;
    let mockTokenClient: jest.Mocked<TokenClient>;

    beforeAll(() => {
        // Initialize the RandomClient with actual configuration for integration testing
        client = RandomClient.autoConfiguration();

        mockTokenClient = {
            transfer: jest.fn().mockResolvedValue(true), // Mock the transfer method
        } as unknown as jest.Mocked<TokenClient>;

        // Inject the mocked tokenClient into the RandomClient instance
        (client as any).tokenClient = mockTokenClient;
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks to avoid test contamination
    });

    describe("postVDFChallenge()", () => {
        it("should post VDF challenge and return true on success", async () => {
            const randomnessRequestId = "test-request-id";
            const modulus = "test-modulus";
            const input = "test-input";
            const response = await client.postVDFChallenge(randomnessRequestId, modulus, input);

            expect(response).toBe(true);
        });
    });

    describe("getProviderAvailableValues()", () => {
        it("should fetch provider available values without throwing an error", async () => {
            const providerId = "test-provider-id";
            await expect(client.getProviderAvailableValues(providerId)).resolves.not.toThrow();
        });
    });

    describe("updateProviderAvailableValues()", () => {
        it("should update provider available values and return true on success", async () => {
            const availableRandomValues = 500;
            const response = await client.updateProviderAvailableValues(availableRandomValues);

            expect(response).toBe(true);
        });
    });

    describe("getOpenRandomRequests()", () => {
        it("should fetch open random requests without throwing an error", async () => {
            const provider = "test-provider";
            await expect(client.getOpenRandomRequests(provider)).resolves.not.toThrow();
        });
    });

    describe("getRandomRequests()", () => {
        it("should fetch random requests without throwing an error", async () => {
            const randomnessRequestIds = ["request-id-1", "request-id-2"];
            await expect(client.getRandomRequests(randomnessRequestIds)).resolves.not.toThrow();
        });
    });

    describe("getRandomRequestViaCallbackId()", () => {
        it("should fetch random request via callback ID without throwing an error", async () => {
            const callbackId = "test-callback-id";
            await expect(client.getRandomRequestViaCallbackId(callbackId)).resolves.not.toThrow();
        });
    });

    describe("createRequest()", () => {
        it("should create a request and return true on success", async () => {
            const providerIds = ["provider-id-1", "provider-id-2"];
            const inputNumber = 1;

            const response = await client.createRequest(providerIds, inputNumber);

            // Assert the method returns true
            expect(response).toBe(true);

            // Assert that tokenClient.transfer was called with the correct arguments
            expect(mockTokenClient.transfer).toHaveBeenCalledWith(
                expect.any(String), // getProcessId() result
                "100", // Payment amount
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "Providers",
                        value: JSON.stringify({ provider_ids: providerIds }),
                    }),
                ])
            );
        });
    });

    describe("postVDFOutputAndProof()", () => {
        it("should post VDF output and proof and return true on success", async () => {
            const randomnessRequestId = "test-request-id";
            const output = "test-output";
            const proof = "test-proof";
            const response = await client.postVDFOutputAndProof(randomnessRequestId, output, proof);

            expect(response).toBe(true);
        });
    });
});
