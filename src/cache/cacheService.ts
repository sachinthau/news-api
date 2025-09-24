// in-memory cache service
const createCacheService = () => {
    const cache = new Map<string, any>();

    return {
        get: (key: string): any | undefined => cache.get(key),
        set: (key: string, value: any): void => { cache.set(key, value); }
    };
};

// Create a singleton instance
const cacheService = createCacheService();

export default cacheService;