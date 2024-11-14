// src/interfaces/IRandomClient.ts
export interface IRandomClient {
    /**
     * Retrieves the number of available random values associated with the specified provider.
     * @param provider - The identifier for the provider.
     * @returns - A promise that resolves with the number of available random values for the provider.
     */
    getProviderAvailableValues(provider: string): Promise<GetProviderAvailableValuesResponse>;

    /**
     * Updates the count of available random values for a specific provider.
     * @param amount - The new amount of random values available.
     * @returns - A promise that resolves with a boolean indicating success.
     */
    updateProviderAvailableValues(amount: number): Promise<boolean>;

    /**
     * Retrieves all open, incomplete randomness requests for a specific provider.
     * These requests lack required inputs (modulus, proof, output).
     * @param provider - The identifier for the provider.
     * @returns - A promise that resolves with an array of open random requests.
     */
    getOpenRandomRequests(provider: string): Promise<GetOpenRandomRequestsResponse>;

    /**
     * Fetches randomness requests based on a list of request IDs.
     * @param randomnessRequestIds - Array of IDs for the randomness requests to retrieve.
     * @returns - A promise that resolves with an array of requested randomness data.
     */
    getRandomRequests(randomnessRequestIds: string[]): Promise<GetRandomRequestsResponse>;

    /**
     * Submits a Verifiable Delay Function (VDF) challenge, including input and modulus, for a specific randomness request.
     * @param randomnessRequestId - The ID of the randomness request.
     * @param modulus - The modulus to be used in the challenge.
     * @param input - The input for the VDF challenge.
     * @returns - A promise that resolves with a boolean indicating success.
     */
    postVDFChallenge(randomnessRequestId: string, modulus: string, input: string): Promise<boolean>;

    /**
     * Posts a Verifiable Delay Function (VDF) proof and output for a specific randomness request.
     * @param randomnessRequestId - The ID of the randomness request.
     * @param output - The output result of the VDF computation.
     * @param proof - The proof of correctness for the output.
     * @returns - A promise that resolves with a boolean indicating success.
     */
    postVDFOutputAndProof(randomnessRequestId: string, output: string, proof: string): Promise<boolean>;

    /**
     * Creates a new randomness request using a list of provider IDs.
     * @param providers_ids - An array of provider IDs to include in the request.
     * @returns - A promise that resolves with a boolean indicating success.
     */
    createRequest(providers_ids: string[]): Promise<boolean>;
}