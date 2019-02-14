import * as redis from "redis";
import { promisify } from "util";

class CacheService {
  redis: any = {};

  constructor() {
    const client = redis.createClient({
      host: process.env.REDIS_HOST || "localhost"
    });
    this.redis = {};
    this.redis.get = promisify(client.get).bind(client);
    this.redis.set = promisify(client.set).bind(client);
  }

  getKey(name: String): String {
    return `package:${name}`;
  }

  async get(key: String): Promise<any> {
    const data = await this.redis.get(key);
    return JSON.parse(data);
  }

  set(key: String, value: any): Promise<any> {
    return this.redis.set(key, JSON.stringify(value));
  }
}

export default new CacheService();
