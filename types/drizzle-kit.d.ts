declare module "drizzle-kit" {
  export interface Config {
    schema: string | string[];
    out: string;
    dialect: string;
  }

  export function defineConfig(config: Config): Config;
}
